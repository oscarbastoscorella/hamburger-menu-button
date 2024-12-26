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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
