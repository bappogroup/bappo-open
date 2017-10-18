import React from 'react';
import { FlatList, Text, View } from 'bappo-components';
import { styles } from '../helpers';

const data = Array.from({ length: 50 })
  .map((num, index) => ({
    key: index,
  }));

const Minimal = () => {
  return (
    <View style={{ height: 300 }}>
      <FlatList
        data={data}
        onEndReached={() => alert('onEndReached fired!')}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <Text style={styles.row}>{item.key}</Text>
        )}
      />
    </View>
  );
};

export default Minimal;
