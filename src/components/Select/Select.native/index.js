// @flow

import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Menu from './Menu';
import Popup from './Popup';
import SearchBar from './SearchBar';
import SelectedOption from './SelectedOption';
import {
  Container,
  Control,
  IconText,
  ListContainer,
  ListEmptyContainer,
  MultiValueWrapper,
  OKText,
  Placeholder,
  PopupContentContainer,
  PopupText,
  PopupTopBar,
  PopupTouchableContainer,
} from './StyledComponents';
import type {
  Option,
  renderOptionType,
  Value,
} from '../types.js.flow';

type Props = {
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
  searchable: ?boolean,
  value?: Value,
  valueKey: string,
};

type State = {
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

  state: State = {
    inputValue: '',
    isOpen: false,
  };

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

    return (
      <Container>
        <TouchableOpacity
          onPress={this.focus}
        >
          <Control>
            <MultiValueWrapper>
              {this._renderSelectedValue(selectedOptions)}
            </MultiValueWrapper>
            {this._renderDropdownIcon()}
          </Control>
        </TouchableOpacity>
        {this._renderPopup(visibleOptions, selectedOptions)}
      </Container>
    );
  }

  _searchInput = (null: any);

  _addValue = (option: Option) => {
    const selectedOptions = this._getSelectedOptions();
    this._setValue(selectedOptions.concat(option));
  };

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
      multi,
      searchable,
    } = this.props;
    const selectedOptions = this._getSelectedOptions();
    const visibleOptions = this._filterOptions();
    return {
      hasValue: selectedOptions.length > 0,
      isMulti: multi,
      isSingle: !multi,
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

  _selectOption = (option: Option) => {
    if (this.props.multi) {
      this._addValue(option);
    } else {
      this._setValue([option]);
    }
  };

  _setPopupVisible = (visible: boolean) => {
    this.setState({ isOpen: visible });
  };

  _setValue = (options: Array<Option>) => {
    const { multi, onValueChange, valueKey } = this.props;
    if (!multi) {
      this.blur();
    }
    if (onValueChange) {
      const valueArray = options.map(option => option[valueKey]);
      const value = multi
        ? valueArray
        : (valueArray.length > 0 ? valueArray[0] : null);
      onValueChange(value);
    }
  };

  _toggleOption = (option: Option) => {
    const { valueKey } = this.props;
    const selectedOptions = this._getSelectedOptions();
    if (selectedOptions.find(op => op[valueKey] === option[valueKey])) {
      this._setValue(selectedOptions.filter(op => op[valueKey] !== option[valueKey]));
    } else {
      this._selectOption(option);
    }
  };

  _renderClear = () => {
    const {
      clearable,
      clearAllText,
      clearValueText,
      disabled,
      isLoading,
      multi,
      value,
    } = this.props;
    if (
      !clearable ||
      value === undefined ||
      value === null ||
      (multi && !value.length) ||
      disabled ||
      isLoading
    ) {
      return null;
    }

    const label = multi ? clearAllText : clearValueText;

    return (
      <TouchableOpacity
        onPress={this._clearValue}
      >
        <PopupText>{label}</PopupText>
      </TouchableOpacity>
    );
  };

  _renderConfirmButton = () => {
    if (!this.props.multi) return null;
    return (
      <TouchableOpacity
        onPress={this.blur}
      >
        <OKText>OK</OKText>
      </TouchableOpacity>
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

  _renderMenu = (
    options: Array<Option>,
    selectedOptions: Array<Option>,
  ) => {
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
      body = (
        <ListEmptyContainer>
          {body}
        </ListEmptyContainer>
      );
    } else {
      const { labelKey, multi, renderOption, valueKey } = this.props;
      const handleSelect = multi
        ? this._toggleOption
        : this._selectOption;
      body = (
        <Menu
          labelKey={labelKey}
          onSelect={handleSelect}
          options={options}
          renderOption={renderOption}
          selectedOptions={selectedOptions}
          valueKey={valueKey}
        />
      );
    }
    return (
      <ListContainer>
        {body}
      </ListContainer>
    );
  };

  _renderPopup = (
    options: Array<Option>,
    selectedOptions: Array<Option>,
  ) => {
    const { searchable } = this.props;
    const popupHeight = searchable ? 359 : 259;
    return (
      <Popup
        height={popupHeight}
        onRequestClose={this._onCancel}
        show={this.state.isOpen}
      >
        <PopupTouchableContainer
          activeOpacity={1}
          onPress={this._blurSearchInput}
        >
          <PopupContentContainer>
            <PopupTopBar>
              <TouchableOpacity
                onPress={this._onCancel}
              >
                <PopupText>Cancel</PopupText>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              {this._renderClear()}
              {this._renderConfirmButton()}
            </PopupTopBar>
            {this._renderSearchBar()}
            {this._renderMenu(options, selectedOptions)}
          </PopupContentContainer>
        </PopupTouchableContainer>
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
    const { labelKey, multi, placeholder, valueKey } = this.props;

    if (selectedOptions.length === 0) {
      return (
        <Placeholder>{placeholder}</Placeholder>
      );
    }
    if (multi) {
      return selectedOptions.map(option => (
        <SelectedOption
          key={`value-${option[valueKey]}`}
          labelKey={labelKey}
          option={option}
        />
      ));
    }
    const option = selectedOptions[0];
    return (
      <SelectedOption
        labelKey={labelKey}
        option={option}
      />
    );
  };
}

export default Select;
