import { useRef } from "react";
import styled from "styled-components";
import useToggle from "../hooks/useToggle";
import { useSpring, animated, config } from "react-spring";

export default function HamburgerMenu({ size = 100, strokeWidth = 5 }) {
  const ref = useRef();
  const [isOpen, toggleIsOpen] = useToggle(true);

  const [{ opacity, rotate, y }, spring] = useSpring(() => ({
    rotate: "0deg",
    y: "0px",
    opacity: 1,
    config: config.stiff,
  }));

  function calculateLineOffsetY(height, strokeWidth) {
    if (!height || !strokeWidth) return;
    const lineOffsetY = height / 2 - strokeWidth / 2;
    return `${lineOffsetY}px`;
  }

  function toggleMenu() {
    isOpen
      ? spring.start({
          rotate: "45deg",
          y: calculateLineOffsetY(ref?.current?.clientHeight, strokeWidth),
          opacity: 0,
        })
      : spring.start({ rotate: "0deg", y: "0px", opacity: 1 });
    toggleIsOpen();
  }

  return (
    <Container onClick={toggleMenu} size={size} stroke={strokeWidth}>
      <LineContainer ref={ref}>
        <Line background={`white`} style={{ rotate, y }} stroke={strokeWidth} />
        <Line background={`white`} style={{ opacity }} stroke={strokeWidth} />
        <Line
          background={`white`}
          style={{
            rotate: rotate.to((rotate) => `-${rotate}`),
            y: y.to((y) => `-${y}`),
          }}
          stroke={strokeWidth}
        />
      </LineContainer>
    </Container>
  );
}
const Container = styled.button`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  border-radius: 50%;
  border: ${(props) => props.stroke}px solid white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
  background: black;
  &:focus {
    outline: 3px solid deeppink;
  }
`;

const LineContainer = styled.div`
  width: 60%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Line = styled(animated.div)`
  height: ${(props) => props.stroke}px;
  background: ${(props) => props.background};
  border-radius: 50px;
`;
