import IssueContainer from '../../containers/bookmark/IssueContainer';
import TabsContainer from '../../containers/bookmark/TabsContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import LoadingContainer from '../../containers/common/LoadingContainer';

function Bookmark() {
  return (
    <>
      <HeaderContainer />
      <TabsContainer />
      <IssueContainer />
      <LoadingContainer />
    </>
  );
}

export default Bookmark;
