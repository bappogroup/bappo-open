import React from 'react';
import { TabPicker } from 'bappo-components';

const options = [
  { label: 'Mon', value: 'mon' },
  { label: 'Tue', value: 'tue' },
  { label: 'Wed', value: 'wed' },
  { label: 'Thu', value: 'thu' },
  { label: 'Fri', value: 'fri' },
  { label: 'Sat', value: 'sat' },
  { label: 'Sun', value: 'sun' },
];

class TabPickerExample extends React.Component {
  state = {
    selected: [options[0], options[1], options[2], options[3], options[4]],
  };

  render() {
    return (
      <TabPicker
        options={options}
        multi
        selected={this.state.selected}
        optionToString={option => `${option.label}`}
        onChange={selected => this.setState({ selected })}
      />
    );
  }
}

export default TabPickerExample;
