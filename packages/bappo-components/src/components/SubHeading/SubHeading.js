// @flow

import * as React from 'react';

import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';

type Props = {
  children?: string,
  style?: any,
  className?: string,
};

const SubHeading = ({ children, style, className }: Props) => {
  return (
    <StyledText selectable style={style} className={className}>
      {children}
    </StyledText>
  );
};

SubHeading.defaultProps = {
  type: 'default',
};

export default SubHeading;

const StyledText = styled(Text)`
  height: 24px;
  line-height: 24px;
  font-size: 16px;
`;
