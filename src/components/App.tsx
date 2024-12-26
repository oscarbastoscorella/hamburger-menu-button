import styled from "styled-components";
import HamburgerMenu from "./common/HamburgerMenu";

export default function App() {
  return (
    <AppContainer>
      <HamburgerMenu size={200} strokeWidth={12} />
    </AppContainer>
  );
}

const AppContainer = styled.main`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
