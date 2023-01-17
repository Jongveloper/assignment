import styled from '@emotion/styled';

interface TabButtonProps{
  selected: boolean;
}

interface Props extends TabButtonProps {
  id: number;
  fullName: string;
  handleNavigate: (id: number) => void;
  handleDelete: (id: number) => void;
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

  color:${(props) => (props.selected ? 'black' : 'grey')};
  cursor: ${(props) => (props.selected ? '' : 'pointer')};
`;

const DeleteButton = styled.button`
  border: none;
  background-color: transparent;

  font-size: 18px;
  font-weight: 800;

  cursor: pointer;
`;

export default function Tab({
  id,
  fullName,
  selected,
  handleNavigate,
  handleDelete,
}: Props) {
  return (
    <ButtonWrap>
      <TabButton
        selected={selected}
        onClick={() => handleNavigate(id)}
        disabled={selected}
      >
        {fullName}
      </TabButton>
      <DeleteButton
        type="button"
        onClick={() => handleDelete(Number(id))}
      >
        x
      </DeleteButton>
    </ButtonWrap>
  );
}
