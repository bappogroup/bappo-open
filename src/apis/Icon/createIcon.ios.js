// @flow

import * as React from 'react';
import styled from 'styled-components/native';
import Text from '../../primitives/Text';

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
        fontFamily,
        style,
      };

      return (
        <StyledText {...styleProps} innerRef={this._captureTextRef}>
          {glyph}
        </StyledText>
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

const StyledText = styled(Text)`
  font-family: ${props => props.fontFamily};
  text-align: center;
`;
