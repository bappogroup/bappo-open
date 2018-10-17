// @flow

import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Popup from '../../../internals/Picker.native/Popup';
import Menu from './Menu';
import SearchBar from './SearchBar';
import SelectedOption from './SelectedOption';
import {
  Container,
  Control,
  IconText,
  IconTextContainer,
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
import type { Option, renderOptionType, Value } from '../types.js.flow';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  /**
   * If `true`, focuses the input on `componentDidMount`. The default value is `false`.
   */
  autoFocus: ?boolean,
  /**
   * If `true`, the input value can be cleared by pressing a button. The default value is `true`.
   */
  clearable: ?boolean,
  clearAllText: string,
  clearValueText: string,
  filterOption?: ?(option: Option, searchText: string) => boolean,
  /**
   * See `getItemLayout` of `FlatList`.
   */
  getDropdownItemLayout?: (
    options: Array<Option>,
    index: number,
  ) => { length: number, offset: number, index: number },
  /**
   * If `true`, a spinner is displayed. The default value is `false`.
   */
  isLoading: ?boolean,
  labelKey: string,
  /**
   * If `true`, the input becomes a multi-select. The default value is `false`.
   */
  multi: ?boolean,
  /**
   * Text to show when there are no search results.
   */
  noResultsText: string,
  /**
   * Callback that is called when the input is blurred.
   */
  onBlur?: ?() => void,
  /**
   * Called once when the scroll position gets within `onDropdownEndReachedThreshold` of the
   * rendered content of the dropdown.
   */
  onDropdownEndReached?: ?() => void,
  /**
   * How far from the end (in units of visible length of the list) the bottom edge of the
   * list must be from the end of the content to trigger the `onDropdownEndReached` callback.
   */
  onDropdownEndReachedThreshold?: ?number,
  /**
   * Callback that is called when the input is focused.
   */
  onFocus?: ?() => void,
  /**
   * Callback that is called when the search input's text changes.
   */
  onInputChange?: ?(text: string, triggeredByUser: boolean) => void,
  /**
   * Callback that is called when the input value changes.
   */
  onValueChange?: ?(value: Value) => void,
  /**
   * An array of options.
   */
  options?: ?Array<Option>,
  /**
   * The string that will be rendered when there is no value.
   */
  placeholder: string,
  /**
   * If `true`, the input is not editable. The default value is `false`.
   */
  readOnly: ?boolean,
  /**
   * Function to render the dropdown icon.
   */
  renderDropdownIcon?: ?() => ?React.Element<any>,
  /**
   * Function to render an option. Requires `getDropdownItemLayout` to be implemented.
   */
  renderOption?: ?renderOptionType,
  /**
   * If `true`, user can use the text input to filter options. The default value is `true`.
   */
  searchable: ?boolean,
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
  /**
   * The value of the select input.
   */
  value?: Value,
  valueKey: string,
};

type State = {
  inputValue: string,
  isOpen: boolean,
};

class Select extends React.Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
    clearable: true,
    clearAllText: 'Clear all',
    clearValueText: 'Clear value',
    isLoading: false,
    labelKey: 'label',
    multi: false,
    noResultsText: 'No results found',
    placeholder: '',
    readOnly: false,
    searchable: true,
    valueKey: 'value',
  };

  static _findOption = (
    options: ?Array<Option>,
    valueKey: string,
    value: ?Value,
  ): ?Option => {
    const valueType = typeof value;
    if (valueType !== 'string' && valueType !== 'number') return null;

    if (!options) return null;

    for (let i = 0; i < options.length; i++) {
      if (options[i][valueKey] === value) return options[i];
    }
    return null;
  };

  blur = () => {
    const { onBlur } = this.props;
    this._setPopupVisible(false);
    onBlur && onBlur();
  };

  focus = () => {
    this._openPicker();
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
    const { accessibilityLabel, style, testID } = this.props;

    const selectState = this._getSelectState();
    const { selectedOptions, visibleOptions } = selectState;

    const styleProps = {
      style,
    };

    return (
      <Container
        {...styleProps}
        accessibilityLabel={accessibilityLabel}
        onPress={this.focus}
        testID={testID}
      >
        <Control>
          <MultiValueWrapper>
            {this._renderSelectedValue(selectedOptions)}
          </MultiValueWrapper>
          {this._renderDropdownIcon()}
          {this._renderPopup(visibleOptions, selectedOptions)}
        </Control>
      </Container>
    );
  }

  _searchInput: ?React.ElementRef<typeof Text>;

  _addValue = (option: Option) => {
    const selectedOptions = this._getSelectedOptions();
    this._setValue(selectedOptions.concat(option));
  };

  _captureSearchInput = (ref: ?React.ElementRef<typeof Text>) => {
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
    return options.filter(option => {
      if (excludeValues && excludeValues.indexOf(option[valueKey]) > -1)
        return false;
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
    const { clearable, isLoading, multi, readOnly, searchable } = this.props;
    const selectedOptions = this._getSelectedOptions();
    const visibleOptions = this._filterOptions();
    return {
      hasValue: selectedOptions.length > 0,
      isMulti: multi,
      isSingle: !multi,
      isClearable: clearable,
      isDisabled: readOnly,
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
    const { onFocus, readOnly } = this.props;

    if (readOnly) return;

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
        : valueArray.length > 0
          ? valueArray[0]
          : null;
      onValueChange(value);
    }
  };

  _toggleOption = (option: Option) => {
    const { valueKey } = this.props;
    const selectedOptions = this._getSelectedOptions();
    if (selectedOptions.find(op => op[valueKey] === option[valueKey])) {
      this._setValue(
        selectedOptions.filter(op => op[valueKey] !== option[valueKey]),
      );
    } else {
      this._selectOption(option);
    }
  };

  _renderClear = () => {
    const {
      clearable,
      clearAllText,
      clearValueText,
      isLoading,
      multi,
      readOnly,
      value,
    } = this.props;
    if (
      !clearable ||
      value === undefined ||
      value === null ||
      (multi && !value.length) ||
      readOnly ||
      isLoading
    ) {
      return null;
    }

    const label = multi ? clearAllText : clearValueText;

    return (
      <TouchableOpacity onPress={this._clearValue}>
        <PopupText>{label}</PopupText>
      </TouchableOpacity>
    );
  };

  _renderConfirmButton = () => {
    if (!this.props.multi) return null;
    return (
      <TouchableOpacity onPress={this.blur}>
        <OKText>OK</OKText>
      </TouchableOpacity>
    );
  };

  _renderDropdownIcon = () => {
    const { renderDropdownIcon } = this.props;

    return renderDropdownIcon ? (
      renderDropdownIcon()
    ) : (
      <IconTextContainer>
        <IconText>⌄</IconText>
      </IconTextContainer>
    );
  };

  _renderMenu = (options: Array<Option>, selectedOptions: Array<Option>) => {
    const {
      labelKey,
      multi,
      noResultsText,
      onDropdownEndReached,
      onDropdownEndReachedThreshold,
      renderOption,
      valueKey,
    } = this.props;

    let body = null;
    if (options.length > 0) {
      const handleSelect = multi ? this._toggleOption : this._selectOption;
      body = (
        <Menu
          labelKey={labelKey}
          onEndReached={onDropdownEndReached}
          onEndReachedThreshold={onDropdownEndReachedThreshold}
          onItemSelect={handleSelect}
          options={options}
          renderOption={renderOption}
          selectedOptions={selectedOptions}
          valueKey={valueKey}
        />
      );
    } else if (noResultsText) {
      body = (
        <ListEmptyContainer>
          <PopupText>{noResultsText}</PopupText>
        </ListEmptyContainer>
      );
    }
    return <ListContainer>{body}</ListContainer>;
  };

  _renderPopup = (options: Array<Option>, selectedOptions: Array<Option>) => {
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
              <TouchableOpacity onPress={this._onCancel}>
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

  _renderSelectedValue = (selectedOptions: Array<Option>) => {
    const { labelKey, multi, placeholder, valueKey } = this.props;

    if (selectedOptions.length === 0) {
      return <Placeholder>{placeholder}</Placeholder>;
    }
    if (multi) {
      return selectedOptions.map(option => (
        <SelectedOption
          key={`value-${option[valueKey]}`}
          labelKey={labelKey}
          option={option}
          style={{ marginRight: 8 }}
        />
      ));
    }
    const option = selectedOptions[0];
    return <SelectedOption labelKey={labelKey} option={option} />;
  };
}

export default Select;
