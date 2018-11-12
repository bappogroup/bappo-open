// @flow

import * as React from 'react';
import Text from '../../primitives/Text';
import IconText from './IconText';

type GlyphMap = {
  [string]: number,
};

type Props = {
  name: string,
  style?: any,
};

const createIcon = (
  fontFamily: string,
  fontFileName: string,
  glyphMap: GlyphMap,
) => {
  // Android doesn't care about actual fontFamily name, it will only look in fonts folder
  const fontReference = fontFileName.replace(/\.(otf|ttf)$/, '');

  class Icon extends React.Component<Props> {
    setNativeProps = (nativeProps: any) => {
      this._text && this._text.setNativeProps(nativeProps);
    };

    render() {
      const { name, style } = this.props;

      let glyph = glyphMap[name] || '?';
      if (typeof glyph === 'number') {
        glyph = String.fromCharCode(glyph);
      }

      const styleProps = {
        fontFamily: fontReference,
        style,
      };

      return (
        <IconText {...styleProps} innerRef={this._captureTextRef}>
          {glyph}
        </IconText>
      );
    }

    _text: ?React.ElementRef<typeof Text>;

    _captureTextRef = (ref: ?React.ElementRef<typeof Text>) => {
      this._text = ref;
    };
  }

  return Icon;
};

export default createIcon;
