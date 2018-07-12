import React from 'react';
import { View, Text, VerticalSeparator } from 'bappo-components';

const VerticalSeparatorExample = () => (
  <View style={{ flexDirection: 'row' }}>
    <Text>text1</Text>
    <VerticalSeparator />
    <Text>text2</Text>
  </View>
);

export default VerticalSeparatorExample;
