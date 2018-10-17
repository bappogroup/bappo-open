import React from 'react';
import { SelectField, View } from 'bappo-components';

const options = [
  { label: 'Bob', value: '1' },
  { label: 'Andrew', value: '2' },
  { label: 'Sandra Jones', value: '3' },
  { label: 'Peter Soloman', value: '4' },
  { label: 'Joe Peters', value: '5' },
];

class SelectFieldMinimalExample extends React.Component {
  state = {
    selectedValues: null,
  };

  render() {
    return (
      <View style={{ width: 300 }}>
        <SelectField
          label="All Participants"
          options={options}
          value={this.state.selectedValues}
          onValueChange={selectedValues => this.setState({ selectedValues })}
          multi
        />
      </View>
    );
  }
}

export default SelectFieldMinimalExample;
