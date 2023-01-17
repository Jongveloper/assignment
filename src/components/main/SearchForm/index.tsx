import { ChangeEvent, FormEvent } from 'react';

import styled from '@emotion/styled';

import { Button, TextField } from '@mui/material';

interface SearchFormProps {
  searchWord: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const RepositorySearchForm = styled.form`
  position: fixed;
  top: 3.5rem;
  left: 0;
  display: flex;

  width: 100%;
  background: white;
  margin: auto;
`;

const SearchBox = styled.div`
  display: flex;

  margin: 20px auto 0 auto;
  padding-bottom: 2rem;
`;

const SearchInput = styled(TextField)`
  width: 25rem;
`;

const SearchButton = styled(Button)`
  margin-left: 1rem;

  background-color: black;
`;

const SearchForm = ({
  searchWord,
  handleChange,
  onSubmit,
} : SearchFormProps) => (
  <>
    <RepositorySearchForm onSubmit={onSubmit}>
      <SearchBox>
        <SearchInput
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          value={searchWord}
          placeholder="검색하고 싶은 레포지토리를 입력해주세요"
        />
        <SearchButton type="submit" variant="contained">검색</SearchButton>
      </SearchBox>
    </RepositorySearchForm>
  </>
);

export default SearchForm;
