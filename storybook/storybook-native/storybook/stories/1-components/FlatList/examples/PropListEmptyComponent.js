import React from 'react';
import { FlatList, Text, View } from 'bappo-components';

const PropListEmptyComponent = () => {
  return (
    <View style={{ height: 300 }}>
      <FlatList
        data={[]}
        ListEmptyComponent={() => <Text>Empty List</Text>}
        renderItem={({ item }) => (
          <Text>{item.key}</Text>
        )}
      />
    </View>
  );
};

export default PropListEmptyComponent;
