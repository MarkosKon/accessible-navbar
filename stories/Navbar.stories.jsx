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
`;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
`;

const NavbarDecorator = storyFn => (
  <div>
    <GlobalStyle />
    {storyFn()}
  </div>
);

const AnimatedDesktopList = animated(DesktopList);
const AnimatedDesktopListEmpty = animated(DesktopListEmpty);
const AnimatedMobileList = animated(MobileList);
const AnimatedMobileListEmpty = animated(MobileListEmpty);

// 1.
// const FixedWidth = styled(AnimatedMobileList)`
//   max-width: 320px;
// `;

// 2.
const FixedWidth = styled(MobileList)`
  max-width: 320px;
`;
const AnimatedFixedWidth = animated(FixedWidth);

storiesOf("Navbar", module)
  .addDecorator(withInfo)
  .addDecorator(NavbarDecorator)
  .add("default", () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar applicationNodeId="root" c="#a0d4d4" hc="pink">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </div>
  ))
  .add("mobile breakpoint", () => (
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
  .add("animate DesktopList", () => (
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
  .add("animate DesktopList #2", () => (
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
  .add("animate DesktopListEmpty", () => (
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
  .add("fade-in MobileList", () => (
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
  .add("slide-down MobileList", () => (
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
  .add("slide-left fixed width MobileList", () => (
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
  .add("slide-right MobileListEmpty", () => (
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
