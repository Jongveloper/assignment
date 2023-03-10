import { ReactNode } from 'react';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';

interface StyledBoxProps {
  marginTop?: string;
  width?: string;
}

interface Props extends StyledBoxProps {
  children: ReactNode;
}

const StyledBox = styled(Box)<StyledBoxProps>`
  display: flex;
  justify-content: center;

  margin: auto;
  margin-top: ${(props) => props.marginTop};
`;

const CenterLayout = ({
  children,
  marginTop = '40px',
  width = '80%',
} : Props) => (
  <StyledBox
    marginTop={marginTop}
    width={width}
  >
    {children}
  </StyledBox>
);

export default CenterLayout;
