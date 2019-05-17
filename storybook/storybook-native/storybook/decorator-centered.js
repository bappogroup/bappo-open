import React from 'react';
import { StatusBar, View } from 'react-native';

export default renderStory => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden={false} />
      {renderStory()}
    </View>
  );
};
