import { Select, View } from 'bappo-components';
import React from 'react';

import states from '../../../../data/states';

class SelectMultiExample extends React.Component {
  state = {
    selectedValues: null,
  };

  render() {
    return (
      <View style={{ width: 300 }}>
        <Select
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

export default SelectMultiExample;
