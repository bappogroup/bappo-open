// @flow

import * as React from 'react';

import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';
import View from '../../primitives/View';
import Badge from '../Badge';
import Icon from '../Icon';
import AvatarDefaultProps from './defaultProps';
import { SizeToRadius, getInitials } from './helpers';
import type { AvatarProps } from './types.js.flow';

type Props = AvatarProps & {
  // Will be removed
  className?: string,
};

class Avatar extends React.Component<Props> {
  static defaultProps = AvatarDefaultProps;

  render() {
    const {
      backgroundColor,
      className,
      icon,
      name,
      size,
      style,
      badge,
    } = this.props;

    return (
      <AvatarContainer
        avatarBgColor={backgroundColor}
        className={className}
        size={size}
        style={style}
      >
        {badge && <Badge number={badge} />}
        {icon ? (
          <StyledIcon name={icon} size={size} />
        ) : (
          <StyledText size={size}>{getInitials(name)}</StyledText>
        )}
      </AvatarContainer>
    );
  }
}

export default Avatar;

const AvatarContainer = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: ${({ avatarBgColor }) => avatarBgColor};
  border-radius: ${({ size }) => SizeToRadius[size]}px;
  height: ${({ size }) => 2 * SizeToRadius[size]}px;
  width: ${({ size }) => 2 * SizeToRadius[size]}px;
`;

const StyledIcon = styled(Icon)`
  font-size: ${({ size }) => SizeToRadius[size]}px;
  color: white;
  line-height: ${({ size }) => SizeToRadius[size]}px;
  height: ${({ size }) => SizeToRadius[size]}px;
  width: ${({ size }) => SizeToRadius[size]}px;
`;

const StyledText = styled(Text)`
  font-size: ${({ size }) => SizeToRadius[size]}px;
  color: white;
`;
