// @flow

import * as React from 'react';
import styled from 'styled-components';
import Text from '../../primitives/Text';

type GlyphMap = {
  [string]: number,
};

type Props = {
  name: string,
  style?: any,
  className?: any,
};

const createIcon = (
  fontFamily: string,
  fontFileName: string,
  glyphMap: GlyphMap,
) => {
  class Icon extends React.Component<Props> {
    render() {
      const { className, name, style } = this.props;

      let glyph = glyphMap[name] || '?';
      if (typeof glyph === 'number') {
        glyph = String.fromCharCode(glyph);
      }

      const styleProps = {
        className,
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
