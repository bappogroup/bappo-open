import React from 'react';

import { styled } from '../../../apis/Style';
import ActivityIndicator from '../../ActivityIndicator';
import View from '../../View';
import { PdfProps } from '../types';

export default function Loading({
  accessibilityLabel,
  style,
  testID,
}: PdfProps) {
  return (
    <View accessibilityLabel={accessibilityLabel} style={style} testID={testID}>
      <SpinnerContainer>
        <ActivityIndicator size="large" />
      </SpinnerContainer>
    </View>
  );
}

const SpinnerContainer = styled(View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
