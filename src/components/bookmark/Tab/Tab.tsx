import styled from '@emotion/styled';

interface TabButtonProps {
  selected: boolean;
}

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  border-left: 4px solid black;

  padding: 20px;
`;

const TabButton = styled.button<TabButtonProps>`
  margin: auto;
  border: none;
  background-color: transparent;
  
  font-size: 20px;
  font-weight: 700;

  color: ${(props) => (props.selected ? 'black' : 'grey')};
  cursor: ${(props) => (props.selected ? '' : 'pointer')};
`;

const DeleteButton = styled.button`
  border: none;
  background-color: transparent;

  font-size: 18px;
  font-weight: 800;

  cursor: pointer;
`;

interface Props extends TabButtonProps {
  id: number;
  fullName: string;
  onClickTap(id: number): void;
  onClickDelete(id: number): void;
}

const Tab = ({
  id,
  fullName,
  selected,
  onClickTap,
  onClickDelete,
}: Props) => (
  <ButtonWrap>
    <TabButton
      selected={selected}
      disabled={selected}
      onClick={() => onClickTap(id)}
      type="button"
    >
      {fullName}
    </TabButton>
    <DeleteButton
      onClick={() => onClickDelete(Number(id))}
      type="button"
    >
      x
    </DeleteButton>
  </ButtonWrap>
);

export default Tab;
