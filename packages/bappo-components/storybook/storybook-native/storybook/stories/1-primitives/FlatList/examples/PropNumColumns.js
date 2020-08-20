import { FlatList, Text, View } from 'bappo-components';
import React from 'react';

import { styles } from '../helpers';

const data = Array.from({ length: 69 }).map((num, index) => ({
  key: String(index),
}));

const PropNumColumns = () => {
  return (
    <View style={{ height: 300 }}>
      <FlatList
        data={data}
        getItemLayout={(_data, index) => ({
          length: 30,
          offset: 30 * index,
          index,
        })}
        numColumns={2}
        columnWrapperStyle={{ marginLeft: 20 }}
        renderItem={({ item }) => (
          <Text style={{ ...styles.row, marginLeft: 20 }}>{item.key}</Text>
        )}
      />
    </View>
  );
};

export default PropNumColumns;
