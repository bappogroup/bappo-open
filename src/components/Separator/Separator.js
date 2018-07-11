// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import View from '../../primitives/View';

type Props = {
  children?: string,
  className?: string,
  style?: any,
};

const Separator = ({ className, style }: Props) => {
  return <StyledView className={className} style={style} />;
};

Separator.defaultProps = {};

export default Separator;

const StyledView = styled(View)`
  height: 1px;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: rgba(0, 0, 0, 0.12);
`;
