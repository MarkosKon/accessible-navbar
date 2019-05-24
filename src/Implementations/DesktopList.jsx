import React, { Fragment, forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "../Button";
import { FaBars } from "../Icons";

const Container = styled.nav`
  position: sticky;
  top: 0;
  background-color: ${({ bc }) => bc};
  color: ${({ c }) => c};
  display: flex;
  align-items: center;
  padding: 0 40px;
  font-size: 22px;
  height: 100px;
  a,
  button {
    outline: 2px solid transparent;
  }
  a:focus,
  button:focus {
    box-shadow: 0 0 0 2px ${({ hc }) => hc};
  }
  @media screen and (max-width: 600px) {
    padding: 0 26px;
  }
`;
const Right = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DesktopLinks = styled.div`
  display: block;
  font-size: 1.7rem;
  a {
    color: inherit;
    text-decoration: none;
    margin-left: 1.5rem;
    transition: color 0.2s ease-in;
  }
  a:hover {
    color: ${({ hc }) => hc};
  }
  @media screen and (max-width: ${({ mobileBreakpoint }) =>
      `${mobileBreakpoint}px`}) {
    display: none;
  }
`;
const ShowMobileMenuButton = styled(Button)`
  @media screen and (min-width: ${({ mobileBreakpoint }) =>
      `${mobileBreakpoint}px`}) {
    display: none;
  }
`;
const DesktopList = forwardRef(
  (
    {
      showMobile,
      openButtonRef,
      children,
      brand,
      isAtTopRef,
      mobileBreakpoint,
      c,
      bc,
      hc,
      className
    },
    ref
  ) => (
    <Fragment>
      <div ref={isAtTopRef} aria-hidden="true" />
      <Container bc={bc} c={c} hc={hc} className={className} ref={ref}>
        {brand}
        <Right>
          <DesktopLinks c={c} hc={hc} mobileBreakpoint={mobileBreakpoint}>
            {children}
          </DesktopLinks>
          <ShowMobileMenuButton
            ref={openButtonRef}
            onClick={showMobile}
            mobileBreakpoint={mobileBreakpoint}
            aria-label="open mobile menu"
          >
            <FaBars c={c} hc={hc} />
          </ShowMobileMenuButton>
        </Right>
      </Container>
    </Fragment>
  )
);
DesktopList.propTypes = {
  showMobile: PropTypes.func,
  openButtonRef: PropTypes.PropTypes.shape({
    current: PropTypes.object
  }),
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  brand: PropTypes.element,
  isAtTopRef: PropTypes.shape({
    current: PropTypes.object
  }).isRequired,
  mobileBreakpoint: PropTypes.number,
  c: PropTypes.string,
  bc: PropTypes.string,
  hc: PropTypes.string,
  className: PropTypes.string
};
DesktopList.defaultProps = {
  showMobile: null,
  openButtonRef: { current: { focus: () => {} } },
  brand: null,
  mobileBreakpoint: 980,
  c: "#FFF",
  bc: "#1D1D1D",
  hc: "orangered",
  className: null
};

export default DesktopList;
