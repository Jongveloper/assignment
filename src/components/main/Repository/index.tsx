import styled from '@emotion/styled';

import StarBorder from '@mui/icons-material/StarBorder';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { RepositoryInfo } from '../../../redux/repository';
import { loadIssueProps } from '../../../redux/bookmark/index';

import CenterLayout from '../../common/CenterLayout';

interface LanguageCircleProps {
  circleColor: string;
}

interface Props extends RepositoryInfo {
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

function Repository({
  id,
  full_name,
  updated_at,
  description,
  language,
  stargazers_count,
  circleColor,
  issues_url: { repo, owner },
  handleClick,
}: Props) {
  return (
    <CenterLayout>
      <Wrap>
        <div>
          <b>{full_name}</b>
          <button
            type="button"
            onClick={() => handleClick({
              repo,
              owner,
              repository: {
                id,
                full_name,
                updated_at,
                description,
                language,
                stargazers_count,
                circleColor,
                issues_url: { repo, owner },
              },
            })}
          >
            <AddCircleOutlineOutlinedIcon />
          </button>
        </div>
        <p>{description}</p>
        <RepositoryInfoWrap>
          <StarBorder />
          <p>{stargazers_count}</p>
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
            {updated_at}
          </p>
        </RepositoryInfoWrap>
      </Wrap>
    </CenterLayout>
  );
}

export default Repository;
