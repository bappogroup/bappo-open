import React from 'react';
import { ActivityIndicator, View } from 'bappo-components';

const ActivityIndicatorAnimatingExample = () => (
  <View style={styles.horizontal}>
    <ActivityIndicator />
    <ActivityIndicator animating={false} />
  </View>
);

const styles = {
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
  },
};

export default ActivityIndicatorAnimatingExample;
