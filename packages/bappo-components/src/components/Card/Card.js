// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import View from '../../primitives/View';
import { shadowStyle } from './styles';

type Props = {
  children?: string,
  style?: any,
};

const Card = ({ children, ...rest }: Props) => {
  return (
    <StyledView selectable {...rest}>
      {children}
    </StyledView>
  );
};

Card.defaultProps = {};

export default Card;

const StyledView = styled(View)`
  padding: 8px;
  border-radius: 3px;
  background: #fff;
  ${shadowStyle};
`;
