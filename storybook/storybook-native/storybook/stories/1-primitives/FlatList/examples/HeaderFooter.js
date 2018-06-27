import React from 'react';
import { FlatList, Text, View } from 'bappo-components';
import { styles } from '../helpers';

const data = Array.from({ length: 50 })
  .map((num, index) => ({
    key: String(index),
  }));

const HeaderFooter = () => {
  return (
    <View style={{ height: 300 }}>
      <FlatList
        data={data}
        ListHeaderComponent={() => <Text>Header</Text>}
        ListFooterComponent={() => <Text>Footer</Text>}
        renderItem={({ item }) => (
          <Text style={styles.row}>{item.key}</Text>
        )}
      />
    </View>
  );
};

export default HeaderFooter;
