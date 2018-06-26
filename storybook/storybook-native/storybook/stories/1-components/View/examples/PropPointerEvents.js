import React from 'react';
import { Text, TouchableView, View } from 'bappo-components';

const ViewStyleExample = () => (
  <View pointerEvents="box-none">
    <View pointerEvents="box-none">
      <View pointerEvents="none">
        <TouchableView onPress={() => console.log('none')}>
          <Text>none</Text>
        </TouchableView>
      </View>
      <View pointerEvents="auto">
        <TouchableView onPress={() => console.log('auto')}>
          <Text>auto</Text>
        </TouchableView>
      </View>
      <View pointerEvents="box-only">
        <TouchableView onPress={() => console.log('box-only')}>
          <Text>box-only</Text>
        </TouchableView>
      </View>
      <View pointerEvents="box-none">
        <TouchableView onPress={() => console.log('box-none')}>
          <Text>box-none</Text>
        </TouchableView>
      </View>
    </View>
  </View>
);

export default ViewStyleExample;
