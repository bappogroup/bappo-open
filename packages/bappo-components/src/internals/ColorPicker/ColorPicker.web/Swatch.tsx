import React from 'react';
import styled from 'styled-components';

import { SwatchProps } from '../types';
import { contrastingColor } from '../utils';

const ENTER = 13;

const Swatch = ({
  color,
  onClick,
  title = color.hex,
  active = false,
}: SwatchProps) => {
  const handleClick = (e) => onClick?.(color, e);
  const handleKeyDown = (e) => e.keyCode === ENTER && onClick?.(color, e);

  return (
    <SwatchControl
      onClick={handleClick}
      title={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      $color={color.hex}
    >
      {active ? <Dot $color={contrastingColor(color)} /> : null}
    </SwatchControl>
  );
};

export default Swatch;

const Dot = styled.div<{ $color: '#fff' | 'rgba(0,0,0,0.4)' | '#000' }>`
  position: absolute;
  background-color: ${({ $color }) => `${$color}`};
  border-radius: 50%;
  top: 8px;
  left: 8px;
  bottom: 8px;
  right: 8px;
`;

const SwatchControl = styled.div<{ $color?: string }>`
  ${({ $color }) => ($color ? `background-color: ${$color};` : ``)}
  outline: none;
  width: 24px;
  height: 24px;
  float: left;
  margin-right: 4px;
  margin-bottom: 4px;
  position: relative;
  cursor: pointer;
  box-shadow: inset 2px 2px 1px -1px rgba(0, 0, 0, 0.2);
`;
