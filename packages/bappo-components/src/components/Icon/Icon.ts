// @flow

import { styled } from '../../apis/Style';
import IconMaterial from './IconMaterial';

interface IconProps {
  color: string;
  size: number | 'small' | 'medium' | 'large' | undefined;
}

const Icon = styled(IconMaterial)<IconProps>`
  flex: none;
  align-items: center;

  ${({ color }) => color && `color: ${color}`};
  ${({ size }) => {
    let frontSizeString;
    const sizes = {
      small: 16,
      medium: 32,
      large: 48,
    };
    // If use input is number then use number
    // Else if use input is nothing return default 16
    // If user input small, medium or large then return the relevent one
    if (typeof size === 'number') {
      frontSizeString = size;
    } else if (!size) {
      frontSizeString = 16;
    } else {
      frontSizeString = sizes[size];
    }

    return `height: ${frontSizeString}px;line-height: ${frontSizeString}px;width: ${frontSizeString}px;font-size: ${frontSizeString}px`;
  }};
`;
Icon.displayName = 'Icon';

export default Icon;
