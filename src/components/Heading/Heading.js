// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';

type Props = {
  children?: string,
  style?: any,
  className?: string,
};

const Heading = ({ children, style, className }: Props) => {
  return (
    <StyledText selectable style={style} className={className}>
      {children}
    </StyledText>
  );
};

Heading.defaultProps = {
  type: 'default',
};

export default Heading;

const StyledText = styled(Text)`
  height: 26px;
  line-height: 26px;
  font-size: 18px;
`;
