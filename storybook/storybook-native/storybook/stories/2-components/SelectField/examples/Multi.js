import React from 'react';
import { SelectField, Background, View, styled } from 'bappo-components';

class SelectFieldMultiExample extends React.Component {
  state = {
    items: [
      { value: 'apple', count: 42, icon: 'ac-unit' },
      { value: 'pear', count: 22 },
      { value: 'orange', count: 14 },
      { value: 'grape', count: 31 },
      { value: 'banana', count: 19 },
    ],
    selectedItems: [],
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

  selectItem = selectedItem => {
    const { selectedItems } = this.state;
    const newSelectedItems = [...selectedItems, selectedItem];
    this.setState({ selectedItems: newSelectedItems });
  };

  render() {
    const { items, selectedItems } = this.state;

    return (
      <Background>
        <StyledView>
          <p>Selected: {JSON.stringify(selectedItems)}</p>
          <SelectField
            items={items}
            itemToString={this.itemToString}
            selectItem={this.selectItem}
            createItem={this.createItem}
            selectedItems={selectedItems}
            multi
          />
        </StyledView>
      </Background>
    );
  }
}

const StyledView = styled(View)`
  max-width: 300px;
`;

export default SelectFieldMultiExample;
