import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { useTopEffect } from "./hooks/useTopEffect";
import DesktopList from "./Implementations/DesktopList";
import MobileList from "./Implementations/MobileList";
import { scrollLock, scrollUnlock } from "./utils";
import "./Navbar.css";

const Navbar = ({
  desktopList,
  mobileList,
  brand,
  topEffect,
  children,
  applicationNodeId,
  c,
  bc,
  hc
}) => {
  const [mobileMenuVisible, changeMobileMenuVisibility] = useState(false);
  const [isAtTop, isAtTopRef] = useTopEffect(topEffect);
  const openButtonRef = useRef();

  useEffect(() => {
    if (mobileMenuVisible === true) {
      scrollLock();
      document
        .getElementById(applicationNodeId)
        .setAttribute("aria-hidden", true);
    } else {
      const appNode = document.getElementById(applicationNodeId);
      if (appNode.getAttribute("aria-hidden") === "true") {
        scrollUnlock();
        appNode.setAttribute("aria-hidden", false);
      }
    }
  }, [applicationNodeId, mobileMenuVisible]);

  return (
    <Fragment>
      {desktopList({
        showMobile: () => changeMobileMenuVisibility(true),
        openButtonRef,
        children,
        brand,
        isAtTop,
        isAtTopRef,
        c,
        bc,
        hc
      })}
      {mobileList({
        hideMobile: () => {
          changeMobileMenuVisibility(false);
          openButtonRef.current.focus();
        },
        children,
        mobileMenuVisible,
        c,
        bc,
        hc
      })}
    </Fragment>
  );
};
Navbar.propTypes = {
  desktopList: PropTypes.func,
  mobileList: PropTypes.func,
  brand: PropTypes.element,
  topEffect: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  applicationNodeId: PropTypes.string.isRequired,
  c: PropTypes.string,
  bc: PropTypes.string,
  hc: PropTypes.string
};
Navbar.defaultProps = {
  desktopList: props => <DesktopList {...props} />,
  mobileList: props => <MobileList {...props} />,
  brand: null,
  topEffect: false,
  children: null,
  c: "white",
  bc: "#1d1d1d",
  hc: "orange"
};

export default Navbar;
