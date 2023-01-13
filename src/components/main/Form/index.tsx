import styled from '@emotion/styled';

import { Button, TextField } from '@mui/material';

import CenterLayout from '../../common/CenterLayout';

const FlexForm = styled.form`
  display: flex;
`;

const SearchInput = styled(TextField)`
  width: 25rem;
`;

const SearchButton = styled(Button)`
  margin-left: 1rem;

  background-color: black;
`;

function Form() {
  return (
    <>
      <CenterLayout>
        <FlexForm>
          <SearchInput placeholder="검색하고 싶은 레포지토리를 입력해주세요" />
          <SearchButton variant="contained">검색</SearchButton>
        </FlexForm>
      </CenterLayout>
    </>
  );
}

export default Form;
