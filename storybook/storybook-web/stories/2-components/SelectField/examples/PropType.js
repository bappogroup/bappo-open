import React from 'react';
import { SelectField, View } from 'bappo-components';

class SelectFieldTypeExample extends React.Component {
  state = {
    items: [
      { value: 'apple' },
      { value: 'pear' },
      { value: 'orange' },
      { value: 'grape' },
      { value: 'banana' },
    ],
  };

  itemToString = item => item.value;

  render() {
    const { items, selectedItem } = this.state;

    return (
      <View>
        <p>
          Selected: {selectedItem ? this.itemToString(selectedItem) : 'none'}
        </p>
        <SelectField
          items={items}
          itemToString={this.itemToString}
          selectItem={selectedItem => this.setState({ selectedItem })}
        />
      </View>
    );
  }
}

export default SelectFieldTypeExample;
