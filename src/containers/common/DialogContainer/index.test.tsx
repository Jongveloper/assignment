import { fireEvent, render } from '@testing-library/react';
import DialogContainer from '.';
import { bookmarkInitialState } from '../../../redux/bookmark';
import { commonInitailState } from '../../../redux/common';
import { repositoryInitialState } from '../../../redux/repository';
import { RootState, useAppDispatch, useAppSelector } from '../../../redux/store';

jest.mock('../../../redux/store');

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('DialogContainer는', () => {
  const dispatch = jest.fn();

  const renderDialogContainer = () => render(
    <DialogContainer />,
  );

  context('isOpen인 상태면서', () => {
    context('status가 ALERT일 때', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        (useAppDispatch as jest.Mock).mockImplementation(() => dispatch);

        (useAppSelector as jest.Mock).mockImplementation((state:
          (arg: RootState) => void) => state({
          bookmark: {
            ...bookmarkInitialState,
          },
          common: {
            ...commonInitailState,
            dialog: {
              ...commonInitailState.dialog,
              isOpen: true,
              status: 'ALERT',
              title: 'test',
              message: 'success',
            },
          },
          repository: {
            ...repositoryInitialState,
          },
        }));
      });

      it('북마크 보러가기가 보여집니다.', () => {
        const { getByText } = renderDialogContainer();

        expect(getByText('북마크 보러가기')).not.toBeNull();
      });

      it('북마크 보러가기를 누르면 navigate가 호출됩니다.', () => {
        const { getByText } = renderDialogContainer();

        const navigateButton = getByText('북마크 보러가기');

        fireEvent.click(navigateButton);

        expect(mockedUsedNavigate).toBeCalled();
      });

      it('title과 메세지가 보여집니다.', () => {
        const { getByText } = renderDialogContainer();

        expect(getByText('test')).not.toBeNull();
        expect(getByText('success')).not.toBeNull();
      });
    });

    context('status가 ERROR일 때', () => {
      beforeEach(() => {
        jest.clearAllMocks();

        (useAppDispatch as jest.Mock).mockImplementation(() => dispatch);

        (useAppSelector as jest.Mock).mockImplementation((state:
          (arg: RootState) => void) => state({
          bookmark: {
            ...bookmarkInitialState,
          },
          common: {
            ...commonInitailState,
            dialog: {
              ...commonInitailState.dialog,
              isOpen: true,
              status: 'ERROR',
            },
          },
          repository: {
            ...repositoryInitialState,
          },
        }));
      });

      it('북마크 보러가기가 보여지지 않습니다.', () => {
        const { container } = renderDialogContainer();

        expect(container).not.toHaveTextContent('북마크 보러가기');
      });

      it('닫기 버튼을 누르면 dispatch가 clseDialog와 함께 호출됩니다.', () => {
        const { getByText } = renderDialogContainer();

        const closeButton = getByText('닫기');

        fireEvent.click(closeButton);

        expect(dispatch).toBeCalledWith({
          type: 'common/closeDialog',
        });
      });
    });
  });
});
