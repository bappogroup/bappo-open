// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import TextInput from '../../primitives/TextInput';
import TouchableView from '../../primitives/TouchableView';
import View from '../../primitives/View';
import Icon from '../Icon';
import Paragraph from '../Paragraph';
import { FieldInputContainer } from '../input-fields/StyledComponents';

type Props = {
  options: Array<any>,
  optionToString: any => string,
  onChange: any => any,
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
    const { optionToString, onChange, selected, multi } = this.props;
    return (
      <ListItem
        key={`list-option-${optionToString(option)}`}
        onPress={() => {
          onChange(multi ? [...selected, option] : option);
          this.setState({ value: '' });
        }}
      >
        {option.icon && <Icon name={option.icon} />}
        <Paragraph>{optionToString(option)}</Paragraph>
      </ListItem>
    );
  };

  createNew = () => {
    const { onCreate } = this.props;
    const { value } = this.state;

    if (!onCreate) return;

    return (
      <ListItem
        onPress={() => {
          onCreate(value);
          this.setState({ value: '' });
        }}
      >
        <Icon name="add-circle-outline" />
        <Paragraph>Create {value}</Paragraph>
      </ListItem>
    );
  };

  noOptions = () => (
    <ListItemNoTouch>
      <Icon name="sentiment-very-dissatisfied" />
      <Paragraph>No options found</Paragraph>
    </ListItemNoTouch>
  );

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

    console.log('op', filteredOptions);

    return (
      <DropdownWrapper>
        {onCreate && this.createNew()}
        {filteredOptions.length > 0 &&
          filteredOptions.map(option => this.listOption(option))}
        {filteredOptions.length === 0 && !onCreate && this.noOptions()}
      </DropdownWrapper>
    );
  };

  multiCards = () => {
    const { selected, optionToString } = this.props;

    console.log('s', selected);

    // rework onChange to onChanges
    return selected.map(option => (
      <MultiSelectItem>
        <Paragraph type="white">{optionToString(option)}</Paragraph>
      </MultiSelectItem>
    ));
  };

  focus() {
    this._textInputRef.current && this._textInputRef.current.focus();
  }

  render() {
    const { value } = this.state;
    const {
      onBlur,
      onFocus,
      label,
      optionToString,
      selected,
      multi,
    } = this.props;

    return (
      <View>
        <SelectFieldInputContainer
          onPress={() => {
            console.log('hit');
            this.focus();
          }}
          borderRadiusBottom={!value}
        >
          {multi && this.multiCards()}
          <StyledTextInput
            label={label}
            ref={this._textInputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            value={value}
            placeholder={selected && optionToString(selected)}
            onValueChange={newValue => this.setState({ value: newValue })}
          />
        </SelectFieldInputContainer>
        {value && this.dropdown()}
      </View>
    );
  }

  _textInputRef = React.createRef();
}

const SelectFieldInputContainer = styled(FieldInputContainer)`
  border-radius: 4px 4px
    ${props => (props.borderRadiusBottom ? '4px 4px' : '0px 0px')};
  min-height: 40px;
  height: auto;
  padding: 2px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

const StyledTextInput = styled(TextInput)`
  margin: 0px 6px;
`;

const ListItem = styled(TouchableView)`
  padding: 8px;
  display: flex;
  flex-direction: row;
  background: white;
  cursor: pointer;
`;

const ListItemNoTouch = styled(View)`
  padding: 8px;
  display: flex;
  flex-direction: row;
  background: white;
`;

const MultiSelectItem = styled(View)`
  padding: 4px 8px;
  background: #0070d2;
  border-radius: 4px;
  border: 1px solid #0031ac;
  margin: 2px;
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
