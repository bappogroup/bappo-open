import { TimePicker } from 'bappo-components';
import React from 'react';

class Minimal extends React.Component {
  state = {
    value: '11:22:33',
  };

  render() {
    return (
      <TimePicker
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
        // displayRight="-40"
      />
    );
  }
}

export default Minimal;
