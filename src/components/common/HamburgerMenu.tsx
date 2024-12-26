import { useRef } from "react";
import styled from "styled-components";
import useToggle from "../hooks/useToggle";
import { useSpring, animated, config } from "react-spring";

type HamburgerMenuProps = {
  size?: number;
  strokeWidth?: number;
};

export default function HamburgerMenu({
  size = 100,
  strokeWidth = 5,
}: HamburgerMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, toggleIsOpen] = useToggle(true);

  const [{ rotate, y, opacity }, spring] = useSpring(() => springConfig);

  const calculateLineOffsetY = (height?: number, stroke?: number) =>
    height && stroke ? `${height / 2 - stroke / 2}px` : "0px";

  const toggleMenu = () => {
    spring.start({
      rotate: isOpen ? "45deg" : "0deg",
      y: isOpen
        ? calculateLineOffsetY(ref.current?.clientHeight, strokeWidth)
        : "0px",
      opacity: isOpen ? 0 : 1,
    });
    toggleIsOpen();
  };

  return (
    <Container onClick={toggleMenu} size={size} stroke={strokeWidth}>
      <LineContainer ref={ref}>
        {[
          { style: { rotate, y } },
          { style: { opacity } },
          {
            style: {
              rotate: rotate.to((r) => `-${r}`),
              y: y.to((v) => `-${v}`),
            },
          },
        ].map((props, index) => (
          <Line
            key={index}
            background="white"
            stroke={strokeWidth}
            {...props}
          />
        ))}
      </LineContainer>
    </Container>
  );
}

const springConfig = {
  rotate: "0deg",
  y: "0px",
  opacity: 1,
  config: config.stiff,
};

const Container = styled.button<{ size: number; stroke: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  border-radius: 50%;
  border: ${({ stroke }) => stroke}px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  cursor: pointer;
  padding: 0;
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

const Line = styled(animated.div)<{ background: string; stroke: number }>`
  height: ${({ stroke }) => stroke}px;
  background: ${({ background }) => background};
  border-radius: 50px;
`;
