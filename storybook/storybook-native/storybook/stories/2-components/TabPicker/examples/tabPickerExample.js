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
    selectedOptions: [
      options[0],
      options[1],
      options[2],
      options[3],
      options[4],
    ],
  };

  render() {
    console.log(this.state.selectedOptions);
    return (
      <TabPicker
        options={options}
        selectedOptions={this.state.selectedOptions}
        optionToString={option => `${option.label}`}
        onChange={selectedOptions => this.setState({ selectedOptions })}
      />
    );
  }
}

export default TabPickerExample;
