/* eslint-disable react/jsx-no-bind */

import React, { PureComponent } from 'react';
import { Button, ScrollView, Text, View } from 'bappo-components';

export default class ScrollToExample extends PureComponent {
  render() {
    return (
      <View style={styles.scrollViewContainer}>
        <ScrollView
          ref={(scrollview) => {
            this.scrollview = scrollview;
          }}
          scrollEventThrottle={16} // ~60 events per second
          style={styles.scrollViewStyle}
        >
          {Array.from({ length: 50 }).map((item, i) => (
            <Button
              key={i}
              onPress={() => {}}
              style={styles.box}
            >
              <Text>{i}</Text>
            </Button>
          ))}
        </ScrollView>
        <Button
          onPress={() => {
            this.scrollview.scrollTo({ y: 100 });
          }}
        >
          <Text>Scroll to 100px</Text>
        </Button>
      </View>
    );
  }
}

const styles = {
  box: {
    flexBasis: 20,
    flexGrow: 1,
    flexShrink: 0,
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
