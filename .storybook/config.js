import { configure } from "@storybook/react";
import { addParameters } from "@storybook/react";
import { create } from "@storybook/theming";
// import '../src/widget/style.css';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo); 

// Option defaults.
addParameters({
  options: {
    isFullscreen: false,
    showAddonsPanel: true,
    showSearchBox: true,
    panelPosition: "bottom",
    showStoriesPanel: true,
    showActionsPanel: false,
    sortStoriesByKind: false,
    enableShortcuts: true,
    theme: create({
      base: "light",
      brandTitle: "AXS",
      brandUrl: "#",
      gridCellSize: 12
    }),
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true })
  }
});

// automatically import all files ending in *.stories.js
configure(require.context("../src/stories", true, /\.stories\.js$/), module);

