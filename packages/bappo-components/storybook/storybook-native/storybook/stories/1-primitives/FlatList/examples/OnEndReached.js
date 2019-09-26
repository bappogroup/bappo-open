import React from 'react';
import { Alert, FlatList, Text, View } from 'bappo-components';
import { styles } from '../helpers';

const data = Array.from({ length: 50 }).map((num, index) => ({
  key: String(index),
}));

const Minimal = () => {
  return (
    <View style={{ height: 300 }}>
      <FlatList
        data={data}
        onEndReached={() => Alert.alert({ title: 'onEndReached fired!' })}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <Text style={styles.row}>{item.key}</Text>}
      />
    </View>
  );
};

export default Minimal;
