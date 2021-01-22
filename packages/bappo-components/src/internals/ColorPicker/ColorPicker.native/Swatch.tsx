import React from 'react';
import styled from 'styled-components';

import TouchableView from '../../../primitives/TouchableView';
import View from '../../../primitives/View';
import { SwatchProps } from '../types';
import { contrastingColor } from '../utils';

const Swatch = ({
  color,
  onClick,
  title = color.hex,
  active = false,
}: SwatchProps) => {
  const handleClick = (e) => onClick?.(color, e);

  const swatchStyle = {
    backgroundColor: color.hex,
    outline: 'none',
    width: 28,
    height: 28,
    marginRight: 4,
    marginBottom: 4,
  };

  return (
    <TouchableView style={swatchStyle} onPress={handleClick} title={title}>
      {active ? <Dot $color={contrastingColor(color)} /> : null}
    </TouchableView>
  );
};

export default Swatch;

const Dot = styled(View)<{ $color: '#fff' | 'rgba(0,0,0,0.4)' | '#000' }>`
  position: absolute;
  background-color: ${({ $color }) => `${$color}`};
  border-radius: 10px;
  top: 8px;
  left: 8px;
  bottom: 8px;
  right: 8px;
`;
