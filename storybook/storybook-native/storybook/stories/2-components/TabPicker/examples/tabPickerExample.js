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
    selected: 'mon,tue',
  };

  render() {
    return (
      <TabPicker
        options={options}
        value={this.state.selected}
        onValueChange={selected => this.setState({ selected })}
      />
    );
  }
}

export default TabPickerExample;
