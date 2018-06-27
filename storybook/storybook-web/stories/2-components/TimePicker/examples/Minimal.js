import React from 'react';
import { TimePicker } from 'bappo-components';

class Minimal extends React.Component {
  state = {
    value: '11:22:33',
  };

  render() {
    return (
      <TimePicker
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
      />
    );
  }
}

export default Minimal;
