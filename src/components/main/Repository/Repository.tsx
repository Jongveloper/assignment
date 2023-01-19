import styled from '@emotion/styled';

import StarBorder from '@mui/icons-material/StarBorder';

import { RepositoryInfo } from '../../../redux/repository/type';

import CenterLayout from '../../common/CenterLayout/CenterLayout';
import Language from '../Language/Language';
import BookmarkButton from '../BookmarkButton/BookmarkButton';

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

interface Props {
  repository: RepositoryInfo;
  onClickBookMark(data: RepositoryInfo): void;
}

const Repository = ({
  repository,
  onClickBookMark,
}: Props) => (
  <CenterLayout>
    <Wrap>
      <div>
        <b>{repository.fullName}</b>
        <BookmarkButton onClick={() => onClickBookMark(repository)} />
      </div>
      <p>{repository.description}</p>
      <RepositoryInfoWrap>
        <StarBorder />
        <p>{repository.stargazersCount}</p>
        <Language
          language={repository.language}
          color={repository.circleColor}
        />
        <p>
          Updated on
          {' '}
          {repository.updatedAt}
        </p>
      </RepositoryInfoWrap>
    </Wrap>
  </CenterLayout>
);

export default Repository;
