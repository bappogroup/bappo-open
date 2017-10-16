import React from 'react';
import { ActivityIndicator, View } from 'bappo-components';

const sizes = ['small', 'large'];

const ActivityIndicatorSizeExample = () => (
  <View style={styles.horizontal}>
    {sizes.map((size, i) => <ActivityIndicator key={i} size={size} style={styles.rightPadding} />)}
    <ActivityIndicator size="large" style={styles.large} />
  </View>
);

const styles = {
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightPadding: {
    paddingRight: 10,
  },
  large: { marginLeft: 20, transform: [{ scale: 1.75 }] },
};

ActivityIndicatorSizeExample.metadata = {
  id: 'ActivityIndicator.props.size',
  description: '',
};

export default ActivityIndicatorSizeExample;
