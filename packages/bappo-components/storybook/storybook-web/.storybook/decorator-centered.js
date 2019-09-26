import React from 'react';
import { View } from 'bappo-components';

const styles = {
  root: {
    height: '100vh',
  },
};

export default function(renderStory) {
  return <View style={styles.root}>{renderStory()}</View>;
}
