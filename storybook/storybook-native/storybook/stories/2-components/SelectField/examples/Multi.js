import React from 'react';
import { SelectField, Background, View, styled } from 'bappo-components';

class SelectFieldMultiExample extends React.Component {
  state = {
    options: [
      { value: 'apple', count: 42, icon: 'ac-unit' },
      { value: 'pear', count: 22 },
      { value: 'orange', count: 14 },
      { value: 'grape', count: 31 },
      { value: 'banana', count: 19 },
    ],
    selected: [],
  };

  onCreateOption = optionStr => {
    let { options } = this.state;

    const newOption = {
      value: optionStr,
      count: 0,
    };

    const newOptions = [...options, newOption];
    this.setState({ options: newOptions, selectedOption: newOption });
  };

  render() {
    return (
      <Background>
        <StyledView>
          <p>Selected: {JSON.stringify(this.state.selected)}</p>
          <SelectField
            options={this.state.options}
            selected={this.state.selected}
            optionToString={option => option.value}
            onSelect={selected => this.setState({ selected })}
            onCreate={this.createOption}
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
