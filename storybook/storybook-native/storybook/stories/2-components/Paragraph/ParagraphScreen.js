// @flow

import * as React from 'react';
import { styled, Text } from 'bappo-components';

type Props = {
  children?: string,
  type?: 'default' | 'bold' | 'small' | 'error' | 'success',
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
          color: #2B2826;
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
          text-transform: uppercase;
        `;
      default:
        break;
    }
  }};
`;
