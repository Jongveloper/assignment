import IssueContainer from '../../containers/bookmark/IssueContainer/IssueContainer';
import NoContentsContainer from '../../containers/bookmark/NoContentsContainer/NoContents';
import TabsContainer from '../../containers/bookmark/TabsContainer/TabsContainer';
import HeaderContainer from '../../containers/common/HeaderContainer/HeaderContainer';
import LoadingContainer from '../../containers/common/LoadingContainer/LoadingContainer';

const Bookmark = () => (
  <>
    <HeaderContainer />
    <TabsContainer />
    <IssueContainer />
    <NoContentsContainer />
    <LoadingContainer />
  </>
);

export default Bookmark;
