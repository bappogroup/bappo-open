import * as React from 'react';

import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';
import { HeadingProps } from './types';

// TODO: long text wrapping problem

export default function Heading({
  children,
  style,
  className,
  testID,
}: HeadingProps) {
  return (
    <StyledText selectable style={style} className={className} testID={testID}>
      {children}
    </StyledText>
  );
}

const StyledText = styled(Text)`
  height: 26px;
  line-height: 26px;
  font-size: 18px;
`;
