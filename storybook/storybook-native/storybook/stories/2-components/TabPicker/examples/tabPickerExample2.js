import React from 'react';
import { TabPicker } from 'bappo-components';

const options = [
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
  { label: 'Undetermined', value: '-' },
];

class TabPickerExample extends React.Component {
  state = {};

  render() {
    return (
      <TabPicker
        options={options}
        selected={this.state.selected}
        optionToString={option => `${option.label}`}
        onChange={selected => this.setState({ selected })}
      />
    );
  }
}

export default TabPickerExample;
