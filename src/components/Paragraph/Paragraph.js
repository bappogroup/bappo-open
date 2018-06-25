// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import Text from '../Text';

type Props = {
  children?: string,
  type?: 'default' | 'bold' | 'small' | 'small-bold' | 'error' | 'success',
};

const Paragraph = ({ children, type }: Props) => {
  return (
    <StyledText selectable type={type}>
      {children}
    </StyledText>
  );
};

Paragraph.defaultProps = {
  type: 'default',
};

export default Paragraph;

const StyledText = styled(Text)`
  font-size: 14px;
  color: #191e26;
  height: 22px;
  line-height: 22px;

  ${({ type }) => {
    switch (type) {
      case 'bold':
        return `
          font-weight: bold;
        `;
      case 'small':
        return `
          font-size: 12px;
          height: 15px;
          line-height: 15px;
        `;
      case 'small-bold':
        return `
          font-size: 12px;
          font-weight: bold;
          height: 15px;
          line-height: 15px;
        `;
      case 'error':
        return `
          font-size: 12px;
          color: #C23934;
          height: 20px;
          line-height: 20px;
        `;
      case 'success':
        return `
          color: #04844B;
        `;
      default:
        break;
    }
  }};
`;
