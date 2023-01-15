import IssueContainer from '../../containers/bookmark/IssueContainer';
import TabsContainer from '../../containers/bookmark/TabsContainer';
import LoadingContainer from '../../containers/common/LoadingContainer';

function Bookmark() {
  return (
    <>
      <TabsContainer />
      <IssueContainer />
      <LoadingContainer />
    </>
  );
}

export default Bookmark;
