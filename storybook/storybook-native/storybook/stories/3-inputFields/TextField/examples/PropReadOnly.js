import React from 'react';
import { TextField } from 'bappo-components';

class TextInputReadOnlyExample extends React.Component {
  render() {
    return (
      <TextField
        label="City Name"
        readOnly
        value="Rome"
        onValueChange={value => this.setState({ value })}
      />
    );
  }
}

export default TextInputReadOnlyExample;
