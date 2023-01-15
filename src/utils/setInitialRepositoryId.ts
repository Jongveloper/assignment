export const setInitialRepositoryId = () => {
  if (localStorage.getItem('bookmark')) {
    return JSON.parse(localStorage.getItem('bookmark') as string)[0].repository.id;
  }

  return '';
};
