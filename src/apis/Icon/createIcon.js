// @flow

import React from 'react';
import RX from 'reactxp';
import Text from '../../components/Text';

type GlyphMap = {
  [string]: number,
};

type Props = {
  innerRef?: Function,
  name: string,
  style?: any,
};

const createIcon = (fontFamily: string, fontFileName: string, glyphMap: GlyphMap) => {
  class Icon extends RX.Component<any, Props, any> {
    node = null;

    render() {
      const { innerRef, name, style, ...props } = this.props;

      let glyph = glyphMap[name] || '?';
      if (typeof glyph === 'number') {
        glyph = String.fromCharCode(glyph);
      }

      const iconStyles = [
        styles.default,
        RX.Styles.createTextStyle({ fontFamily }),
      ];
      if (Array.isArray(style)) {
        iconStyles.push(...style);
      } else {
        iconStyles.push(style);
      }

      return (
        <Text
          {...props}
          ref={(node) => {
            this.node = node;
            innerRef && innerRef(node);
          }}
          style={iconStyles}
        >
          {glyph}
        </Text>
      );
    }
  }

  return Icon;
};

export default createIcon;

const styles = {
  default: RX.Styles.createTextStyle({
    textAlign: 'center',
  }),
};
