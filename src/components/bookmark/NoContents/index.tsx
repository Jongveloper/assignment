import styled from '@emotion/styled';

import Button from '@mui/material/Button';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 70rem;
  margin: auto;

  text-align: center;
`;

const NavigateButton = styled(Button)`
  background-color: black;

  :hover {
    background-color: white;
    color: black;
  }
`;

const NoContents = ({
  handleNavigate,
}:{handleNavigate : () => void}) => (
  <Wrap>
    <div>
      <h1>북마크에 저장된게 없어요!</h1>
      <NavigateButton
        variant="contained"
        onClick={handleNavigate}
      >
        검색하러 가기
      </NavigateButton>
    </div>
  </Wrap>
);

export default NoContents;
