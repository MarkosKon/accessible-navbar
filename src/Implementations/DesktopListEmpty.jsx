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
  height: 100px;
  a,
  button {
    outline-color: ${({ hc }) => hc};
  }
`;
const ShowMobileMenuButton = styled(Button)`
  position: absolute;
  right: 36px;
  top: calc(50% - 18px);
`;

const DesktopListEmpty = forwardRef(
  (
    {
      showMobile,
      openButtonRef,
      isAtTopRef,
      mobileBreakpoint,
      children,
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
        {children}
        <ShowMobileMenuButton
          ref={openButtonRef}
          onClick={showMobile}
          mobileBreakpoint={mobileBreakpoint}
          aria-label="open mobile menu"
        >
          <FaBars c={c} hc={hc} width="2rem" />
        </ShowMobileMenuButton>
      </Container>
    </Fragment>
  )
);

DesktopListEmpty.propTypes = {
  showMobile: PropTypes.func,
  openButtonRef: PropTypes.PropTypes.shape({
    current: PropTypes.object
  }),
  isAtTopRef: PropTypes.shape({
    current: PropTypes.object
  }).isRequired,
  mobileBreakpoint: PropTypes.number,
  children: PropTypes.node,
  c: PropTypes.string,
  bc: PropTypes.string,
  hc: PropTypes.string,
  className: PropTypes.string
};
DesktopListEmpty.defaultProps = {
  showMobile: null,
  openButtonRef: { current: { focus: () => {} } },
  mobileBreakpoint: 980,
  children: null,
  c: "#FFF",
  bc: "#1D1D1D",
  hc: "orangered",
  className: null
};

export default DesktopListEmpty;
