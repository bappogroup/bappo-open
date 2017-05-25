// @flow

import React from 'react';
import RX from 'reactxp';
import Text from '../common/Text';

type GlyphMap = {
  [string]: number,
};

type Props = {
  innerRef?: Function,
  name: string,
  style?: any,
};

const createIcon = (fontFamily: string, fontFileName: string, glyphMap: GlyphMap) => {
  // Android doesn't care about actual fontFamily name, it will only look in fonts folder
  const fontReference = fontFileName.replace(/\.(otf|ttf)$/, '');

  class Icon extends RX.Component<any, Props, any> {
    node = null;

    setNativeProps = (nativeProps: any) => {
      if (this.node) {
        this.node.setNativeProps(nativeProps);
      }
    };

    render() {
      const { children, innerRef, name, style, ...props } = this.props;

      let glyph = glyphMap[name] || '?';
      if (typeof glyph === 'number') {
        glyph = String.fromCharCode(glyph);
      }

      const iconStyles = [
        styles.default,
        RX.Styles.createTextStyle({ fontFamily: fontReference }),
      ];
      if (Array.isArray) {
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
