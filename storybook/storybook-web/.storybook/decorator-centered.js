import React from 'react';
import { Styles, View } from 'bappo-components';

const styles = {
  root: {
    minHeight: '100vh',
    maxWidth: 1080,
    marginHorizontal: 'auto',
  },
};

export default function(renderStory) {
  return <View style={styles.root}>{renderStory()}</View>;
}
