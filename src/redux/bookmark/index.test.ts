import {
  bookmark,
  bookmarks,
  maxBookmarks,
} from '../../fixture/bookmark';

import reducer, {
  saveBookmarks,
  saveMoreBookmarks,
  selectBookmark,
  remainBookmark,
  bookmarkInitialState,
  setBookmark,
  setMoreBookmarkIssues,
  deleteSelectedBookmark,
  setRemainBookmark,
} from '.';

import { commonInitailState } from '../common';
import { repositoryInitialState } from '../repository';
import { getIssue } from '../../service/bookmark/getIssue';
import { notExistRepository, repository } from '../../fixture/repositories';

jest.mock('../../service/bookmark/getIssue');

const { env } = process;

describe('bookmark', () => {
  const dispatch = jest.fn();

  let getState = jest.fn(() => ({
    bookmark: {
      ...bookmarkInitialState,
    },
    common: {
      ...commonInitailState,
    },
    repository: {
      ...repositoryInitialState,
    },
  }));

  const issues = [{
    user: 'tester',
    title: 'title',
    body: 'body',
    url: 'url',
  }];

  context('saveBookmark', () => {
    it('북마크를 추가합니다.', () => {
      const state = reducer(
        bookmarkInitialState,
        saveBookmarks({ issues: bookmark.issues, repository: bookmark.repository }),
      );

      expect(state.bookmarks).toEqual([bookmark]);
    });
  });
  context('saveMoreBookmark', () => {
    it('북마크를 한개 더 추가합니다.', () => {
      const state = reducer(
        {
          ...bookmarkInitialState,
          bookmarks,
        },
        saveMoreBookmarks({
          bookmarks: [...bookmarks, bookmark],
          selectedBookmark: { repository: bookmark.repository, issues: bookmark.issues },
        }),
      );

      expect(state.selectedBookmark).toEqual({
        repository: bookmark.repository,
        issues: bookmark.issues,
      });

      expect(state.page).toBe(3);
    });
  });
  context('selectBookmark', () => {
    context('선택한 레포지토리의 아이디가 selectedBookmark아이디와 같지 않다면', () => {
      it('selectedBookmark가 변경됩니다.', () => {
        const state = reducer(
          {
            ...bookmarkInitialState,
            bookmarks,
            selectedBookmark: bookmark,
          },
          selectBookmark(2),
        );

        expect(state.selectedBookmark).toEqual({
          repository: bookmarks[1].repository,
          issues: bookmarks[1].issues,
        });
      });
    });

    context('선택한 레포지토리의 아이디가 selectedBookmark아이디와 같다면', () => {
      it('selectedBookmark가 그대로입니다.', () => {
        const state = reducer(
          {
            ...bookmarkInitialState,
            bookmarks,
            selectedBookmark: bookmark,
          },
          selectBookmark(1),
        );

        expect(state.selectedBookmark).toEqual(bookmark);
      });
    });
  });

  context('remainBookmark', () => {
    it('bookmarks가 남은 북마크로 변경됩니다.', () => {
      const state = reducer(
        {
          ...bookmarkInitialState,
          bookmarks: maxBookmarks,
        },
        remainBookmark(bookmarks),
      );

      expect(state.bookmarks).toEqual(bookmarks);
    });
  });

  context('deleteBookmark', () => {
    it('selectedBookmark가 삭제됩니다.', () => {
      const state = reducer(
        {
          ...bookmarkInitialState,
          selectedBookmark: bookmark,
        },
        deleteSelectedBookmark(),
      );
      expect(state.selectedBookmark).toBe(undefined);
    });
  });

  context('setRemainBookmark', () => {
    context('selectedBookmark와 id가 같지 않다면', () => {
      getState = jest.fn(() => ({
        bookmark: {
          ...bookmarkInitialState,
          selectedBookmark: bookmark,
        },
        common: {
          ...commonInitailState,
        },
        repository: {
          ...repositoryInitialState,
        },
      }));

      it('dispatch가 remainBookmark와 함께 호출됩니다.', () => {
        setRemainBookmark(2)(dispatch, getState);

        expect(dispatch).toBeCalledWith({
          type: 'bookmark/remainBookmark',
          payload: [],
        });
      });
    });
    context('selectedBookmark와 id가 같다면', () => {
      getState = jest.fn(() => ({
        bookmark: {
          ...bookmarkInitialState,
          bookmarks: maxBookmarks,
          selectedBookmark: bookmark,
        },
        common: {
          ...commonInitailState,
        },
        repository: {
          ...repositoryInitialState,
        },
      }));
      it('dispatch가 deleteSelectedBookmark와 함께 호출됩니다.', () => {
        setRemainBookmark(1)(dispatch, getState);

        expect(dispatch).toBeCalledWith({
          type: 'bookmark/deleteSelectedBookmark',
          payload: undefined,
        });
      });
    });
  });

  context('setBookmark', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env = { ...env };
      jest.clearAllMocks();
      (getIssue as jest.Mock).mockResolvedValue(issues);
    });

    getState = jest.fn(() => ({
      bookmark: {
        ...bookmarkInitialState,
        selectedBookmark: bookmark,
      },
      common: {
        ...commonInitailState,
      },
      repository: {
        ...repositoryInitialState,
      },
    }));

    context('요청이 실패할 때', () => {
      it('dispatch가 호출됩니다.', async () => {
        (getIssue as jest.Mock).mockRejectedValue({});

        await setBookmark(notExistRepository)(dispatch, getState);

        expect(dispatch).toBeCalled();
      });
    });

    context('요청에 성공할 때', () => {
      it('dispatch가 saveBookmarks와 함께 호출됩니다.', async () => {
        await setBookmark(repository)(dispatch, getState);

        expect(dispatch.mock.calls[0][0]).toEqual({
          type: 'bookmark/saveBookmarks',
          payload: {
            issues,
            repository: bookmark.repository,
          },
        });
      });

      context('Issue가 없다면', () => {
        it('dispatch가 setDialog와 함께 호출됩니다.', async () => {
          (getIssue as jest.Mock).mockResolvedValue({});

          await setBookmark(notExistRepository)(dispatch, getState);

          expect(dispatch).toBeCalledWith({
            type: 'common/setDialog',
            payload: {
              isOpen: true,
              message: '레포지토리에 이슈가 없습니다.',
              status: 'ERROR',
              title: '북마크 저장에 실패했습니다.',
            },
          });
        });
      });

      context('북마크가 4개 이상이라면', () => {
        it('dispatch가 setDialog와 함께 호출됩니다.', async () => {
          getState = jest.fn(() => ({
            bookmark: {
              ...bookmarkInitialState,
              bookmarks: maxBookmarks,
            },
            common: {
              ...commonInitailState,
            },
            repository: {
              ...repositoryInitialState,
            },
          }));

          await setBookmark(notExistRepository)(dispatch, getState);

          expect(dispatch).toBeCalledWith({
            type: 'common/setDialog',
            payload: {
              isOpen: true,
              message: '북마크는 최대 4개까지 저장할 수 있습니다.',
              status: 'ALERT',
              title: '북마크 저장에 실패했습니다.',
            },
          });
        });
      });

      context('이미 북마크에 존재한다면', () => {
        it('dispatch가 setDialog와 함께 호출됩니다.', async () => {
          getState = jest.fn(() => ({
            bookmark: {
              ...bookmarkInitialState,
              bookmarks,
            },
            common: {
              ...commonInitailState,
            },
            repository: {
              ...repositoryInitialState,
            },
          }));

          await setBookmark(repository)(dispatch, getState);

          expect(dispatch).toBeCalledWith({
            type: 'common/setDialog',
            payload: {
              isOpen: true,
              message: '이미 북마크에 저장되었습니다.',
              status: 'ALERT',
              title: '북마크 저장에 실패했습니다.',
            },
          });
        });
      });
    });
  });

  context('setMoreBookmarks', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env = { ...env };
      jest.clearAllMocks();
      (getIssue as jest.Mock).mockResolvedValue(issues);
    });

    it('요청이 실패할 때 dispatch가 호출됩니다.', async () => {
      jest.clearAllMocks();
      (getIssue as jest.Mock).mockRejectedValue({});

      getState = jest.fn(() => ({
        bookmark: {
          ...bookmarkInitialState,
          selectedBookmark: bookmark,
        },
        common: {
          ...commonInitailState,
        },
        repository: {
          ...repositoryInitialState,
        },
      }));

      await setMoreBookmarkIssues(repository)(dispatch, getState);

      expect(dispatch).toBeCalled();
    });

    it('요청이 성공할 때', async () => {
      getState = jest.fn(() => ({
        bookmark: {
          ...bookmarkInitialState,
          selectedBookmark: bookmark,
        },
        common: {
          ...commonInitailState,
        },
        repository: {
          ...repositoryInitialState,
        },
      }));

      await setMoreBookmarkIssues(repository)(dispatch, getState);

      expect(dispatch.mock.calls[0][0]).toEqual({
        payload: true,
        type: 'common/setLoading',
      });

      expect(dispatch.mock.calls[1]).toEqual([{
        type: 'bookmark/saveMoreBookmarks',
        payload: {
          bookmarks: [],
          selectedBookmark: {
            issues: [...bookmark.issues, ...issues],
            repository,
          },
        },
      }]);
    });
  });
});
