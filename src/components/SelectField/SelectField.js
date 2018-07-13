// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import TextInput from '../../primitives/TextInput';
import TouchableView from '../../primitives/TouchableView';
import View from '../../primitives/View';
import Icon from '../Icon';
import Paragraph from '../Paragraph';
import { FieldInputContainer } from '../input-fields/StyledComponents';
import TouchToFocusArea from '../input-fields/TouchToFocusArea';

type Props = {
  items: Array<any>,
  itemToString: any => string,
  selectItem: any => any,
  createItem: string => any,
  label?: string,
  onBlur?: () => void,
  onFocus?: () => void,
  selectedItem: any,
};

type State = {
  value: string,
};

class SelectField extends React.Component<Props, State> {
  state = {
    value: '',
  };

  listItem = (item: any) => {
    const { itemToString, selectItem } = this.props;
    return (
      <StyledTouchableView
        key={`list-item-${itemToString(item)}`}
        onPress={() => {
          selectItem(item);
          this.setState({ value: '' });
        }}
      >
        {item.icon && <Icon name={item.icon} />}
        <Paragraph>{itemToString(item)}</Paragraph>
      </StyledTouchableView>
    );
  };

  dropdown = () => {
    const { items, createItem, itemToString } = this.props;
    const { value } = this.state;

    let filteredItems = items.filter(item =>
      itemToString(item).includes(value),
    );

    const createNew = (
      <StyledTouchableView
        onPress={() => {
          createItem(value);
          this.setState({ value: '' });
        }}
      >
        <Icon name="add-circle-outline" />
        <Paragraph>Create {value}</Paragraph>
      </StyledTouchableView>
    );

    return (
      <DropdownWrapper>
        {createItem && createNew}
        {filteredItems.map(item => this.listItem(item))}
      </DropdownWrapper>
    );
  };

  focus() {
    this._textInputRef.current && this._textInputRef.current.focus();
  }

  render() {
    const { value } = this.state;
    const { onBlur, onFocus, label, itemToString, selectedItem } = this.props;

    return (
      <View>
        <StyledTouchToFocusArea onPress={() => this.focus()}>
          <SelectFieldInputContainer borderRadiusBottom={!value}>
            <TextInput
              label={label}
              ref={this._textInputRef}
              onBlur={onBlur}
              onFocus={onFocus}
              value={value}
              placeholder={selectedItem && itemToString(selectedItem)}
              onValueChange={newValue => this.setState({ value: newValue })}
            />
          </SelectFieldInputContainer>
        </StyledTouchToFocusArea>
        {value && this.dropdown()}
      </View>
    );
  }

  _textInputRef = React.createRef();
}

const StyledTouchToFocusArea = styled(TouchToFocusArea)`
  margin: 0px;
`;

const SelectFieldInputContainer = styled(FieldInputContainer)`
  border-radius: 4px 4px
    ${props => (props.borderRadiusBottom ? '4px 4px' : '0px 0px')};
`;

const StyledTouchableView = styled(TouchableView)`
  padding: 8px;
  display: flex;
  flex-direction: row;
  background: white;
  cursor: pointer;
`;

const DropdownWrapper = styled(View)`
  border-color: #dddbda;
  border-style: solid;
  border-width: 1px;
  border-top-width: 0px;
  overflow: hidden;
  max-height: 300px;
  border-radius: 0px 0px 4px 4px;
`;

export default SelectField;
