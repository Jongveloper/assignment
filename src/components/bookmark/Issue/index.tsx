import styled from '@emotion/styled';

import ReactMarkdown from 'react-markdown';

import { Issue } from '../../../redux/bookmark/type';

interface Props extends Issue {
  repositoryName: string;
}

const Wrap = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 1rem 2rem;

  border: 3px solid black;
  border-radius: 2rem;

  & > b {
    font-size: 20px;

    text-align: right;
  }
`;

export default function IssueBox({
  user,
  title,
  body,
  repositoryName,
}: Props) {
  return (
    <Wrap>
      <h1>{repositoryName}</h1>
      <h2>{title}</h2>
      <b>{user}</b>
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
}
