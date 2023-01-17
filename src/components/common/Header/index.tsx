import styled from '@emotion/styled';

import BookmarkIcon from '@mui/icons-material/Bookmark';

interface HeaderProps {
  bookmarkAmount: number;
  handleNavigate: ({ path } : {path: string}) => void;
}

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

const Header = ({ bookmarkAmount, handleNavigate } :HeaderProps) => (
  <Wrapper>
    <h1 onClick={() => handleNavigate({ path: '/' })}>
      깃허브 이슈 정리
    </h1>
    <BookmarkInfoWrap>
      <BookmarkCount>
        {bookmarkAmount}
      </BookmarkCount>
      <StyledBookmarkIcon
        data-testid="bookmarkSvg"
        onClick={() => handleNavigate({ path: '/bookmark' })}
      />
    </BookmarkInfoWrap>
  </Wrapper>
);

export default Header;
