import React, { forwardRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import FocusTrap from "focus-trap-react";

import Button from "../Button";
import { FaTimes } from "../Icons";

const Container = styled.div`
  background-color: ${({ bc }) => bc};
  color: ${({ c }) => c};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  overflow-y: auto;
  padding: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  a,
  button {
    outline: 2px solid transparent;
  }
  a:focus,
  button:focus {
    box-shadow: 0 0 0 2px ${({ hc }) => hc};
  }
`;
const Links = styled.nav`
  display: flex;
  flex-direction: column;
  font-size: 4em;
  text-align: center;
  max-height: 100%;
  a {
    color: ${({ c }) => c};
    text-decoration: none;
    transition: color 0.2s ease-in;
  }
  a:hover {
    color: ${({ hc }) => hc};
  }
  @media screen and (max-width: 576px) {
    font-size: 3em;
  }
`;
const CloseButton = styled(Button)`
  position: absolute;
  top: 25px;
  right: 35px;
`;
const MobileList = forwardRef(
  (
    {
      children,
      mobileMenuVisible,
      alwaysVisible,
      hideMobile,
      c,
      bc,
      hc,
      className,
    },
    ref
  ) => {
    return (
      (alwaysVisible || mobileMenuVisible) &&
      createPortal(
        <FocusTrap
          focusTrapOptions={{ returnFocusOnDeactivate: true }}
          active={mobileMenuVisible}
        >
          <Container
            bc={bc}
            c={c}
            hc={hc}
            className={className}
            ref={ref}
            role="dialog"
            aria-label="mobile menu"
            tabIndex="-1"
            onKeyDown={({ keyCode }) => keyCode === 27 && hideMobile()}
          >
            <CloseButton onClick={hideMobile} aria-label="close mobile menu">
              <FaTimes c={c} hc={hc} />
            </CloseButton>
            <Links c={c} hc={hc}>
              {children}
            </Links>
          </Container>
        </FocusTrap>,
        document.body
      )
    );
  }
);

MobileList.propTypes = {
  children: PropTypes.PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  mobileMenuVisible: PropTypes.bool.isRequired,
  alwaysVisible: PropTypes.bool,
  hideMobile: PropTypes.func,
  c: PropTypes.string,
  bc: PropTypes.string,
  hc: PropTypes.string,
  className: PropTypes.string,
};
MobileList.defaultProps = {
  hideMobile: null,
  alwaysVisible: false,
  c: "#FFF",
  bc: "#1D1D1D",
  hc: "orangered",
  className: null,
};

export default MobileList;
