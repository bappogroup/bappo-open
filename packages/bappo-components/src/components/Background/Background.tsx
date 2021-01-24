import * as React from 'react';

import { styled } from '../../apis/Style';
import View from '../../primitives/View';
import { BackgroundProps } from './types';

export default function Background({ children, testID }: BackgroundProps) {
  return <StyledView testID={testID}>{children}</StyledView>;
}

const StyledView = styled(View)`
  background: #f7f7f7;
  padding: 16px;
`;
