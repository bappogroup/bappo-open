import React from 'react';

import { styled } from '../../apis/Style';
import TouchableView from '../../primitives/TouchableView';
import Icon from '../Icon';
import { IconProps } from '../Icon/Icon';

interface IconButtonProps extends IconProps {
  onPress?: () => void;
  tooltip?: string;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
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
      tooltip={props.tooltip}
    >
      <Icon {...IconStyle} />
    </StyledTouchableView>
  );
};

export default IconButton;

const StyledTouchableView = styled(TouchableView)<
  Pick<IconButtonProps, 'size'>
>`
  ${({ size }) => {
    let containerSizeString;
    const sizes = {
      small: 16,
      medium: 32,
      large: 48,
    };
    // If use input is number then use number
    // Else if use input is nothing return default 16, and the container should be 24x24 to keep a space between two Icons
    // If user input small, medium or large then return the relevent one
    if (typeof size === 'number' && Number.isFinite(size) && size > 0) {
      containerSizeString = size;
    } else if (size === 'small' || size === 'medium' || size === 'large') {
      containerSizeString = sizes[size];
    } else {
      return `height: 24px;
              width: 24px;`;
    }
    return `height: ${containerSizeString}px;
          width: ${containerSizeString}px;`;
  }};
`;
