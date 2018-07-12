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
};

type State = {
  value: string,
};

class SelectField extends React.Component<Props, State> {
  state = {
    value: '',
  };

  render() {
    const { items, itemToString, selectItem } = this.props;
    const { value } = this.state;

    return (
      <View>
        <TextField
          label="Test label"
          onValueChange={newValue => this.setState({ value: newValue })}
          value={value}
        />
        {value &&
          items.map(item => (
            <TouchableView
              key={`list-item-${itemToString(item)}`}
              onClick={() => selectItem(item)}
            >
              {itemToString(item)}
            </TouchableView>
          ))}
      </View>
    );
  }
}

SelectField.defaultProps = {
  items: [],
};

export default SelectField;
