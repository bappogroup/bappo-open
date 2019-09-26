import { css } from '../../apis/Style';
import {
  buttonContainerStyle,
  buttonTextStyle,
  ButtonLabel,
  SpinnerContainer,
  StyledIcon,
} from './common-styles';
import {
  getActiveBackgroundColor,
  getActiveBorderColor,
  getActiveTextColor,
  getFocusedBackgroundColor,
  getFocusedBorderColor,
  getFocusedTextColor,
} from './helpers';

const webButtonContainerStyle = css`
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
