import { Select, View } from 'bappo-components';
import React from 'react';

const options = [
  { label: 'Bob', value: '1' },
  { label: 'Andrew', value: '2' },
  { label: 'Sandra Jones', value: '3' },
  { label: 'Peter Soloman', value: '4' },
  { label: 'Joe Peters', value: '5' },
];

class SelectMinimalExample extends React.Component {
  state = {
    selectedValues: null,
  };

  render() {
    return (
      <View style={{ width: 300 }}>
        <Select
          placeholder="Type to search"
          options={options}
          value={this.state.selectedValues}
          onValueChange={(selectedValues) => this.setState({ selectedValues })}
          multi
        />
      </View>
    );
  }
}

export default SelectMinimalExample;
