import React from 'react';
import { Text, TextInput, View } from 'bappo-components';
import { styles as helperStyles } from '../helpers';

export default class TextInputRewrite extends React.Component {
  state = { text: '' };

  handleChangeText = (text) => {
    text = text.replace(/ /g, '_');
    this.setState({ text });
  };

  render() {
    const limit = 20;
    const remainder = limit - this.state.text.length;
    const remainderColor = remainder > 5 ? 'blue' : 'red';
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          maxLength={limit}
          multiline={false}
          onValueChange={this.handleChangeText}
          style={helperStyles.textinput}
          value={this.state.text}
        />
        <Text style={{ ...styles.remainder, color: remainderColor }}>{remainder}</Text>
      </View>
    );
  }
}

export class TextInputRewriteInvalidCharacters extends React.Component {
  state = { text: '' };

  handleChangeText = (text) => {
    text = text.replace(/\s/g, '_');
    this.setState({ text });
  };

  render() {
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          multiline={false}
          onValueChange={this.handleChangeText}
          style={helperStyles.textinput}
          value={this.state.text}
        />
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
    width: 24,
  },
};
