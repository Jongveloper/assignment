import DialogContainer from '../../containers/common/DialogContainer/DialogContainer';
import HeaderContainer from '../../containers/common/HeaderContainer/HeaderContainer';
import LoadingContainer from '../../containers/common/LoadingContainer/LoadingContainer';
import FormContainer from '../../containers/main/SearchFormContainer/SearchFormContainer';
import RepositoriesContainer from '../../containers/main/RepositoriesContainer/RepositoriesContainer';

const Main = () => (
  <>
    <HeaderContainer />
    <FormContainer />
    <RepositoriesContainer />
    <LoadingContainer />
    <DialogContainer />
  </>
);

export default Main;
