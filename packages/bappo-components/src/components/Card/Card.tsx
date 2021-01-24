import * as React from 'react';

import { styled } from '../../apis/Style';
import View from '../../primitives/View';
import { shadowStyle } from './styles';
import { CardProps } from './types';

export default function Card({ children, testID, ...rest }: CardProps) {
  return (
    <StyledView testID={testID} {...rest}>
      {children}
    </StyledView>
  );
}

const StyledView = styled(View)`
  padding: 8px;
  border-radius: 3px;
  background: #fff;
  ${shadowStyle};
`;
