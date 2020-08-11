// @flow

import * as React from 'react';

import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';
import View from '../../primitives/View';

type Props = {
  number?: number,
};

const Badge = ({ number }: Props) => {
  return (
    <StyledView selectable>
      <StyledText>{number}</StyledText>
    </StyledView>
  );
};

Badge.defaultProps = {};

export default Badge;

const StyledView = styled(View)`
  padding: 2px;
  border-radius: 20px;
  background: #c23934;
  position: absolute;
  top: -5px;
  right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
`;

const StyledText = styled(Text)`
  color: white;
  font-size: 12px;
`;
