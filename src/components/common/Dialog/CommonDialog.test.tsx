import { render } from '@testing-library/react';
import CommonDialog from './CommonDialog';

describe('Dialog의', () => {
  const handleClose = jest.fn();
  const handleNavigate = jest.fn();

  context('status가 Alert이면', () => {
    const renderAlertDialog = () => render(
      <CommonDialog
        dialog={{
          showDialog: true,
          status: 'ALERT',
          title: 'AlertTitle',
          message: 'AlertMessage',
        }}
        onCloseDialog={handleClose}
        onClickNavigateButton={handleNavigate}
      />,
    );

    it('Dialog가 보여집니다.', () => {
      const { getByText } = renderAlertDialog();

      expect(getByText('AlertTitle')).not.toBeNull();
    });

    it('북마크 보러가기가 보여집니다.', () => {
      const { getByText } = renderAlertDialog();

      expect(getByText('북마크 보러가기')).not.toBeNull();
    });
  });

  context('status가 ERROR면', () => {
    const renderErrorDialog = () => render(
      <CommonDialog
        dialog={{
          showDialog: true,
          status: 'ERROR',
          title: 'testTitle',
          message: 'testMessage',
        }}
        onCloseDialog={handleClose}
        onClickNavigateButton={handleNavigate}
      />,
    );
    it('북마크 보러가기가 보여지지 않습니다.', () => {
      const { container } = renderErrorDialog();

      expect(container).not.toHaveTextContent('북마크 보러가기');
    });
  });
});
