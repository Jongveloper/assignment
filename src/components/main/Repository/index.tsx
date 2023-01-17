import styled from '@emotion/styled';

import StarBorder from '@mui/icons-material/StarBorder';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { RepositoryInfo } from '../../../redux/repository/type';
import { loadIssueProps } from '../../../redux/bookmark/type';

import CenterLayout from '../../common/CenterLayout';

interface LanguageCircleProps {
  circleColor: string;
}

interface RepositoryProps extends RepositoryInfo {
  handleClick: ({ repo, owner, repository } : loadIssueProps) => void;
}

const Wrap = styled.div`
  width: 100%;
  margin: auto;
  padding: 20px 5px 10px 0;

  border-top: 2px solid gray;

  line-height: 2;
  font-size: 18px;

  & > div {
    display: flex;
    
    & > b {
    color: #0d98ba;
    }

  & > button {
    border: none;

    background: transparent;

    cursor: pointer;
    }
  }  
`;

const RepositoryInfoWrap = styled.div`
  display: flex;

  font-size: 14px;
  & > p {
    margin-right: 20px;
  }
`;

const LanguageCircle = styled.div<LanguageCircleProps>`
  width: 12px;
  height: 12px;
  margin-top: 7px;
  margin-right: 6px;

  border: 1px solid #ececec;

  border-radius: 50%;
  background-color: ${(props) => props.circleColor};
`;

const Repository = ({
  id,
  fullName,
  updatedAt,
  description,
  language,
  stargazersCount,
  circleColor,
  repo,
  owner,
  handleClick,
}: RepositoryProps) => (
  <CenterLayout>
    <Wrap>
      <div>
        <b>{fullName}</b>
        <button
          type="button"
          onClick={() => handleClick({
            repo,
            owner,
            repository: {
              id,
              fullName,
              updatedAt,
              description,
              language,
              stargazersCount,
              circleColor,
              repo,
              owner,
            },
          })}
        >
          <AddCircleOutlineOutlinedIcon data-testid="bookmark" />
        </button>
      </div>
      <p>{description}</p>
      <RepositoryInfoWrap>
        <StarBorder />
        <p>{stargazersCount}</p>
        {language
          && (
          <>
            <LanguageCircle
              circleColor={circleColor}
            />
            <p>{language}</p>
          </>
          )}
        <p>
          Updated on
          {' '}
          {updatedAt}
        </p>
      </RepositoryInfoWrap>
    </Wrap>
  </CenterLayout>
);

export default Repository;
