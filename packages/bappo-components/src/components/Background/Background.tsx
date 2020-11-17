import * as React from 'react';

import { styled } from '../../apis/Style';
import View from '../../primitives/View';

type Props = {
  children?: string;
  testID?: string;
};

export default function Background({ children, testID }: Props = {}) {
  return (
    <StyledView selectable testID={testID}>
      {children}
    </StyledView>
  );
}

const StyledView = styled(View)`
  background: #f7f7f7;
  padding: 16px;
`;
