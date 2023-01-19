import styled from '@emotion/styled';

interface LanguageCircleProps {
  circleColor: string;
}

interface Props {
  color: string;
  language?: string;
}

const LanguageCircle = styled.div<LanguageCircleProps>`
  width: 12px;
  height: 12px;
  margin-top: 7px;
  margin-right: 6px;

  border: 1px solid #ececec;

  border-radius: 50%;
  background-color: ${(props) => props.circleColor};
`;

const Language = ({
  language,
  color,
}: Props) => {
  if (!language) {
    return null;
  }

  return (
    <>
      <LanguageCircle
        circleColor={color}
      />
      <p>{language}</p>
    </>
  );
};

export default Language;
