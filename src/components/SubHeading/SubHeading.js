// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';

type Props = {
  children?: string,
};

const SubHeading = ({ children }: Props) => {
  return <StyledText selectable>{children}</StyledText>;
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
