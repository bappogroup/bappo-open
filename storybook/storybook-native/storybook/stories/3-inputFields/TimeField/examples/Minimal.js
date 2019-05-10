import React from 'react';
import { TimeField } from 'bappo-components';

class Minimal extends React.Component {
  state = {
    value: '19:34:00',
  };

  render() {
    return (
      <TimeField
        onValueChange={value => this.setState({ value })}
        value={this.state.value}
        label="Time"
      />
    );
  }
}

export default Minimal;
