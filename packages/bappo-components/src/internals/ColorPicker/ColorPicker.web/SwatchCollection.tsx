import React from 'react';
import styled from 'styled-components';

import { SwatchCollectionProps } from '../types';
import { hexAToRGBA } from '../utils';
import Swatch from './Swatch';

export const SwatchCollection = ({
  colors,
  style,
  onClick,
  activeColor,
  className,
}: SwatchCollectionProps) => {
  const swatchStyle = {
    width: '15px',
    height: '15px',
    float: 'left',
    marginRight: '4px',
    marginBottom: '4px',
    position: 'relative',
    cursor: 'pointer',
    ...style,
  };

  return (
    <CollectionContainer className={className}>
      {colors.map((color) => {
        const active =
          color.r === activeColor?.r &&
          color.g === activeColor?.g &&
          color.b === activeColor?.b &&
          color.a === activeColor?.a;
        return (
          <Swatch
            onClick={onClick}
            color={color}
            style={{ ...swatchStyle }}
            active={active}
          />
        );
      })}
    </CollectionContainer>
  );
};

const CollectionContainer = styled.div`
  width: 228px;
  clear: both;
`;

export default SwatchCollection;
