import React from 'react';
import { ScrollView, Text, TouchableView, View } from 'bappo-components';

const PropHorizontal = () => {
  return (
    <View style={styles.scrollViewContainer}>
      <ScrollView horizontal style={styles.scrollViewStyle}>
        {Array.from({ length: 50 }).map((item, i) => (
          <TouchableView key={i} onPress={() => {}} style={styles.box}>
            <Text>{i}</Text>
          </TouchableView>
        ))}
      </ScrollView>
    </View>
  );
};

export default PropHorizontal;

const styles = {
  box: {
    flexBasis: 20,
    flexGrow: 1,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
  },
  scrollViewContainer: {
    height: 150,
    width: 300,
  },
  scrollViewStyle: {
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#eee',
    padding: 10,
  },
};
