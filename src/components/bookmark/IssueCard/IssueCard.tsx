import styled from '@emotion/styled';

import ReactMarkdown, { Components } from 'react-markdown';

import { Issue } from '../../../redux/bookmark/type';

interface Props extends Issue {
  repositoryName: string;
  onClickIssueCard: (url: string) => void;
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

const components: Components = {
  img: (props) => (
    <img
      style={{ maxWidth: '100%' }}
      {...props}
      alt="issueImage"
    />
  ),
};

const IssueCard = ({
  user,
  title,
  body,
  url,
  repositoryName,
  onClickIssueCard,
}: Props) => (
  <Wrap onClick={() => onClickIssueCard(url)}>
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
    <ReactMarkdown components={components}>
      {body}
    </ReactMarkdown>
  </Wrap>
);

export default IssueCard;
