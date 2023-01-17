import { fireEvent, render } from '@testing-library/react';
import Tab from '.';

describe('Tab이', () => {
  const handleNavigate = jest.fn();
  const handleDelete = jest.fn();

  context('선택되어있지 않다면', () => {
    const renderTab = () => render(
      <Tab
        id={1}
        fullName="NotSelected"
        selected={false}
        handleNavigate={handleNavigate}
        handleDelete={handleDelete}
      />,
    );
    it('Tab이 보여집니다.', () => {
      const { container } = renderTab();

      expect(container).toHaveTextContent('NotSelected');
    });

    it('fullName을 누르면 handleNavigate가 호출됩니다.', () => {
      const { getByText } = renderTab();

      const navigateButton = getByText('NotSelected');

      fireEvent.click(navigateButton);

      expect(handleNavigate).toBeCalled();
    });

    it('x를 누르면 handleDelete가 호출됩니다.', () => {
      const { getByText } = renderTab();

      const deleteButton = getByText('x');

      fireEvent.click(deleteButton);

      expect(handleDelete).toBeCalled();
    });

    it('TabButton 컬러가 회색입니다.', () => {
      const { getByText } = renderTab();

      const TabButton = getByText('NotSelected');
      const styles = getComputedStyle(TabButton);

      expect(styles.color).toBe('grey');
    });
  });

  context('선택되어있다면', () => {
    it('TabButton 컬러가 검정입니다.', () => {
      const { getByText } = render((
        <Tab
          id={1}
          fullName="Selected"
          selected
          handleNavigate={handleNavigate}
          handleDelete={handleDelete}
        />
      ));

      const TabButton = getByText('Selected');
      const styles = getComputedStyle(TabButton);

      expect(styles.color).toBe('black');
    });
  });
});
