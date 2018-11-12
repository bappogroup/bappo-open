// @flow

import { css } from 'styled-components';

export const flex = css`
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  min-height: 0;
  min-width: 0;
`;

export const buttonDefaultStyle = css`
  ${flex};
  background-color: transparent;
  border-color: transparent;
  border-width: 0;
  padding: 0;
  text-align: left;
  outline: none;

  ${({ disabled }) =>
    disabled
      ? `
        color: inherit;
        cursor: not-allowed;
        * {
          cursor: not-allowed;
        }
      `
      : `
        cursor: pointer;
        * {
          cursor: pointer;
        }
      `};
`;
