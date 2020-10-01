import { Select, View } from 'bappo-components';
import React from 'react';

import states from '../../../../data/states';

class SelectCleanExample extends React.Component {
  state = {
    selectedValue: null,
  };

  render() {
    return (
      <View style={{ width: 300 }}>
        <Select
          searchable={false}
          clearable={false}
          options={states.AU}
          value={this.state.selectedValue}
          onValueChange={(selectedValue) => this.setState({ selectedValue })}
        />
      </View>
    );
  }
}

export default SelectCleanExample;
