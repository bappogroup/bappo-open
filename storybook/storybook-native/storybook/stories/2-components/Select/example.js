import React from 'react';
import { OldSelect } from 'bappo-components';

const options = [
  { label: 'Bob Mc Donald', value: '1' },
  { label: 'Andrew Smith', value: '2' },
  { label: 'Sandra Jones', value: '3' },
  { label: 'Peter Soloman', value: '4' },
  { label: 'Joe Peters', value: '5' },
];

class Example extends React.Component {
  state = {
    value: '1',
  };

  render() {
    return (
      <OldSelect
        options={options}
        value={this.state.value}
        onValueChange={value => this.setState({ value })}
      />
    );
  }
}

export default Example;
