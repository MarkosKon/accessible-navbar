import React, { Fragment, useState, useEffect } from "react";
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
  hc,
}) => {
  const [mobileMenuVisible, changeMobileMenuVisibility] = useState(false);
  const showMobile = () => changeMobileMenuVisibility(true);
  const hideMobile = () => changeMobileMenuVisibility(false);

  const [isAtTop, isAtTopRef] = useTopEffect(topEffect);

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
    <>
      {desktopList({
        showMobile,
        children,
        brand,
        isAtTop,
        isAtTopRef,
        c,
        bc,
        hc,
      })}
      {mobileList({
        hideMobile,
        children,
        mobileMenuVisible,
        c,
        bc,
        hc,
      })}
    </>
  );
};
Navbar.propTypes = {
  desktopList: PropTypes.func,
  mobileList: PropTypes.func,
  brand: PropTypes.element,
  topEffect: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  applicationNodeId: PropTypes.string.isRequired,
  c: PropTypes.string,
  bc: PropTypes.string,
  hc: PropTypes.string,
};
Navbar.defaultProps = {
  desktopList: (props) => <DesktopList {...props} />,
  mobileList: (props) => <MobileList {...props} />,
  brand: null,
  topEffect: false,
  children: null,
  c: "white",
  bc: "#1d1d1d",
  hc: "orange",
};

export default Navbar;
