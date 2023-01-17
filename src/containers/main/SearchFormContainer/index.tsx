import { ChangeEvent, FormEvent, useCallback } from 'react';

import SearchForm from '../../../components/main/SearchForm';

import { setSearchWord, loadRepositories } from '../../../redux/repository';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

function FormContainer() {
  const dispatch = useAppDispatch();

  const { searchWord } = useAppSelector((state) => state.repository);

  const handleChangeSearchWord = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchWord(e.currentTarget.value));
  }, [searchWord]);

  const handleSubmitSearch = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loadRepositories({ repository: searchWord, page: 1 }));
  }, [searchWord]);

  return (
    <>
      <SearchForm
        searchWord={searchWord}
        handleChange={handleChangeSearchWord}
        onSubmit={handleSubmitSearch}
      />
    </>
  );
}

export default FormContainer;
