import styled from '@emotion/styled';

import ReactMarkdown from 'react-markdown';

import { Issue } from '../../../redux/bookmark/type';

interface IssueCardProps extends Issue {
  repositoryName: string;
  goToIssue: (url: string) => void;
}

const Wrap = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 1rem 2rem;

  border: 3px solid black;
  border-radius: 2rem;

  overflow: hidden;
  
  cursor: pointer;
`;

const NameWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  
  margin-bottom: 40px;

  font-size: 22px;
`;

const IssueCard = ({
  user,
  title,
  body,
  url,
  repositoryName,
  goToIssue,
}: IssueCardProps) => (
  <Wrap onClick={() => goToIssue(url)}>
    <h1>{repositoryName}</h1>
    <h2>{title}</h2>
    <NameWrap>
      <b>
        author :
        {' '}
        {' '}
        {user}
      </b>
    </NameWrap>
    <ReactMarkdown
      components={{
        img: ({
          node, ...props
        }) => (
          <img
            style={{ maxWidth: '100%' }}
            {...props}
            alt="issueImage"
          />
        ),
      }}
    >
      {body}
    </ReactMarkdown>
  </Wrap>
);

export default IssueCard;
