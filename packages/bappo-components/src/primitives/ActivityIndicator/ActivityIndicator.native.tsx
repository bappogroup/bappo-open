import * as React from 'react';
import RN from 'react-native';

import { ActivityIndicatorProps } from './types';

export default function ActivityIndicator({
  animating = true,
  color = '#999',
  size = 'small',
  style,
}: ActivityIndicatorProps) {
  return <RN.ActivityIndicator {...{ color, animating, size, style }} />;
}
