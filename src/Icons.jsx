// @ts-check
/*!
 * The svg icons are from Font Awesome:
 * Font Awesome Free 5.8.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */
import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledSVG = styled.svg`
  display: inline-block;
  font-size: inherit;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  overflow: visible;
  vertical-align: -0.125em;
  path {
    fill: ${({ c }) => c};
    transition: 0.2s ease-in;
  }
  &:hover {
    path {
      fill: ${({ hc }) => hc};
    }
  }
`;
const FaBars = ({ c, hc, width, height }) => (
  <StyledSVG
    aria-hidden="true"
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width={width}
    height={height}
    c={c}
    hc={hc}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
  </StyledSVG>
);

FaBars.propTypes = {
  c: PropTypes.string,
  hc: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
FaBars.defaultProps = {
  c: "#fff",
  hc: "orangered",
  width: "1.75em",
  height: "2em",
};

const FaTimes = ({ c, hc, width, height }) => (
  <StyledSVG
    aria-hidden="true"
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 352 512"
    width={width}
    height={height}
    c={c}
    hc={hc}
  >
    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
  </StyledSVG>
);

FaTimes.propTypes = {
  c: PropTypes.string,
  hc: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
FaTimes.defaultProps = {
  c: "#fff",
  hc: "orangered",
  width: "1.375em",
  height: "2em",
};

export { FaBars, FaTimes };
