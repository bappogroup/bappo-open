import React from 'react';

import { styled } from '../../apis/Style';
import TouchableView from '../../primitives/TouchableView';
import Icon from '../Icon';

interface IconButtonProps {
  name: string;
  color: string;
  size: number | 'small' | 'medium' | 'large' | undefined;
  className?: string;
  style?: any;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = props => {
  const IconStyle = {
    color: props.color,
    name: props.name,
    size: props.size,
  };

  return (
    <StyledTouchableView
      onPress={props.onPress}
      className={props.className}
      style={props.style}
      size={props.size}
    >
      <Icon {...IconStyle} />
    </StyledTouchableView>
  );
};

export default IconButton;

const StyledTouchableView = styled(TouchableView)<IconButtonProps>`
  ${({ size }) => {
    let frontSizeString;
    const sizes = {
      small: 16,
      medium: 32,
      large: 48,
    };
    // If use input is number then use number
    // Else if use input is nothing return default 16, and the container should be 24x24 to keep a space between two Icons
    // If user input small, medium or large then return the relevent one
    if (typeof size === 'number' && Number.isFinite(size) && size > 0) {
      frontSizeString = size;
    } else if (size === 'small' || size === 'medium' || size === 'large') {
      frontSizeString = sizes[size];
    } else {
      frontSizeString = 16;
      return `height: 24px;
              width: 24px;`;
    }
    return `height: ${frontSizeString}px;
          width: ${frontSizeString}px;`;
  }};
`;
