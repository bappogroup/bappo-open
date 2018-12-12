import React from 'react';
import { TextField } from 'bappo-components';

class TextInputPlaceholderExample extends React.Component {
  state = {
    value: '',
  };

  render() {
    return (
      <TextField
        label="City Name"
        placeholder="Your home city"
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
      />
    );
  }
}

export default TextInputPlaceholderExample;
