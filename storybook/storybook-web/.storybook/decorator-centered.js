import React from 'react';
import { ScrollView, Styles, View } from 'bappo-components';

const styles = {
  root: {
    height: '100vh',
  },
  scrollView: {
    maxWidth: 1080,
  },
};

export default function(renderStory) {
  return (
    <View style={styles.root}>
      <ScrollView style={styles.scrollView}>{renderStory()}</ScrollView>
    </View>
  );
}
