import reducer, {
  cleanRepositories,
  setSearchWord,
  saveRepositories,
  saveMoreRepositories,
  repositoryInitialState,
  loadRepositories,
  loadMoreRepositories,
} from './repository';

import { repositories, repository } from '../../fixture/repositories';

import { getRepository } from '../../service/repository/getRepository';

import { bookmarkInitialState } from '../bookmark/bookmark';
import { commonInitailState } from '../common/common';

jest.mock('../../service/repository/getRepository');

const { env } = process;

describe('repository', () => {
  const dispatch = jest.fn();

  const getState = jest.fn(() => ({
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

  context('cleanRepositories', () => {
    it('searchWord와 repositories를 클린업합니다.', () => {
      const state = reducer(
        {
          ...repositoryInitialState,
          searchWord: 'test',
          repositories,
        },
        cleanRepositories(),
      );

      expect(state).toEqual(repositoryInitialState);
    });
  });

  context('setSearchWord', () => {
    it('searchWord가 변경됩니다.', () => {
      const state = reducer(
        repositoryInitialState,
        setSearchWord('test'),
      );

      expect(state.searchWord).toBe('test');
    });
  });

  context('saveRepositories', () => {
    it('repository를 리덕스에 저장합니다.', () => {
      const state = reducer(
        repositoryInitialState,
        saveRepositories(repositories),
      );

      expect(state.repositories).toEqual(repositories);
    });
  });

  context('saveMoreRepositories', () => {
    it('repository를 추가합니다.', () => {
      const state = reducer(
        {
          ...repositoryInitialState,
          repositories,
        },
        saveMoreRepositories([repository]),
      );

      expect(state.repositories).toEqual([...repositories, repository]);
    });
  });

  context('loadRepositories', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env = { ...env };
      jest.clearAllMocks();
      (getRepository as jest.Mock).mockResolvedValue(repositories);
    });

    context('요청이 성공할 때', () => {
      context('repsonse가 있다면', () => {
        it('dispatch가 saveRepositories와 함께 호출됩니다.', async () => {
          await loadRepositories()(dispatch, getState);

          expect(dispatch.mock.calls[0][0]).toEqual({
            type: 'common/setLoading',
            payload: true,
          });

          expect(dispatch.mock.calls[1]).toEqual([{
            type: 'repository/saveRepositories',
            payload: repositories,
          }]);

          expect(dispatch.mock.calls[2]).toEqual([{
            type: 'common/setLoading',
            payload: false,
          }]);
        });
      });

      context('response가 없다면', () => {
        it('dispatch가 setDialog와 함께 호출됩니다.', async () => {
          jest.clearAllMocks();
          (getRepository as jest.Mock).mockResolvedValue([]);
          await loadRepositories()(dispatch, getState);

          expect(dispatch.mock.calls[1]).toEqual([{
            type: 'common/setDialog',
            payload: {
              showDialog: true,
              message: '다른 레포지토리를 검색해주시길 바랍니다.',
              status: 'ERROR',
              title: '해당하는 레포지토리가 없습니다.',
            },
          }]);
        });
      });
    });

    context('요청이 실패할 때', () => {
      it('dispatch가 호출됩니다.', async () => {
        jest.clearAllMocks();
        (getRepository as jest.Mock).mockRejectedValue({});

        await loadRepositories()(dispatch, getState);

        expect(dispatch).toBeCalled();
      });
    });
  });

  context('loadMoreRepositories', () => {
    context('요청이 실패할 때', () => {
      beforeEach(() => {
        jest.resetModules();
        process.env = { ...env };
        jest.clearAllMocks();
        (getRepository as jest.Mock).mockRejectedValue({});
      });

      it('dispatch가 호출됩니다.', async () => {
        await loadMoreRepositories()(dispatch, getState);

        expect(dispatch).toBeCalled();
      });
    });

    context('요청이 성공할 때', () => {
      beforeEach(() => {
        jest.resetModules();
        process.env = { ...env };
        jest.clearAllMocks();
        (getRepository as jest.Mock).mockResolvedValue(repositories);
      });

      it('dispatch가 saveMoreRepositories와 함께 호출됩니다.', async () => {
        await loadMoreRepositories()(dispatch, getState);

        expect(dispatch.mock.calls[1]).toEqual([{
          type: 'repository/saveMoreRepositories',
          payload: repositories,
        }]);
      });
    });
  });
});
