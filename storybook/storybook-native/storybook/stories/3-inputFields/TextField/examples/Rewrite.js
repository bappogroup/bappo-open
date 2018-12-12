import React from 'react';
import { Text, TextField, View } from 'bappo-components';

export default class TextInputRewrite extends React.Component {
  state = { text: '' };

  handleChangeText = text => {
    text = text.replace(/ /g, '_');
    this.setState({ text });
  };

  render() {
    const limit = 20;
    const remainder = limit - this.state.text.length;
    const remainderColor = remainder > 5 ? 'blue' : 'red';
    return (
      <View style={styles.rewriteContainer}>
        <TextField
          maxLength={limit}
          multiline={false}
          onValueChange={this.handleChangeText}
          value={this.state.text}
        />
        <Text style={{ ...styles.remainder, color: remainderColor }}>
          Remaining characters: {remainder}
        </Text>
      </View>
    );
  }
}

const styles = {
  rewriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remainder: {
    textAlign: 'right',
  },
};
