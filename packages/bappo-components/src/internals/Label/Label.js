// @flow

import * as React from 'react';

import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';

type Props = {
  children?: string,
  color?: 'black' | 'white',
};

const Label = ({ children, color }: Props) => {
  return (
    <StyledText selectable color={color}>
      {children}
    </StyledText>
  );
};

Label.defaultProps = {
  color: 'black',
};

export default Label;

const StyledText = styled(Text)`
  color: ${({ color }) => color};
`;
