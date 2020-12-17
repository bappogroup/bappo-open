import React from 'react';
import styled from 'styled-components';

import { Color, SwatchProps } from '../types';

const ENTER = 13;

export const Swatch = ({
  color,
  style,
  onClick,
  title = color.hex,
  active = false,
}: SwatchProps) => {
  const handleClick = (e) => onClick?.(color, e);
  const handleKeyDown = (e) => e.keyCode === ENTER && onClick?.(color, e);

  const swatchStyle = {
    background: color.hex,
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    position: 'relative',
    outline: 'none',
    ...style,
  };

  return (
    <div
      style={swatchStyle}
      onClick={handleClick}
      title={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {active ? <Dot $color={contrastingColor(color)} /> : null}
    </div>
  );
};

export default Swatch;

const Dot = styled.div<{ $color: '#fff' | 'rgba(0,0,0,0.4)' | '#000' }>`
  position: absolute;
  background-color: ${({ $color }) => `${$color}`};
  border-radius: 50%;
  top: 4px;
  left: 4px;
  bottom: 4px;
  right: 4px;
`;

const contrastingColor = (color?: Color) => {
  if (!color) {
    return '#fff';
  }

  if (color.a === 0) {
    return 'rgba(0,0,0,0.4)';
  }
  const intensity =
    (color.r ?? 0) * 299 + (color.g ?? 0) * 587 + (color.b ?? 0) * 114;
  return intensity >= 128000 ? '#000' : '#fff';
};
