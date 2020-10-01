import { SelectField, View } from 'bappo-components';
import React from 'react';

import states from '../../../../data/states';

class SelectFieldMultiExample extends React.Component {
  state = {
    selectedValues: null,
  };

  render() {
    return (
      <View style={{ width: 300 }}>
        <SelectField
          label="State"
          placeholder="Type to search"
          options={states.AU}
          value={this.state.selectedValues}
          onValueChange={(selectedValues) => this.setState({ selectedValues })}
          multi
        />
      </View>
    );
  }
}

export default SelectFieldMultiExample;
