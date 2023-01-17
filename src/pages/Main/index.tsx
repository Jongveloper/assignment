import DialogContainer from '../../containers/common/DialogContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import LoadingContainer from '../../containers/common/LoadingContainer';
import FormContainer from '../../containers/main/SearchFormContainer';
import RepositoriesContainer from '../../containers/main/RepositoriesContainer';

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
