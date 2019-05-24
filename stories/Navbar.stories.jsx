/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { useSpring, animated, useTransition } from "react-spring";

import {
  Navbar,
  DesktopList,
  DesktopListEmpty,
  MobileList,
  MobileListEmpty
} from "../src";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  a{
    padding: 8px 16px;
  }
`;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

const Brand = () => (
  <a
    href="/"
    style={{ fontSize: "32px", textDecoration: "none", color: "inherit" }}
  >
    Brand
  </a>
);

const Separator = () => (
  <hr
    aria-hidden="true"
    style={{
      borderTop: "1px solid lightgray",
      width: "100%",
      margin: "16px 0"
    }}
  />
);

const NavbarDecorator = storyFn => (
  <div>
    <GlobalStyle />
    {storyFn()}
  </div>
);

const MobileListManyLinks = styled(MobileList)`
  nav {
    font-size: 42px;
    a {
      margin-bottom: 8px;
    }
  }
`;
const AnimatedDesktopList = animated(DesktopList);
const AnimatedDesktopListEmpty = animated(DesktopListEmpty);
const AnimatedMobileList = animated(MobileList);
const AnimatedMobileListEmpty = animated(MobileListEmpty);

const FixedWidth = styled(MobileList)`
  max-width: 320px;
  padding-top: 100px;
  nav {
    text-align: left;
    font-size: 24px;
    padding-bottom: 100px;
  }
`;
const AnimatedFixedWidth = animated(FixedWidth);

storiesOf("Navbar", module)
  .addDecorator(withInfo)
  .addDecorator(NavbarDecorator)
  .add("default", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar applicationNodeId="root">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </div>
  ))
  .add("brand", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar applicationNodeId="root" brand={<Brand />} hc="pink">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </div>
  ))
  .add("many links", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar
        applicationNodeId="root"
        hc="pink"
        desktopList={props => (
          <DesktopList {...props} mobileBreakpoint={1350} />
        )}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/link1">Our partners</a>
        <a href="/link2">Social</a>
        <a href="/link3">News</a>
        <a href="/link4">FAQ</a>
        <a href="/link5">Campaigns</a>
      </Navbar>
    </div>
  ))
  .add("many links prettier mobile", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar
        applicationNodeId="root"
        hc="pink"
        desktopList={props => (
          <DesktopList {...props} mobileBreakpoint={1350} />
        )}
        mobileList={props => <MobileListManyLinks {...props} />}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/link1">Our partners</a>
        <a href="/link2">Social</a>
        <a href="/link3">News</a>
        <a href="/link4">FAQ</a>
        <a href="/link5">Campaigns</a>
      </Navbar>
    </div>
  ))
  .add("mobile breakpoint on desktop menu", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar
        applicationNodeId="root"
        desktopList={props => (
          <DesktopList {...props} mobileBreakpoint={3000} />
        )}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </div>
  ))
  .add("animate desktop menu height", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar
        applicationNodeId="root"
        topEffect
        desktopList={({ isAtTop, ...props }) => {
          const spring = useSpring({ height: isAtTop ? 80 : 100 });
          return <AnimatedDesktopList style={spring} {...props} />;
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
      <Centered>Scroll down</Centered>
    </div>
  ))
  .add("animate desktop menu color", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar
        applicationNodeId="root"
        topEffect
        desktopList={({ isAtTop, ...props }) => {
          const [spring, set] = useSpring(() => ({ height: 100 }));
          if (isAtTop) {
            set({
              height: 80,
              backgroundColor: "white",
              color: "black",
              borderBottom: "1px solid #e4e4e4"
            });
          } else {
            set({
              height: 100,
              backgroundColor: "black",
              color: "white",
              borderBottom: "1px solid black"
            });
          }
          return (
            <AnimatedDesktopList
              style={spring}
              {...props}
              c={isAtTop ? "black" : "white"}
            />
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
      <Centered>Scroll down</Centered>
    </div>
  ))
  .add("animate empty desktop menu", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar
        applicationNodeId="root"
        topEffect
        desktopList={({ isAtTop, ...props }) => {
          const spring = useSpring({ height: isAtTop ? 60 : 100 });
          return (
            <AnimatedDesktopListEmpty style={spring} {...props}>
              <Centered>
                <h2>My Content</h2>
              </Centered>
            </AnimatedDesktopListEmpty>
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </div>
  ))
  .add("fade in mobile menu", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar
        applicationNodeId="root"
        mobileList={({ mobileMenuVisible, ...rest }) => {
          const transitions = useTransition(mobileMenuVisible, null, {
            from: { opacity: 0 },
            enter: { opacity: 1 },
            leave: { opacity: 0 }
          });
          return transitions.map(
            ({ item, key, props }) =>
              item && (
                <AnimatedMobileList
                  {...rest}
                  key={key}
                  style={props}
                  alwaysVisible
                  mobileMenuVisible={mobileMenuVisible}
                />
              )
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </div>
  ))
  .add("slide down mobile menu", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar
        applicationNodeId="root"
        mobileList={({ mobileMenuVisible, ...rest }) => {
          const transitions = useTransition(mobileMenuVisible, null, {
            from: { transform: "translateY(-100vh)", opacity: 0.5 },
            enter: { transform: "translateY(0)", opacity: 1 },
            leave: { transform: "translateY(-100vh)", opacity: 0.5 }
          });
          return transitions.map(
            ({ item, key, props }) =>
              item && (
                <AnimatedMobileList
                  {...rest}
                  key={key}
                  style={props}
                  alwaysVisible
                  mobileMenuVisible={mobileMenuVisible}
                />
              )
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </div>
  ))
  .add("slide left small mobile menu", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar
        applicationNodeId="root"
        mobileList={({ mobileMenuVisible, ...rest }) => {
          const transitions = useTransition(mobileMenuVisible, null, {
            from: { transform: "translateX(-320px)" },
            enter: { transform: "translateX(0)" },
            // enter: { transform: 'translateX(calc(100vw - 320vw))', opacity: 1 },
            leave: { transform: "translateX(-320px)" }
          });
          return transitions.map(
            ({ item, key, props }) =>
              item && (
                <AnimatedFixedWidth
                  {...rest}
                  key={key}
                  style={props}
                  alwaysVisible
                  mobileMenuVisible={mobileMenuVisible}
                />
              )
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </div>
  ))
  .add("slide left small mobile menu with many links", () => (
    <div style={{ minHeight: "200vh", backgroundColor: "#3c519a" }}>
      <Navbar
        bc="white"
        c="black"
        hc="blue"
        applicationNodeId="root"
        desktopList={props => (
          <DesktopListEmpty {...props}>
            <Centered>
              <Brand />
            </Centered>
          </DesktopListEmpty>
        )}
        mobileList={({ mobileMenuVisible, ...rest }) => {
          const transitions = useTransition(mobileMenuVisible, null, {
            from: { transform: "translateX(-320px)" },
            enter: { transform: "translateX(0)" },
            leave: { transform: "translateX(-320px)" }
          });
          return transitions.map(
            ({ item, key, props }) =>
              item && (
                <AnimatedFixedWidth
                  {...rest}
                  key={key}
                  style={props}
                  alwaysVisible
                  mobileMenuVisible={mobileMenuVisible}
                />
              )
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">Who we are</a>
        <a href="/contact">Vision & Values</a>
        <Separator />
        <a href="/contact">Our Leadership</a>
        <a href="/contact">Engagement Models</a>
        <a href="/contact">Technology Practices</a>
        <a href="/contact">Indicative Industries</a>
        <a href="/contact">Training</a>
        <Separator />
        <a href="/contact">Tech Proffesionals</a>
        <Separator />
        <a href="/contact">Careers</a>
        <a href="/contact">Blog</a>
      </Navbar>
    </div>
  ))
  .add("slide right mobile menu", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar
        applicationNodeId="root"
        mobileList={({ mobileMenuVisible, ...rest }) => {
          const transitions = useTransition(mobileMenuVisible, null, {
            from: { transform: "translateX(100vw)", opacity: 0.5 },
            enter: { transform: "translateX(0)", opacity: 1 },
            leave: { transform: "translateX(100vw)", opacity: 0.5 }
          });
          return transitions.map(
            ({ item, key, props }) =>
              item && (
                <AnimatedMobileListEmpty
                  {...rest}
                  key={key}
                  style={props}
                  alwaysVisible
                  mobileMenuVisible={mobileMenuVisible}
                >
                  <Centered>
                    <h1>My Content</h1>
                  </Centered>
                </AnimatedMobileListEmpty>
              )
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </div>
  ));
