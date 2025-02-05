## 5.0.0 (March 26, 2021)

### Bugfixes

- Fixes compatibility with Storybook 6.1.21 by updating all dependencies
  [#42](https://github.com/whitespace-se/storybook-addon-html/issues/42)

### Breaking changes

- All updates are minor and patch versions, but since the Storybook deps have
  been updated to 6.1.21 it is not guaranteed that this addon will work with
  previous versions of Storybook.

## 4.2.0 (January 7, 2021)

### New features

- Add ability to show line numbers and disable line-wrapping. See Readme for
  example.

### Breaking changes

N/A

## 4.1.0 (January 7, 2021)

### New features

- Allow root element to be overridden using the `root` parameter. See Readme for
  example.

Thank you [@savgrace](https://github.com/savgrace) for contributing 👏

### Breaking changes

N/A

## 4.0.2 (December 14, 2020)

- Security update for `ini` package.

## 4.0.1 (December 11, 2020)

- Show error message when trying to use framework-specific module, e.g.
  `@whitespace/storybook-addon-html/react`. It should now be simply
  `@whitespace/storybook-addon-html`.

## 4.0.0 (December 10, 2020)

- Add support for all frameworks 🎂
- Add preset support 🍰

### How to migrate

1. Use `@whitespace/storybook-addon-html` instead of the framework-specific
   modules like `@whitespace/storybook-addon-html/react`.
2. Remove the decorator in .storybook/preview.js. This is handled by the preset.

## 3.0.0 (December 9, 2020)

- Update dependencies, including new major version of React Syntax Highlighter.

## 2.0.1 (September 9, 2020)

- Fix issue with react-syntax-highlighter by downgrading it from 13.x to 12.x.

## 2.0.0 (August 21, 2020)

- Add support for Storybook 6
- Restructure repository structure and add Yarn workspaces
- Fix: Pin “Copy” button to bottom of panel
- Fix: Ensure code is shown on first render

**Note: Previous versions of Storybook are no longer compatible with this addon.
Stay on 1.x if you’re still using Storybook 5.**

Thank you [@alexlafroscia](https://github.com/alexlafroscia) for contributing 🎉
