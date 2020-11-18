import * as React from 'react';

import Colors from '../../apis/Colors';
import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';
import View from '../../primitives/View';
import Badge from '../Badge';
import Icon from '../Icon';
import { SizeToRadius, getInitials } from './helpers';
import { AvatarProps } from './types';

type Props = AvatarProps & {
  // Will be removed
  className?: string;
};

export default function Avatar({
  backgroundColor,
  className,
  icon,
  style,
  badge,
  testID,
  name = '?',
  size = 'medium',
}: Props) {
  return (
    <AvatarContainer
      $avatarBgColor={backgroundColor}
      className={className}
      $size={size}
      style={style}
      testID={testID}
    >
      {icon ? (
        <Icon name={icon} color="white" size={size} />
      ) : (
        <StyledText $size={size}>{getInitials(name)}</StyledText>
      )}
      {badge && <Badge number={badge} />}
    </AvatarContainer>
  );
}

const AvatarContainer = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: ${({ $avatarBgColor }) => $avatarBgColor};
  border-radius: ${({ $size }) => SizeToRadius[$size]}px;
  height: ${({ $size }) => 2 * SizeToRadius[$size]}px;
  width: ${({ $size }) => 2 * SizeToRadius[$size]}px;
`;

const StyledText = styled(Text)<{
  $size: 'large' | 'medium';
}>`
  font-size: ${({ $size }) => SizeToRadius[$size]}px;
  color: white;
`;
