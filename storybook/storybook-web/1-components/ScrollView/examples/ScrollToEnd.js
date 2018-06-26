/* eslint-disable react/jsx-no-bind */

import React, { PureComponent } from 'react';
import { ScrollView, Text, TouchableView, View } from 'bappo-components';

export default class ScrollToEndExample extends PureComponent {
  render() {
    return (
      <View style={styles.scrollViewContainer}>
        <ScrollView
          ref={scrollview => {
            this.scrollview = scrollview;
          }}
          scrollEventThrottle={16} // ~60 events per second
          style={styles.scrollViewStyle}
        >
          {Array.from({ length: 50 }).map((item, i) => (
            <View key={i} style={styles.box}>
              <Text>{i}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableView
          onPress={() => {
            this.scrollview.scrollToEnd();
          }}
        >
          <Text>Scroll to end</Text>
        </TouchableView>
      </View>
    );
  }
}

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
    marginBottom: 21,
    backgroundColor: '#eee',
    padding: 10,
  },
};
