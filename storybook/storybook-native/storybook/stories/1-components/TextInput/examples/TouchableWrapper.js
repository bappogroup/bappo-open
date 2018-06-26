import React from 'react';
import { TextInput, TouchableView, View } from 'bappo-components';
import { styles as helperStyles } from '../helpers';

export default class TouchableWrapper extends React.Component {
  render() {
    return (
      <TouchableView onPress={this._handlePress}>
        <View style={styles.container}>
          <TextInput
            multiline={false}
            ref={this._setRef}
            style={helperStyles.textinput}
          />
        </View>
      </TouchableView>
    );
  }

  _handlePress = () => {
    if (this._input) {
      this._input.focus();
    }
  };

  _setRef = c => {
    this._input = c;
  };
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 50,
  },
};
