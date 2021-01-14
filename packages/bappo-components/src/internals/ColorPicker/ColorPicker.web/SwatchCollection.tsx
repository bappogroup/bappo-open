import React from 'react';
import styled from 'styled-components';

import { SwatchCollectionProps } from '../types';
import Swatch from './Swatch';

const SwatchCollection = ({
  colors,
  onClick,
  activeColor,
  className,
}: SwatchCollectionProps) => {
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
            active={active}
            key={color.hex}
          />
        );
      })}
    </CollectionContainer>
  );
};

const CollectionContainer = styled.div`
  width: 336px;
  margin-right: -4px;
`;

export default SwatchCollection;
