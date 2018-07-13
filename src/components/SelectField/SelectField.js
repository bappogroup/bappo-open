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
  options: Array<any>,
  optionToString: any => string,
  onSelect: any => any,
  onCreate?: string => any,
  label?: string,
  onBlur?: () => void,
  onFocus?: () => void,
  selected: any,
  multi: boolean,
};

type State = {
  value: string,
};

class SelectField extends React.Component<Props, State> {
  state = {
    value: '',
  };

  static defaultProps = {
    multi: false,
  };

  listOption = (option: any) => {
    const { optionToString, onSelect } = this.props;
    return (
      <StyledTouchableView
        key={`list-option-${optionToString(option)}`}
        onPress={() => {
          onSelect(option);
          this.setState({ value: '' });
        }}
      >
        {option.icon && <Icon name={option.icon} />}
        <Paragraph>{optionToString(option)}</Paragraph>
      </StyledTouchableView>
    );
  };

  dropdown = () => {
    const { options, onCreate, optionToString, multi } = this.props;
    const { value } = this.state;

    let filteredOptions = options.filter(
      option => optionToString(option).includes(value),
      // use pick
    );

    if (multi) {
      // use pick
    }

    const createNew = (
      <StyledTouchableView
        onPress={() => {
          onCreate(value);
          this.setState({ value: '' });
        }}
      >
        <Icon name="add-circle-outline" />
        <Paragraph>Create {value}</Paragraph>
      </StyledTouchableView>
    );

    return (
      <DropdownWrapper>
        {onCreate && createNew}
        {filteredOptions.map(option => this.listOption(option))}
      </DropdownWrapper>
    );
  };

  multiCards = () => {
    const { options, optionToString, multi } = this.props;

    // rework onSelect to onSelects
  };

  focus() {
    this._textInputRef.current && this._textInputRef.current.focus();
  }

  render() {
    const { value } = this.state;
    const { onBlur, onFocus, label, optionToString, selected } = this.props;

    return (
      <View>
        <StyledTouchToFocusArea onPress={() => this.focus()}>
          <SelectFieldInputContainer borderRadiusBottom={!value}>
            {this.multiCards()}
            <TextInput
              label={label}
              ref={this._textInputRef}
              onBlur={onBlur}
              onFocus={onFocus}
              value={value}
              placeholder={selected && optionToString(selected)}
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
