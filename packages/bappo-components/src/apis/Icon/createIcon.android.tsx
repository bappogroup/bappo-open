import React from 'react';
import { IconProps, GlyphMap } from './types';
import IconText from './IconText';

const createIcon = (
  fontFamily: string,
  fontFileName: string,
  glyphMap: GlyphMap,
) => {
  // Android doesn't care about actual fontFamily name, it will only look in fonts folder
  const fontReference = fontFileName.replace(/\.(otf|ttf)$/, '');

  return function Icon({ name, style }: IconProps) {
    let glyph = glyphMap[name] || '?';
    if (typeof glyph === 'number') {
      glyph = String.fromCharCode(glyph);
    }

    const styleProps = {
      fontFamilyValue: fontReference,
      style,
    };

    return <IconText {...styleProps}>{glyph}</IconText>;
  };
};

export default createIcon;
