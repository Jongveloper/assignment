import { Fragment } from 'react';

import Issue from '../../../components/bookmark/Issue';

import { useAppSelector } from '../../../redux/store';

export default function IssueContainer() {
  const { selectedBookmark } = useAppSelector((state) => state.bookmark);

  return (
    <>
      {selectedBookmark?.issues.map(({ user, title, body }, idx) => (
        <Fragment key={idx}>
          <Issue
            repositoryName={selectedBookmark.repository.repo}
            user={user}
            title={title}
            body={body}
          />
        </Fragment>
      ))}
    </>
  );
}
