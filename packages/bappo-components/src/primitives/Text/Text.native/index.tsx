import React from 'react';
import RN from 'react-native';

import Colors from '../../../apis/Colors';
import FontContext from '../../Font/FontContext';
import { TextProps } from '../types';

export default function Text({
  accessibilityLabel,
  children,
  numberOfLines,
  selectable,
  style,
  testID,
}: TextProps) {
  const { fontFamily, fontSize } = React.useContext(FontContext);

  const props = {
    accessibilityLabel,
    numberOfLines,
    selectable,
    testID,
  };

  return (
    <RN.Text
      {...props}
      style={[
        styles.default,
        {
          fontFamily,
          fontSize,
        },
        style,
      ]}
    >
      {children}
    </RN.Text>
  );
}

const styles = RN.StyleSheet.create({
  default: {
    color: Colors.BLACK,
  },
});
