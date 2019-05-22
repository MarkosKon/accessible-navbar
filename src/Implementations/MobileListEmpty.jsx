import React, { forwardRef, useRef, useEffect } from "react";
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
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  a,
  button {
    outline-color: ${({ hc }) => hc};
  }
`;
const CloseButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const MobileListEmpty = forwardRef(
  (
    {
      hideMobile,
      mobileMenuVisible,
      alwaysVisible,
      children,
      c,
      bc,
      hc,
      className
    },
    ref
  ) => {
    const closeButtonRef = useRef();
    useEffect(() => {
      if (mobileMenuVisible) {
        closeButtonRef.current.focus();
      }
    }, [mobileMenuVisible]);
    return (
      (alwaysVisible || mobileMenuVisible) &&
      createPortal(
        <FocusTrap>
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
            <CloseButton
              ref={closeButtonRef}
              onClick={hideMobile}
              aria-label="close mobile menu"
            >
              <FaTimes c={c} hc={hc} width="2rem" />
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
  className: PropTypes.string
};
MobileListEmpty.defaultProps = {
  hideMobile: null,
  alwaysVisible: false,
  children: null,
  c: "#FFF",
  bc: "#1D1D1D",
  hc: "orangered",
  className: null
};

export default MobileListEmpty;
