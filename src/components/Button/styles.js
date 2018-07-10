import styled, { css } from 'styled-components';
import Text from '../../primitives/Text';
import TouchableView from '../../primitives/TouchableView';
import Icon from '../Icon';

export const selectTextColor = type => {
  switch (type) {
    case 'primary':
      return 'white';
    case 'secondary':
      return '#0070D2';
    case 'tertiary':
      return '#0070D2';
    case 'destructive':
      return '#C23934';
    default:
      return 'white';
  }
};

export const buttonTextStyle = css`
  font-size: 14px;

  ${({ disabled, type }) => {
    if (disabled) {
      return `
        color: white;
      `;
    }

    return `
    color: ${selectTextColor(type)}`;
  }};
`;

export const StyledIcon = styled(Icon)`
  ${buttonTextStyle};
`;

export const ButtonLabel = styled(Text)`
  ${buttonTextStyle};
`;

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
          &:hover, &:focus {
            background-color: #FF9333;
          }
          &:active {
            background-color: #E36A00;
          }
        `;
      case 'secondary':
        return `
          background-color: white;
          border-color: #DDDBDA;
          border-style: solid;
          border-width: 1px;
          &:hover, &:focus {
            background-color: #F2F1F1;
            border-color: #F2F1F1;
          }
          &:active {
            background-color: #0070D2;
            border-color: #0031AC;
            div {
              color: white;
            }
          }
        `;
      case 'tertiary':
        return `
          background-color: transparent;
          border-color: transparent;
          border-style: solid;
          border-width: 1px;
          &:hover, &:focus {
            background-color: white;
            border-color: #DDDBDA;
          }
          &:active {
            background-color: #0070D2;
            border-color: #0031AC;
            div {
              color: white;
            }
          }
        `;
      case 'destructive':
        return `
          background-color: white;
          border-color: #C23934;
          border-style: solid;
          border-width: 1px;
          &:hover, &:focus, &:active {
            background-color: #C23934;
            div {
              color: white;
            }
          }
        `;
      default:
        break;
    }
  }};
`;

export const StyledTouchableView = styled(TouchableView)`
  ${buttonContainerStyle};
`;
