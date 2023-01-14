import { ChangeEvent, FormEvent } from 'react';

import styled from '@emotion/styled';

import { Button, TextField } from '@mui/material';

import CenterLayout from '../../common/CenterLayout';

interface Props {
  searchWord: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const RepositorySearchForm = styled.form`
  display: flex;
`;

const SearchInput = styled(TextField)`
  width: 25rem;
`;

const SearchButton = styled(Button)`
  margin-left: 1rem;

  background-color: black;
`;

function Form({
  searchWord,
  handleChange,
  onSubmit,
} : Props) {
  return (
    <>
      <CenterLayout>
        <RepositorySearchForm onSubmit={onSubmit}>
          <SearchInput
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            value={searchWord}
            placeholder="검색하고 싶은 레포지토리를 입력해주세요"
          />
          <SearchButton type="submit" variant="contained">검색</SearchButton>
        </RepositorySearchForm>
      </CenterLayout>
    </>
  );
}

export default Form;
