// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import View from '../../primitives/View';

type Props = {
  children?: string,
};

const Background = ({ children }: Props) => {
  return <StyledView selectable>{children}</StyledView>;
};

Background.defaultProps = {};

export default Background;

const StyledView = styled(View)`
  background: #f7f7f7;
  padding: 16px;
`;
