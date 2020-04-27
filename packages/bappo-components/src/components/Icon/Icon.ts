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
    let fontSizeString;
    const sizes = {
      small: 16,
      medium: 32,
      large: 48,
    };
    // If use input is number then use number
    // Else if use input is nothing return default 16
    // If user input small, medium or large then return the relevent one
    if (typeof size === 'number' && Number.isFinite(size) && size > 0) {
      fontSizeString = size;
    } else if (size === 'small' || size === 'medium' || size === 'large') {
      fontSizeString = sizes[size];
    } else {
      fontSizeString = 16;
      return `height: 24px;
              line-height: 24px;
              width: 24px;
              font-size: ${fontSizeString}px`;
    }
    return `height: ${fontSizeString}px;
            line-height: ${fontSizeString}px;
            width: ${fontSizeString}px;
            font-size: ${fontSizeString}px`;
  }};
`;
Icon.displayName = 'Icon';

export default Icon;
