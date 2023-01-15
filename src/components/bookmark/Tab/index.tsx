import styled from '@emotion/styled';

interface StyleProps{
  selected: boolean;
}

interface Props extends StyleProps {
  id: number;
  fullName: string;
  handleNavigate: (id: number) => void;
}

const Button = styled.button<StyleProps>`
  margin: auto;
  border: none;
  background-color: transparent;
  
  font-size: 20px;
  font-weight: 700;

  color:${(props) => (props.selected ? 'black' : 'grey')};
  cursor: ${(props) => (props.selected ? '' : 'pointer')};
`;

export default function Tab({
  id,
  fullName,
  selected,
  handleNavigate,
}: Props) {
  return (
    <Button
      selected={selected}
      onClick={() => handleNavigate(id)}
      disabled={selected}
    >
      {fullName}
    </Button>
  );
}
