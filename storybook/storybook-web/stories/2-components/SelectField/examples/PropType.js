import React from 'react';
import { SelectField, View } from 'bappo-components';

class SelectFieldTypeExample extends React.Component {
  state = {
    items: [
      { value: 'apple', count: 42 },
      { value: 'pear', count: 22 },
      { value: 'orange', count: 14 },
      { value: 'grape', count: 31 },
      { value: 'banana', count: 19 },
    ],
  };

  itemToString = item => item.value;

  createItem = itemStr => {
    let { items } = this.state;

    const newItem = {
      value: itemStr,
      count: 0,
    };

    const newItems = [...items, newItem];
    this.setState({ items: newItems, selectedItem: newItem });
  };

  render() {
    const { items, selectedItem } = this.state;

    return (
      <View>
        <p>Selected: {JSON.stringify(selectedItem)}</p>
        <SelectField
          items={items}
          itemToString={this.itemToString}
          selectItem={selectedItem => this.setState({ selectedItem })}
          createItem={this.createItem}
        />
      </View>
    );
  }
}

export default SelectFieldTypeExample;
