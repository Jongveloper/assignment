import { ReactNode } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

interface StyleProps {
  marginTop?: string;
  width?: string;
}

interface Props extends StyleProps {
  children: ReactNode;
}

const StyledBox = styled(Box)<StyleProps>`
  display: flex;
  justify-content: center;

  margin: auto;
  margin-top: ${(props) => props.marginTop};
`;

function CenterLayout({
  children,
  marginTop = '40px',
  width = '80%',
} : Props) {
  return (
    <StyledBox
      marginTop={marginTop}
      width={width}
    >
      {children}
    </StyledBox>
  );
}

export default CenterLayout;
