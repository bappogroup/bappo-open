// @flow

import * as React from 'react';
import { styled, Text } from 'bappo-components';

type Props = {
  children?: string,
};

const SubHeading = ({ children }: Props) => {
  return <StyledText selectable>{children}</StyledText>;
};

SubHeading.defaultProps = {};

export default SubHeading;

const StyledText = styled(Text)`
  height: 24px;
  line-height: 24px;
  font-size: 16px;
`;
