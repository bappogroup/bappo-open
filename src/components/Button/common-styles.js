import styled, { css } from 'styled-components';
import Colors from '../../apis/Colors';
import Text from '../../primitives/Text';
import View from '../../primitives/View';
import Icon from '../Icon';
import { getBackgroundColor, getTextColor } from './helpers';

export const buttonContainerStyle = css`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 32px;
  background-color: ${props => getBackgroundColor(props)};
  padding-left: ${({ icon, text }) => (icon && text ? 8 : text ? 16 : 0)}px;
  padding-right: ${({ text }) => (text ? 16 : 0)}px;

  ${({ disabled, type }) => {
    switch (type) {
      case 'secondary':
        return `
          border-color: #DDDBDA;
          border-style: solid;
          border-width: 1px;
        `;
      case 'tertiary':
        return `
          border-color: transparent;
          border-style: solid;
          border-width: 1px;
        `;
      case 'destructive':
        return `
          border-color: ${Colors.RED};
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
  color: ${props => getTextColor(props)};
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
  background-color: ${props => getBackgroundColor(props)};
`;

export const StyledIcon = styled(Icon)`
  ${buttonTextStyle};
`;
