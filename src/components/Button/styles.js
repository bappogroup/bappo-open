import { styled, css } from '../../apis/Style';
import TouchableView from '../../primitives/TouchableView';
import {
  buttonContainerStyle,
  buttonTextStyle,
  ButtonLabel,
  SpinnerContainer,
  StyledIcon,
} from './common-styles';

const webButtonContainerStyle = css`
  ${buttonContainerStyle};

  ${({ disabled, type }) => {
    switch (type) {
      case 'primary':
        return `
          &:hover, &:focus {
            background-color: #FF9333;
          }
          &:active {
            background-color: #E36A00;
          }
        `;
      case 'secondary':
        return `
          &:hover, &:focus {
            background-color: #F2F1F1;
            border-color: #F2F1F1;
          }
          &:active {
            background-color: #0070D2;
            border-color: #0031AC;
            * {
              color: white;
            }
          }
        `;
      case 'tertiary':
        return `
          &:hover, &:focus {
            background-color: white;
            border-color: #DDDBDA;
          }
          &:active {
            background-color: #0070D2;
            border-color: #0031AC;
            * {
              color: white;
            }
          }
        `;
      case 'destructive':
        return `
          &:hover, &:focus, &:active {
            background-color: #C23934;
            * {
              color: white;
            }
          }
        `;
      default:
        break;
    }
  }};
`;

export const StyledTouchableView = styled(TouchableView).attrs({
  activeOpacity: 1,
})`
  ${webButtonContainerStyle};
`;

export {
  webButtonContainerStyle as buttonContainerStyle,
  buttonTextStyle,
  ButtonLabel,
  SpinnerContainer,
  StyledIcon,
};
