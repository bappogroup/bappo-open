import React from 'react';
import { SelectField, Background, View, styled } from 'bappo-components';

class SelectFieldMinimalExample extends React.Component {
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
            selectedItem={selectedItem}
          />
        </StyledView>
      </Background>
    );
  }
}

const StyledView = styled(View)`
  max-width: 300px;
`;

export default SelectFieldMinimalExample;
