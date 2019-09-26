import React from 'react';
import { TextField } from 'bappo-components';

class TextInputMultilineExample extends React.Component {
  state = {
    value: '',
  };

  render() {
    return (
      <TextField
        label="Multiline Notes"
        multiline
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
      />
    );
  }
}

export default TextInputMultilineExample;
