import IssueContainer from '../../containers/bookmark/IssueContainer';
import NoContentsContainer from '../../containers/bookmark/NoContentsContainer';
import TabsContainer from '../../containers/bookmark/TabsContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import LoadingContainer from '../../containers/common/LoadingContainer';

function Bookmark() {
  return (
    <>
      <HeaderContainer />
      <TabsContainer />
      <IssueContainer />
      <NoContentsContainer />
      <LoadingContainer />
    </>
  );
}

export default Bookmark;
