import React from 'react';
import { OldSelect } from 'bappo-components';

class Example extends React.Component {
  state = {
    value: '1',
  };

  render() {
    return (
      <OldSelect
        options={[{ label: 'one', value: '1' }, { label: 'two', value: '2' }]}
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
      />
    );
  }
}

export default Example;
