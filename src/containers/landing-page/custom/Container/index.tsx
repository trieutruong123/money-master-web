import { StyledContainer } from "./styles";

interface ContainerProps {
  border?: boolean;
  children: React.ReactNode;
}

const Container = ({ border, children }: ContainerProps) => (
  <StyledContainer border={border}>{children}</StyledContainer>
);

export default Container;
