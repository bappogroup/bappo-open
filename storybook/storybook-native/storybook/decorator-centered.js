import React from 'react';
import { ScrollView, View } from 'bappo-components';
import { StatusBar } from 'react-native';

export default renderStory => {
  return (
    <ScrollView>
      <StatusBar hidden={false} />
      {renderStory()}
    </ScrollView>
  );
};
