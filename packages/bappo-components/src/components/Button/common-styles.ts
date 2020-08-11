import styled, { css } from 'styled-components';

import Text from '../../primitives/Text';
import View from '../../primitives/View';
import Icon from '../Icon';
import { getBackgroundColor, getBorderColor, getTextColor } from './helpers';
import { ButtonContainerStyleProps, ButtonTextStyleProps } from './types';

export const buttonContainerStyle = css<ButtonContainerStyleProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 32px;
  background-color: ${props => getBackgroundColor(props)};
  border-color: ${props => getBorderColor(props)};
  border-style: solid;
  border-width: 1px;
  padding-left: ${({ icon, text }) => (icon && text ? 8 : text ? 16 : 0)}px;
  padding-right: ${({ text }) => (text ? 16 : 0)}px;
`;

export const buttonTextStyle = css<ButtonTextStyleProps>`
  font-size: 14px;
  color: ${props => (props.loading ? 'transparent' : getTextColor(props))};
`;

export const ButtonLabel = styled(Text)`
  ${buttonTextStyle};
`;

export const SpinnerContainer = styled(View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const StyledIcon = styled(Icon)`
  ${buttonTextStyle};
`;
