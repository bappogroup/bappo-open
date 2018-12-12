import React from 'react';
import { DatePickerField } from 'bappo-components';

class Minimal extends React.Component {
  state = {
    value: '1992-11-11',
  };

  render() {
    return (
      <DatePickerField
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
        label="Birthday"
      />
    );
  }
}

export default Minimal;
