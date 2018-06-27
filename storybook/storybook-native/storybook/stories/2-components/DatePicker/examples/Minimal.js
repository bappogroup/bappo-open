import React from 'react';
import { DatePicker } from 'bappo-components';

class Minimal extends React.Component {
  state = {
    value: '2017-11-11',
  };

  render() {
    return (
      <DatePicker
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
      />
    );
  }
}

export default Minimal;
