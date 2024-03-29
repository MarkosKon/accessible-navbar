// @ts-check
import * as React from "react";
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
const CloseButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const MobileListEmpty = React.forwardRef(
  (
    {
      hideMobile,
      mobileMenuVisible,
      alwaysVisible,
      children,
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
            c={c}
            bc={bc}
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
            {children}
          </Container>
        </FocusTrap>,
        document.body
      )
    );
  }
);

MobileListEmpty.propTypes = {
  hideMobile: PropTypes.func,
  mobileMenuVisible: PropTypes.bool.isRequired,
  alwaysVisible: PropTypes.bool,
  children: PropTypes.node,
  c: PropTypes.string,
  bc: PropTypes.string,
  hc: PropTypes.string,
  className: PropTypes.string,
};
MobileListEmpty.defaultProps = {
  hideMobile: null,
  alwaysVisible: false,
  children: null,
  c: "#FFF",
  bc: "#1D1D1D",
  hc: "orangered",
  className: null,
};

export default MobileListEmpty;
