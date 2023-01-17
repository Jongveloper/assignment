import { render } from '@testing-library/react';
import CommonDialog from '.';

describe('Dialog의', () => {
  const handleClose = jest.fn();
  const handleNavigate = jest.fn();

  context('status가 Alert이면', () => {
    const renderAlertDialog = () => render(
      <CommonDialog
        isOpen
        message="Alert 다이얼로그"
        title="Alert 다이얼로그 테스트"
        status="ALERT"
        handleClose={handleClose}
        handleNavigate={handleNavigate}
      />,
    );

    it('Dialog가 보여집니다.', () => {
      const { getByText } = renderAlertDialog();

      expect(getByText('Alert 다이얼로그')).not.toBeNull();
    });

    it('북마크 보러가기가 보여집니다.', () => {
      const { getByText } = renderAlertDialog();

      expect(getByText('북마크 보러가기')).not.toBeNull();
    });
  });

  context('status가 ERROR면', () => {
    const renderErrorDialog = () => render(
      <CommonDialog
        isOpen
        message="Error 다이얼로그"
        title="Error 다이얼로그 테스트"
        status="ERROR"
        handleClose={handleClose}
        handleNavigate={handleNavigate}
      />,
    );
    it('북마크 보러가기가 보여지지 않습니다.', () => {
      const { container } = renderErrorDialog();

      expect(container).not.toHaveTextContent('북마크 보러가기');
    });
  });
});
