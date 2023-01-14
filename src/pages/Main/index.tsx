import DialogContainer from '../../containers/common/DialogContainer';
import LoadingContainer from '../../containers/common/LoadingContainer';
import FormContainer from '../../containers/main/FormContainer';
import RepositoriesContainer from '../../containers/main/RepositoriesContainer';

function Main() {
  return (
    <>
      <FormContainer />
      <RepositoriesContainer />
      <LoadingContainer />
      <DialogContainer />
    </>
  );
}

export default Main;
