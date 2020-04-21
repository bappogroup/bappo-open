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
    >
      <Icon {...IconStyle} />
    </StyledTouchableView>
  );
};

export default IconButton;

const StyledTouchableView = styled(TouchableView)`
  align-items: center;
  justify-content: center;
`;
