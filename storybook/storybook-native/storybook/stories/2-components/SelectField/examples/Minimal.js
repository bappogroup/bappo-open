import React from 'react';
import {
  SelectField,
  Background,
  View,
  styled,
  Paragraph,
} from 'bappo-components';

class SelectFieldMinimalExample extends React.Component {
  state = {
    options: [
      { value: 'apple', count: 42 },
      { value: 'pear', count: 22 },
      { value: 'orange', count: 14 },
      { value: 'grape', count: 31 },
      { value: 'banana', count: 19 },
    ],
  };

  render() {
    return (
      <Background>
        <StyledView>
          <Paragraph>Selected: {JSON.stringify(this.state.selected)}</Paragraph>
          <SelectField
            options={this.state.options}
            selected={this.state.selected}
            optionToString={option => option.value}
            onChange={selected => this.setState({ selected })}
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
