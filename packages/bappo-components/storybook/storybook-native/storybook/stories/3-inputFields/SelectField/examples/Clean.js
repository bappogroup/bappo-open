import React from 'react';
import { SelectField, View } from 'bappo-components';

const options = [
  { label: 'Bob Mc Donald', value: '1' },
  { label: 'Andrew Smith', value: '2' },
  { label: 'Sandra Jones', value: '3' },
  { label: 'Peter Soloman', value: '4' },
  { label: 'Joe Peters', value: '5' },
];

class SelectFieldMinimalExample extends React.Component {
  state = {
    selectedValue: null,
  };

  render() {
    return (
      <View style={{ width: 300 }}>
        <SelectField
          searchable={false}
          clearable={false}
          reserveErrorSpace={false}
          options={options}
          value={this.state.selectedValue}
          onValueChange={selectedValue => this.setState({ selectedValue })}
        />
      </View>
    );
  }
}

export default SelectFieldMinimalExample;
