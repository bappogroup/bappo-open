// @flow

import * as React from 'react';
import {
  Picker,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Popup from './Popup';
import SearchBar from './SearchBar';
import SelectedOptionContainer from './SelectedOptionContainer';
import {
  Container,
  Control,
  IconText,
  ListContainer,
  MultiValueWrapper,
  OKText,
  Placeholder,
  PopupContentContainer,
  PopupText,
  PopupTopBar,
  StyledPicker,
} from './StyledComponents';
import type {
  Option,
  renderOptionType,
  renderSelectedOptionType,
  Value,
} from '../types.js.flow';

type Props = {
  autoBlur: ?boolean,
  autoFocus: ?boolean,
  clearable: ?boolean,
  clearAllText: string,
  clearValueText: string,
  defaultValue?: Value,
  disabled: ?boolean,
  filterOption?: ?(option: Option, searchText: string) => boolean,
  isLoading: ?boolean,
  labelKey: string,
  multi: ?boolean,
  noResultsText: string,
  onBlur?: ?() => void,
  onFocus?: ?() => void,
  onInputChange?: ?(text: string, triggeredByUser: boolean) => void,
  onValueChange?: ?(value: Value) => void,
  options?: ?Array<Option>,
  placeholder: string,
  renderOption?: ?renderOptionType,
  renderSelectedOption?: ?renderSelectedOptionType,
  searchable: ?boolean,
  value?: Value,
  valueKey: string,
};

type State = {
  focusedOption: ?Option,
  inputValue: string,
  isOpen: boolean,
};

class Select extends React.Component<Props, State> {
  props: Props;

  blur = () => {
    const { onBlur } = this.props;
    this._setPopupVisible(false);
    onBlur && onBlur();
  };

  focus = () => {
    this._openPicker();
  };

  static defaultProps = {
    autoBlur: true,
    autoFocus: false,
    clearable: true,
    clearAllText: 'Clear all',
    clearValueText: 'Clear value',
    disabled: false,
    isLoading: false,
    labelKey: 'label',
    multi: false,
    noResultsText: 'No results found',
    placeholder: 'Select...',
    searchable: true,
    valueKey: 'value',
  };

  static _findOption = (options: ?Array<Option>, valueKey: string, value: ?Value): ?Option => {
    const valueType = typeof value;
    if (valueType !== 'string' && valueType !== 'number') return null;

    if (!options) return null;

    for (let i = 0; i < options.length; i++) {
      if (options[i][valueKey] === value) return options[i];
    }
    return null;
  };

  constructor(props: Props) {
    super(props);

    const { defaultValue, options, value, valueKey } = this.props;
    let focusedOption = null;
    if (options) {
      focusedOption =
        Select._findOption(options, valueKey, value) ||
        Select._findOption(options, valueKey, defaultValue) ||
        (options.length > 0 ? options[0] : null);
    }
    this.state = {
      focusedOption,
      inputValue: '',
      isOpen: false,
    };
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  render() {
    const selectState = this._getSelectState();
    const {
      selectedOptions,
      visibleOptions,
    } = selectState;

    const { focusedOption } = this.state;

    return (
      <Container>
        <TouchableHighlight
          onPress={this.focus}
          underlayColor="transparent"
        >
          <Control>
            <MultiValueWrapper>
              {this._renderSelectedValue(selectedOptions)}
            </MultiValueWrapper>
            {this._renderDropdownIcon()}
          </Control>
        </TouchableHighlight>
        {this._renderPopup(visibleOptions, selectedOptions, focusedOption)}
      </Container>
    );
  }

  _searchInput = (null: any);

  _captureSearchInput = (ref) => {
    this._searchInput = ref;
  };

  _blurSearchInput = () => {
    this._searchInput && this._searchInput.blur();
  };

  _clearValue = () => {
    this._setValue([]);
  };

  _filterOptions = (excludeOptions: ?Array<Option>): Array<Option> => {
    const { filterOption, labelKey, valueKey } = this.props;
    const filterValue = this.state.inputValue.toLowerCase();
    const options = this.props.options || [];
    let excludeValues;
    if (excludeOptions) excludeValues = excludeOptions.map(i => i[valueKey]);
    return options.filter((option) => {
      if (excludeValues && excludeValues.indexOf(option[valueKey]) > -1) return false;
      if (filterOption) return filterOption(option, filterValue);
      if (!filterValue) return true;
      const labelTest = String(option[labelKey]).toLowerCase();
      return labelTest.indexOf(filterValue) >= 0;
    });
  };

  _focusOption = (option: ?Option) => {
    this.setState({
      focusedOption: option,
    });
  };

  _getOptionFromValue = (value: ?Value): ?Option => {
    const { options, valueKey } = this.props;
    return Select._findOption(options, valueKey, value);
  };

  _getOptionLabel = (option: Option): string => {
    return option[this.props.labelKey];
  };

  _getSelectedOptions = (): Array<Option> => {
    const { value } = this.props;

    let valueArray;
    if (Array.isArray(value)) {
      valueArray = value;
    } else {
      valueArray = [value];
    }
    return valueArray.map(this._getOptionFromValue).filter(Boolean);
  };

  _getSelectState = () => {
    const {
      clearable,
      disabled,
      isLoading,
      searchable,
    } = this.props;
    const selectedOptions = this._getSelectedOptions();
    const visibleOptions = this._filterOptions();
    return {
      hasValue: selectedOptions.length > 0,
      isClearable: clearable,
      isDisabled: disabled,
      isLoading,
      isOpen: this.state.isOpen,
      isSearchable: searchable,
      selectedOptions,
      visibleOptions,
    };
  };

  _onCancel = () => {
    this.blur();
  };

  _onPickerValueChange = (value: Value) => {
    const option = this._getOptionFromValue(value);
    if (option) {
      this._focusOption(option);
    }
  };

  _onSearchBarInputChange = (inputValue: string) => {
    const { onInputChange } = this.props;

    if (onInputChange) {
      onInputChange(inputValue, true);
    }
    this.setState({ inputValue });
  };

  _openPicker = () => {
    const { disabled, onFocus } = this.props;

    if (disabled) return;

    this._setPopupVisible(true);

    onFocus && onFocus();
  };

  _setPopupVisible = (visible: boolean) => {
    this.setState({ isOpen: visible });
  };

  _setValue = (options: Array<Option>) => {
    const { autoBlur, onValueChange, valueKey } = this.props;
    if (autoBlur) {
      this.blur();
    }
    if (onValueChange) {
      const valueArray = options.map(option => option[valueKey]);
      const value = valueArray.length > 0 ? valueArray[0] : null;
      onValueChange(value);
    }
  };

  _renderClear = () => {
    const {
      clearable,
      clearValueText,
      disabled,
      isLoading,
      value,
    } = this.props;
    if (
      !clearable ||
      value === undefined ||
      value === null ||
      disabled ||
      isLoading
    ) {
      return null;
    }

    const label = clearValueText;

    return (
      <TouchableHighlight
        onPress={this._clearValue}
        underlayColor="transparent"
      >
        <PopupText>{label}</PopupText>
      </TouchableHighlight>
    );
  };

  _renderDropdownIcon = () => {
    return (
      <IconText>⌄</IconText>
    );
  };

  _renderLabel = ({
    option,
  }: {
    option: Option,
  }) => {
    return (
      <Text>
        {this._getOptionLabel(option)}
      </Text>
    );
  };

  _renderList = (options: Array<Option>) => {
    let body = null;
    if (options.length === 0) {
      if (this.props.options && this.props.options.length > 0) {
        body = (
          <PopupText>{this.props.noResultsText}</PopupText>
        );
      } else {
        body = (
          <PopupText>No options available</PopupText>
        );
      }
    } else {
      const { valueKey } = this.props;
      const { focusedOption } = this.state;
      body = (
        <StyledPicker
          onValueChange={this._onPickerValueChange}
          selectedValue={focusedOption && focusedOption[valueKey]}
        >
          {options.map(this._renderOption)}
        </StyledPicker>
      );
    }
    return (
      <ListContainer>
        {body}
      </ListContainer>
    );
  };

  _renderOption = (option: Option, index: number) => {
    const { labelKey, valueKey } = this.props;

    return (
      <Picker.Item
        key={`option-${index}-${option[valueKey]}`}
        label={option[labelKey]}
        value={option[valueKey]}
      />
    );
  };

  _renderPopup = (
    options: Array<Option>,
    selectedOptions: ?Array<Option>,
    focusedOption: ?Option,
  ) => {
    const { searchable } = this.props;
    const popupHeight = searchable ? 359 : 259;
    return (
      <Popup
        height={popupHeight}
        onRequestClose={this._onCancel}
        show={this.state.isOpen}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={this._blurSearchInput}
        >
          <PopupContentContainer>
            <PopupTopBar>
              <TouchableHighlight
                onPress={this._onCancel}
                underlayColor="transparent"
              >
                <PopupText>Cancel</PopupText>
              </TouchableHighlight>
              <View style={{ flex: 1 }} />
              {this._renderClear()}
              <TouchableHighlight
                onPress={() => focusedOption && this._setValue([focusedOption])}
                underlayColor="transparent"
              >
                <OKText>OK</OKText>
              </TouchableHighlight>
            </PopupTopBar>
            {this._renderSearchBar()}
            {this._renderList(options)}
          </PopupContentContainer>
        </TouchableOpacity>
      </Popup>
    );
  };

  _renderSearchBar = () => {
    if (!this.props.searchable) return null;
    return (
      <SearchBar
        inputRef={this._captureSearchInput}
        isLoading={this.props.isLoading}
        onInputChange={this._onSearchBarInputChange}
        searchText={this.state.inputValue}
      />
    );
  };

  _renderSelectedValue = (
    selectedOptions: Array<Option>,
  ) => {
    const { placeholder, renderSelectedOption } = this.props;
    const render = renderSelectedOption || this._renderLabel;

    if (selectedOptions.length === 0) {
      return (
        <Placeholder>{placeholder}</Placeholder>
      );
    }
    const option = selectedOptions[0];
    return (
      <SelectedOptionContainer
        isSingle
        option={option}
      >
        {render({ option })}
      </SelectedOptionContainer>
    );
  };
}

export default Select;
