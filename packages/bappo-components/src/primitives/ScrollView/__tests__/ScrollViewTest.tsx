import React, { PureComponent } from 'react';

import Text from '../../Text';
import TouchableView from '../../TouchableView';
import View from '../../View';
import ScrollView from '../ScrollView.web';

export default class ScrollViewTest extends PureComponent {
  scrollview: any;

  render() {
    return (
      <ScrollView
        ref={(scrollview) => {
          this.scrollview = scrollview;
        }}
        scrollEventThrottle={16}
        style={styles.scrollViewStyle}
        testID="test"
      >
        {Array.from({ length: 20 }).map((item, i) => (
          <View key={i} style={styles.box}>
            <Text>{i}</Text>
          </View>
        ))}
      </ScrollView>
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
  scrollViewStyle: {
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 21,
    backgroundColor: '#eee',
    padding: 10,
  },
};
