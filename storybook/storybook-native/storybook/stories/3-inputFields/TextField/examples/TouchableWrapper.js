import React from 'react';
import { TextField, TouchableView, View } from 'bappo-components';

export default class TouchableWrapper extends React.Component {
  state = {
    value: '',
  };

  render() {
    return (
      <TouchableView onPress={this._handlePress} style={styles.button}>
        <View style={styles.container}>
          <TextField
            ref={this._setRef}
            value={this.state.value}
            onValueChange={value => this.setState({ value })}
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
  button: {
    backgroundColor: 'lightgray',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 50,
  },
};
