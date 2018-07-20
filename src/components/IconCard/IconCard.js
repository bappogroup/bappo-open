// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import View from '../../primitives/View';
import Icon from '../Icon';
import Badge from '../Badge';

type Props = {
  icon?: string,
  color?: string,
  badge?: number,
  size?: string,
};

const IconCard = ({ icon, color, badge, size }: Props) => {
  const sizes = {
    small: 40,
    medium: 80,
    large: 120,
  };
  return (
    <StyledView color={color} size={sizes[size]}>
      {badge && <Badge number={badge} />}
      <StyledIcon name={icon} color={color && 'white'} size={sizes[size]} />
    </StyledView>
  );
};

IconCard.defaultProps = {};

export default IconCard;

const StyledView = styled(View)`
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);
  padding: 8px;
  border-radius: 3px;
  width: ${props => `${props.size}px` || '40px'};
  height: ${props => `${props.size}px`};
  background: ${props => props.color || '#D8D8D8'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledIcon = styled(Icon)`
  width: ${props => `${(props.size * 2) / 5}px` || '16px'};
  font-size: ${props => `${props.size / 3}px` || '14px'};
`;
