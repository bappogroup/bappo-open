import { css } from 'styled-components';

export const buttonContainerStyle = css`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 32px;
  padding-left: ${({ icon, text }) => (icon && text ? 8 : text ? 16 : 0)}px;
  padding-right: ${({ text }) => (text ? 16 : 0)}px;

  ${({ disabled, type }) => {
    if (disabled) {
      return `
        background-color: #B3B3B3;
      `;
    }
    switch (type) {
      case 'primary':
        return `
          background-color: #FF7800;
        `;
      case 'secondary':
        return `
          background-color: white;
          border-color: #DDDBDA;
          border-style: solid;
          border-width: 1px;
        `;
      case 'tertiary':
        return `
          background-color: transparent;
        `;
      case 'destructive':
        return `
          background-color: white;
          border-color: #C23934;
          border-style: solid;
          border-width: 1px;
        `;
      default:
        break;
    }
  }};
`;

export const buttonTextStyle = css`
  font-size: 14px;

  ${({ disabled, type }) => {
    if (disabled) {
      return `
        color: white;
      `;
    }
    switch (type) {
      case 'primary':
      case 'secondary':
      case 'tertiary':
        return `
          color: white;
        `;
      case 'destructive':
        return `
          color: #C23934;
        `;
      default:
        break;
    }
  }};
`;
