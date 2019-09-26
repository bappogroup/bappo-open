import React from 'react';
import RN from 'react-native';

export default function Image({ accessibilityLabel, source, style, testID }) {
  return (
    <RN.Image
      accessibilityLabel={accessibilityLabel}
      source={source}
      style={style}
      testID={testID}
    />
  );
}
