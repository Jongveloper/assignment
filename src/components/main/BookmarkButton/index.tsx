import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

interface Props {
  onClick : () => void;
}

const BookmarkButton = ({
  onClick,
}: Props) => (
  <button
    onClick={onClick}
    type="button"
  >
    <AddCircleOutlineOutlinedIcon data-testid="bookmark" />
  </button>
);

export default BookmarkButton;
