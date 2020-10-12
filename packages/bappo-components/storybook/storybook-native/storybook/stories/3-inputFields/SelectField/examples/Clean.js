import { SelectField, View } from 'bappo-components';
import React from 'react';

import states from '../../../../data/states';

class SelectFieldCleanExample extends React.Component {
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
          options={states.AU}
          value={this.state.selectedValue}
          onValueChange={(selectedValue) => this.setState({ selectedValue })}
        />
      </View>
    );
  }
}

export default SelectFieldCleanExample;
