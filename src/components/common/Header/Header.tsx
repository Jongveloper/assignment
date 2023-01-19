import styled from '@emotion/styled';

import BookmarkIcon from '@mui/icons-material/Bookmark';

const Wrapper = styled.div`
  position: fixed;
  top: 0px;

  display: flex;

  width: 100%;
  padding: 0 2rem;
  margin: auto;

  background-color: white;

  & > h1 {
    font-weight: 900;

    cursor: pointer;
  }
`;

const BookmarkInfoWrap = styled.div`
  display: flex;
`;

const BookmarkCount = styled.p`
  background: #ff6633;
  color: white;
  text-align: center;
  width: 25px;
  height: 25px;
  line-height: 1.8;
  border-radius: 12.5px;
  margin-top: .6rem;
  margin-right: -3rem;
  margin-left: 2rem;
  z-index: 3;
`;

const StyledBookmarkIcon = styled(BookmarkIcon)`
  margin-top: 1.2rem;

  font-size: 40px;

  cursor: pointer;
`;

interface Props {
  bookmarkCount: number;
  onClickLink: (path: string) => void;
}

const Header = ({ bookmarkCount, onClickLink } :Props) => (
  <Wrapper>
    <h1 onClick={() => onClickLink('/')}>
      깃허브 이슈 정리
    </h1>
    <BookmarkInfoWrap>
      <BookmarkCount>
        {bookmarkCount}
      </BookmarkCount>
      <StyledBookmarkIcon
        data-testid="bookmarkSvg"
        onClick={() => onClickLink('/bookmark')}
      />
    </BookmarkInfoWrap>
  </Wrapper>
);

export default Header;
