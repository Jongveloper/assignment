import { ChangeEvent, FormEvent, useCallback } from 'react';

import SearchForm from '../../../components/main/SearchForm/SearchForm';

import { setSearchWord, loadRepositories } from '../../../redux/repository/repository';
import { useAppDispatch, useAppSelector } from '../../../redux/store';

const FormContainer = () => {
  const dispatch = useAppDispatch();

  const { searchWord } = useAppSelector((state) => state.repository);

  const handleChangeSearchWord = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchWord(e.currentTarget.value));
  }, [searchWord]);

  const handleSubmitSearch = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loadRepositories());
  }, [searchWord]);

  return (
    <SearchForm
      searchWord={searchWord}
      onChange={handleChangeSearchWord}
      onSubmit={handleSubmitSearch}
    />
  );
};

export default FormContainer;
