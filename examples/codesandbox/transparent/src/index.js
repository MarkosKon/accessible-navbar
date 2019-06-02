/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { Navbar, DesktopList as BaseDL } from "accessible-navbar";
import { Flex, Box, Centered, Heading, Text } from "./Primitives";

import "./styles.css";
import cityImg from "./images/london-3833039_1920.jpg";
import cityimg2 from "./images/pexels-photo-1672110.jpg";

const StyledDL = styled(BaseDL)`
  background-color: transparent;
  color: white;
  border-bottom: 0;
`;
const AnimatedDesktopList = animated(StyledDL);

// eslint-disable-next-line react/prop-types
const DesktopList = ({ isAtTop, ...props }) => {
  const transparent = "#00000000";
  const initialState = {
    height: 100,
    backgroundColor: transparent,
    color: "white",
    borderBottom: `1px solid ${transparent}`,
    config: { duration: 250 }
  };
  const [spring, set] = useSpring(() => initialState);
  if (isAtTop) {
    set({
      height: 80,
      backgroundColor: "white",
      color: "black",
      borderBottom: "1px solid #e4e4e4",
      config: { duration: 250 }
    });
  } else set(initialState);

  return (
    <AnimatedDesktopList
      style={spring}
      {...props}
      c={isAtTop ? "black" : "white"}
    />
  );
};

const BgImage = styled.div`
  min-height: 100vh;
  ${({ imageUrl }) =>
    `background: linear-gradient(rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2)100%), url("${imageUrl}")`};
  background-size: cover;
  margin-top: -100px;
`;

function App() {
  return (
    <Box className="App">
      <Navbar
        applicationNodeId="root"
        c="black"
        bc="white"
        brand={<Heading>Skyscrapers</Heading>}
        topEffect
        desktopList={DesktopList}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
      <Box mt="-100px" minHeight="100vh">
        <BgImage imageUrl={cityImg}>
          <Centered color="white" minHeight="100vh">
            <Heading as="h1">Skyscrapers are long!</Heading>
          </Centered>
        </BgImage>
      </Box>
      <Flex p="50px 10px" flexWrap="wrap" minHeight="100vh">
        <Box textAlign="center" width={[1, 1 / 2]}>
          <Centered>
            <img
              src={cityimg2}
              alt="city 2"
              style={{ maxWidth: "80%", maxHeight: "80%" }}
            />
          </Centered>
        </Box>
        <Box width={[1, 1 / 2]}>
          <Centered alignItems="flex-start">
            <Heading>Lorem ipsum dolor sit amet.</Heading>
            <Text as="p" fontSize="22px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              blanditiis tempore dolor laudantium veritatis, quam nobis itaque
              suscipit facere unde officia numquam soluta repudiandae iusto
              error molestiae quia dolore deserunt possimus ducimus iure
              distinctio cumque eius? Quasi obcaecati ducimus fugiat veritatis?
              Laborum nostrum quos minima pariatur perferendis, doloremque
              nulla, distinctio repellendus autem atque quisquam fugit ut quo
              similique numquam rerum nam quod?
            </Text>
            <Text as="p" fontSize="18px">
              Totam dolorem molestiae reprehenderit rem pariatur laudantium odit
              consequatur, magni sequi est. Facere optio fuga dolor ipsa quia
              alias nostrum! Enim fugiat, a culpa itaque non necessitatibus
              blanditiis repudiandae delectus at voluptatum officiis aliquid
              dignissimos quae. Qui sequi impedit possimus saepe blanditiis
              exercitationem tempora laborum, amet vero minus omnis molestiae
              quia pariatur voluptas, consequuntur libero, sapiente
              reprehenderit nesciunt? Ad sed explicabo nemo vitae adipisci autem
              provident consequatur beatae iusto aut similique itaque,
              voluptatum libero ab, cupiditate in! Temporibus esse aperiam ipsa
              ut a tempore sapiente cupiditate in! Temporibus esse aperiam ipsa
              ut a tempore sapiente quos dolor ab!
            </Text>
          </Centered>
        </Box>
      </Flex>
    </Box>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
