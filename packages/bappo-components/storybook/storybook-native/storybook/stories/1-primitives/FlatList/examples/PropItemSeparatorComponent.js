import React from 'react';
import { FlatList, Text, View } from 'bappo-components';

const data = Array.from({ length: 50 })
  .map((num, index) => ({
    key: String(index),
  }));

const PropItemSeparatorComponent = () => {
  return (
    <View style={{ height: 200 }}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'blue' }} />}
        renderItem={({ item }) => (
          <Text>{item.key}</Text>
        )}
      />
    </View>
  );
};

export default PropItemSeparatorComponent;
