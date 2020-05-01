import { css } from '../../apis/Style';
import {
  ButtonLabel,
  SpinnerContainer,
  StyledIcon,
  buttonContainerStyle,
  buttonTextStyle,
} from './common-styles';
import {
  getActiveBackgroundColor,
  getActiveBorderColor,
  getActiveTextColor,
  getFocusedBackgroundColor,
  getFocusedBorderColor,
  getFocusedTextColor,
} from './helpers';
import { ButtonContainerStyleProps } from './types';

const webButtonContainerStyle = css<ButtonContainerStyleProps>`
  ${buttonContainerStyle};

  ${({ disabled, type }) =>
    !disabled &&
    `
    &:hover,
    &:focus {
      background-color: ${getFocusedBackgroundColor({ type })};
      border-color: ${getFocusedBorderColor({ type })};
      * {
        color: ${getFocusedTextColor({ type })};
      }
    }

    &:active {
      background-color: ${getActiveBackgroundColor({ type })};
      border-color: ${getActiveBorderColor({ type })};
      * {
        color: ${getActiveTextColor({ type })};
      }
    }
  `};
`;

export {
  webButtonContainerStyle as buttonContainerStyle,
  buttonTextStyle,
  ButtonLabel,
  SpinnerContainer,
  StyledIcon,
};
