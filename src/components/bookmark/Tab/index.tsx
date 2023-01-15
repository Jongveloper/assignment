import styled from '@emotion/styled';

interface StyleProps{
  selected: boolean;
}

interface Props extends StyleProps {
  id: number;
  fullName: string;
  handleNavigate: (id: number) => void;
  handleDelete: (id: number) => void;
}

const TabButton = styled.button<StyleProps>`
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
    <>
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
    </>
  );
}
