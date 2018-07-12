import React from 'react';
import { SelectField, Background, View, styled } from 'bappo-components';

class SelectFieldTypeExample extends React.Component {
  state = {
    items: [
      { value: 'apple', count: 42, icon: 'ac-unit' },
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
      <Background>
        <StyledView>
          <p>Selected: {JSON.stringify(selectedItem)}</p>
          <SelectField
            items={items}
            itemToString={this.itemToString}
            selectItem={selectedItem => this.setState({ selectedItem })}
            createItem={this.createItem}
          />
        </StyledView>
      </Background>
    );
  }
}

const StyledView = styled(View)`
  max-width: 300px;
`;

export default SelectFieldTypeExample;
