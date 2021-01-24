import * as React from 'react';

import { styled } from '../../apis/Style';
import TouchableView from '../../primitives/TouchableView';
import View from '../../primitives/View';
import Badge from '../Badge';
import Icon from '../Icon';
import SubHeading from '../SubHeading';
import { IconCardProps } from './type';

const IconCard = ({
  icon,
  color,
  badge,
  size = 'small',
  testID,
  text,
  onPress,
  style,
}: IconCardProps) => {
  const sizes = {
    small: 40,
    medium: 80,
    large: 120,
  };
  return (
    <Container
      $size={sizes[size]}
      onPress={onPress}
      style={style}
      testID={testID}
    >
      <StyledView $color={color} $size={sizes[size]}>
        {badge && <Badge number={badge} />}
        <StyledIcon
          name={icon ?? ''}
          color={color && 'white'}
          $size={sizes[size]}
        />
      </StyledView>
      {text && <StyledSubHeading>{text}</StyledSubHeading>}
    </Container>
  );
};

export default IconCard;

const Container = styled(TouchableView)`
  align-items: center;
  width: ${({ $size }) => ($size ? `${$size}px` : '40px')};
  margin: ${({ $size }) => ($size ? `${$size / 10}px` : '8px')};
`;

const StyledSubHeading = styled(SubHeading)``;

const StyledView = styled(View)<{ $size: number; $color?: string }>`
  padding: 8px;
  border-radius: 3px;
  width: 100%;
  height: ${({ $size }) => `${$size}px`};
  background: ${({ $color }) => $color || '#D8D8D8'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px;
`;

const StyledIcon = styled(Icon)<{ $size: any }>`
  width: ${({ $size }) => ($size ? `${($size * 2) / 5}px` : '16px')};
  font-size: ${({ $size }) => ($size ? `${$size / 3}px` : '14px')};
`;
