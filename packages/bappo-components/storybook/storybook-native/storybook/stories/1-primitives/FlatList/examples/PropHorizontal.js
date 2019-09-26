import React from 'react';
import { FlatList, Text, View } from 'bappo-components';
import { styles } from '../helpers';

const data = Array.from({ length: 50 })
  .map((num, index) => ({
    key: String(index),
  }));

const PropInverted = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => (
          <Text style={styles.column}>{item.key}</Text>
        )}
      />
    </View>
  );
};

export default PropInverted;
