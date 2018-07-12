// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import View from '../../primitives/View';

type Props = {
  children?: string,
  className?: string,
  style?: any,
};

const VerticalSeparator = ({ className, style }: Props) => {
  return <StyledView className={className} style={style} />;
};

VerticalSeparator.defaultProps = {};

export default VerticalSeparator;

const StyledView = styled(View)`
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: rgba(0, 0, 0, 0.12);
  margin-left: 8px;
  margin-right: 8px;
`;
