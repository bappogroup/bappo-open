import React from 'react';
import { Button, Text, View } from 'bappo-components';

const ViewStyleExample = () => (
  <View pointerEvents="box-none">
    <View pointerEvents="box-none">
      <View pointerEvents="none">
        <Button onPress={() => console.log('none')}>
          <Text>none</Text>
        </Button>
      </View>
      <View pointerEvents="auto">
        <Button onPress={() => console.log('auto')}>
          <Text>auto</Text>
        </Button>
      </View>
      <View pointerEvents="box-only">
        <Button onPress={() => console.log('box-only')}>
          <Text>box-only</Text>
        </Button>
      </View>
      <View pointerEvents="box-none">
        <Button onPress={() => console.log('box-none')}>
          <Text>box-none</Text>
        </Button>
      </View>
    </View>
  </View>
);

export default ViewStyleExample;
