# accessible-navbar

> An extensible navigation bar with an accessible mobile menu.

## Install

```bash
yarn add accessible-navbar
```

and the peers...

```bash
yarn add focus-trap-react styled-components prop-types
```

## Usage

```jsx
import React from "react";
import { Navbar } from "accessible-navbar";

const Example = () => (
  <Navbar applicationNodeId="root">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </Navbar>
);
```

## Accessibility ticks

The desktop menu is a `<nav />` and the mobile menu is a modal with a `<nav />` inside.

- When the mobile menu is closed we don't render it into the dom.
- When the mobile menu is open we add it at the end of the body (react portal).
- The mobile menu has relevant aria attributes (for a modal).
- The escape key closes the mobile menu.
- When we open the mobile menu we transfer focus to the close button.
- The focus is trapped inside the mobile menu, when open.
- When we close the mobile menu the focus returns to the open button.
- ~~Clicking outside the mobile menu (if it's not full screen) closes the menu.~~
- When the mobile menu is open we lock the scroll for the html element.

If you feel something is off, please let me know with an issue.

## Recipes

Take a look at the [Storybook](https://accessible-navbar.netlify.com/). You can see the correct source code if you click the "story" tab in the addons section at the bottom of the screen. The "show info" button doesn't show the render-prop components correctly.

I want to find a way to test the package locally with yarn link (I have this problem: https://github.com/facebook/react/issues/14257). It's important to setup example projects in order to test it with screen readers like TalkBack. You can't easily do this from storybook. For now I'll just use the published package to setup the examples.

## Available components

- Navbar
- DesktopList
- DesktopListEmpty
- MobileList
- MobileListEmpty

They are all named exports:

```jsx
import {
  Navbar,
  DesktopList,
  DesktopListEmpty,
  MobileList,
  MobileListEmpty
} from "accessible-navbar";
```
