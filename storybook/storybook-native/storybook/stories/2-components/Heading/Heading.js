// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';

type Props = {
  children?: string,
};

const Heading = ({ children }: Props) => {
  return <StyledText selectable>{children}</StyledText>;
};

Heading.defaultProps = {};

export default Heading;

const StyledText = styled(Text)`
  height: 26px;
  line-height: 26px;
  font-size: 18px;
`;
