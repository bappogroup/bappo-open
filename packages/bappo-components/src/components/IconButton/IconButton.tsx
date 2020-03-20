import React from 'react';

import { styled } from '../../apis/Style';
import TouchableView from '../../primitives/TouchableView';
import Icon from '../Icon';

interface IconButtonProps {
  name: string;
  color: string;
  size: number;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = props => {
  const IconStyle = {
    color: props.color,
    name: props.name,
    size: props.size,
  };

  return (
    <TouchableView onPress={props.onPress}>
      <Icon {...IconStyle} style={{ fontSize: '80px' }} />
    </TouchableView>
  );
};

export default IconButton;
