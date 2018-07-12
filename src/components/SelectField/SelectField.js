// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import TouchableView from '../../primitives/TouchableView';
import View from '../../primitives/View';
import TextField from '../input-fields/TextField';

type Props = {
  items: Array<any>,
  itemToString: any => string,
  selectItem: any => any,
  createItem: string => any,
};

type State = {
  value: string,
};

class SelectField extends React.Component<Props, State> {
  state = {
    value: '',
  };

  dropdown = () => {
    const { items, itemToString, selectItem, createItem } = this.props;
    const { value } = this.state;

    let filteredItems = items.filter(item =>
      itemToString(item).includes(value),
    );

    if (filteredItems.length === 0 && createItem)
      return (
        <TouchableView
          onPress={() => {
            createItem(value);
            this.setState({ value: '' });
          }}
        >
          Create New {value}
        </TouchableView>
      );

    return filteredItems.map(item => (
      <TouchableView
        key={`list-item-${itemToString(item)}`}
        onPress={() => {
          selectItem(item);
          this.setState({ value: '' });
        }}
      >
        {itemToString(item)}
      </TouchableView>
    ));
  };

  render() {
    const { value } = this.state;

    return (
      <View>
        <TextField
          label="Test label"
          onValueChange={newValue => this.setState({ value: newValue })}
          value={value}
        />
        {value && this.dropdown()}
      </View>
    );
  }
}

SelectField.defaultProps = {
  items: [],
};

export default SelectField;
