// @flow
import * as React from 'react';

import FlatList from '../../../primitives/FlatList';
import type { Option, Value, renderOptionType } from '../types.js.flow';
import Menu from './Menu';
import SelectedOption from './SelectedOption';
import {
  Arrow,
  ArrowZone,
  Clear,
  ClearZone,
  Container,
  Control,
  FakeInput,
  Input,
  Loading,
  LoadingZone,
  MenuInner,
  MenuOuter,
  MultiValueWrapper,
  NoResults,
  Placeholder,
  ValueWrapper,
} from './StyledComponents';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  /**
   * If `true`, focuses the input on `componentDidMount`. The default value is `false`.
   */
  autoFocus: ?boolean,
  className?: string,
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
  menuBuffer: number,
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
  pageSize: number,
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
  scrollMenuIntoView: boolean,
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
  focusedIndex?: ?number,
  focusedOption?: ?Option,
  inputValue: string,
  isFocused: boolean,
  isOpen: boolean,
  isPseudoFocused: boolean,
};

class Select extends React.Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
    clearable: true,
    clearAllText: 'Clear all',
    clearValueText: 'Clear value',
    isLoading: false,
    labelKey: 'label',
    menuBuffer: 0,
    multi: false,
    noResultsText: 'No results found',
    pageSize: 5,
    placeholder: '',
    readOnly: false,
    scrollMenuIntoView: true,
    searchable: true,
    valueKey: 'value',
  };

  static displayName = 'Select';

  blur = () => {
    this._input && this._input.blur();
  };

  focus = () => {
    this._input && this._input.focus();
  };

  state: State = {
    inputValue: '',
    isFocused: false,
    isOpen: false,
    isPseudoFocused: false,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  UNSAFE_componentWillUpdate(nextProps: Props, nextState: State) {
    if (nextState.isOpen !== this.state.isOpen) {
      this._toggleTouchOutsideEvent(nextState.isOpen);
    }
  }

  componentDidUpdate(prevProps: Props) {
    // focus to the selected option
    if (
      this._list &&
      this._focusedOptionIndex != null &&
      this.state.isOpen &&
      !this._hasScrolledToOption
    ) {
      this._list.scrollToIndex({
        index: this._focusedOptionIndex,
      });
      this._hasScrolledToOption = true;
    } else if (!this.state.isOpen) {
      this._hasScrolledToOption = false;
    }

    if (this.props.scrollMenuIntoView && this._menuContainer) {
      const menuContainerRect = this._menuContainer.getBoundingClientRect();
      if (
        window.innerHeight <
        menuContainerRect.bottom + this.props.menuBuffer
      ) {
        window.scrollBy(
          0,
          menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight,
        );
      }
    }
    if (prevProps.readOnly !== this.props.readOnly) {
      this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
      this._closeMenu();
    }
  }

  componentWillUnmount() {
    // $FlowFixMe
    document.removeEventListener('touchstart', this._onTouchOutside);
  }

  render() {
    const { accessibilityLabel, className, style, testID, multi } = this.props;

    const selectState = this._getSelectState();
    const { isOpen, selectedOptions, visibleOptions } = selectState;
    this._focusedOptionIndex = this._getFocusableOptionIndex(
      selectedOptions[0],
    );

    const focusedOption =
      this._focusedOptionIndex === null
        ? null
        : visibleOptions[this._focusedOptionIndex];
    this._focusedOption = focusedOption;

    return (
      <Container
        {...selectState}
        aria-label={accessibilityLabel}
        className={className}
        data-testid={testID}
        ref={(ref) => {
          this._wrapper = ref;
        }}
        style={style}
      >
        <Control
          {...selectState}
          onClick={this._onControlClick}
          onKeyDown={this._onControlKeyDown}
          onMouseDown={this._onControlMouseDown}
          onTouchEnd={this._onTouchEnd}
          onTouchStart={this._onTouchStart}
          onTouchMove={this._onTouchMove}
        >
          {multi
            ? this._renderMultiSelectedValues(selectedOptions)
            : this._renderSingleSelectedValues(selectedOptions)}

          {this._renderLoading()}
          {this._renderClear()}
          {this._renderDropdownIcon()}
        </Control>
        {isOpen
          ? this._renderOuter(visibleOptions, selectedOptions, focusedOption)
          : null}
      </Container>
    );
  }

  _dragging: ?boolean;
  _focused: ?HTMLElement;
  _focusedOption: ?Option;
  _focusedOptionIndex: ?number;
  _hasScrolledToOption: ?boolean;
  _input: ?any;
  _list: ?React.ElementRef<typeof FlatList>;
  _menu: ?HTMLDivElement;
  _menuContainer: ?HTMLDivElement;
  _scrollToFocusedOptionOnUpdate: ?boolean;
  _visibleOptions: Array<Option>;
  _wrapper: ?HTMLDivElement;

  _addValue = (option: Option) => {
    const selectedOptions = this._getSelectedOptions();
    const visibleOptions = this._visibleOptions.filter((val) => !val.disabled);
    const lastValueIndex = visibleOptions.indexOf(option);
    this._setValue(selectedOptions.concat(option));
    if (visibleOptions.length - 1 === lastValueIndex) {
      // the last option was selected; focus the second-last one
      this._focusOption(visibleOptions[lastValueIndex - 1]);
    } else if (visibleOptions.length > lastValueIndex) {
      // focus the option below the selected one
      this._focusOption(visibleOptions[lastValueIndex + 1]);
    }
  };

  _captureOptionRef = (ref: ?HTMLElement, isFocused?: ?boolean) => {
    if (isFocused) {
      this._focused = ref;
    }
  };

  _clearValue = () => {
    this._setValue([]);
    this._handleInputValueChange('', true);
    this.setState(
      {
        isOpen: false,
        inputValue: '',
      },
      this.focus,
    );
  };

  _closeMenu = () => {
    this._handleInputValueChange('', false);
    this.setState((prevState) => ({
      isOpen: false,
      isPseudoFocused: prevState.isFocused && !this.props.multi,
      inputValue: '',
    }));
    this._hasScrolledToOption = false;
  };

  _filterOptions = (excludeOptions: ?Array<Option>): Array<Option> => {
    const { filterOption, labelKey, valueKey } = this.props;
    const filterValue = this.state.inputValue.toLowerCase();
    const options = this.props.options || [];
    let excludeValues;
    if (excludeOptions) excludeValues = excludeOptions.map((i) => i[valueKey]);
    return options.filter((option) => {
      if (excludeValues && excludeValues.indexOf(option[valueKey]) > -1)
        return false;
      if (filterOption) return filterOption(option, filterValue);
      if (!filterValue) return true;
      const labelTest = String(option[labelKey]).toLowerCase();
      return labelTest.indexOf(filterValue) >= 0;
    });
  };

  _focusAdjacentOption = (
    dir: 'next' | 'previous' | 'page_up' | 'page_down' | 'start' | 'end',
  ) => {
    const options = this._visibleOptions
      .map((option, index) => ({ option, index }))
      .filter((option) => !option.option.disabled);
    this._scrollToFocusedOptionOnUpdate = true;

    if (!this.state.isOpen) {
      const focusedOption =
        this._focusedOption ||
        (options.length
          ? options[dir === 'next' ? 0 : options.length - 1].option
          : null);
      this.setState({
        isOpen: true,
        inputValue: '',
        focusedOption,
      });
      return;
    }

    if (!options.length) return;

    let focusedIndex = -1;
    for (let i = 0; i < options.length; i++) {
      if (this._focusedOption === options[i].option) {
        focusedIndex = i;
        break;
      }
    }
    if (dir === 'next' && focusedIndex !== -1) {
      focusedIndex = (focusedIndex + 1) % options.length;
    } else if (dir === 'previous') {
      if (focusedIndex > 0) {
        focusedIndex -= 1;
      } else {
        focusedIndex = options.length - 1;
      }
    } else if (dir === 'start') {
      focusedIndex = 0;
    } else if (dir === 'end') {
      focusedIndex = options.length - 1;
    } else if (dir === 'page_up') {
      const potentialIndex = focusedIndex - this.props.pageSize;
      if (potentialIndex < 0) {
        focusedIndex = 0;
      } else {
        focusedIndex = potentialIndex;
      }
    } else if (dir === 'page_down') {
      const potentialIndex = focusedIndex + this.props.pageSize;
      if (potentialIndex > options.length - 1) {
        focusedIndex = options.length - 1;
      } else {
        focusedIndex = potentialIndex;
      }
    }

    if (focusedIndex === -1) {
      focusedIndex = 0;
    }

    this.setState({
      focusedIndex: options[focusedIndex].index,
      focusedOption: options[focusedIndex].option,
    });
  };

  _focusEndOption = () => {
    this._focusAdjacentOption('end');
  };

  _focusNextOption = () => {
    this._focusAdjacentOption('next');
  };

  _focusOption = (option: ?Option) => {
    this.setState({
      focusedOption: option,
    });
  };

  _focusPageDownOption = () => {
    this._focusAdjacentOption('page_down');
  };

  _focusPageUpOption = () => {
    this._focusAdjacentOption('page_up');
  };

  _focusPreviousOption = () => {
    this._focusAdjacentOption('previous');
  };

  _focusStartOption = () => {
    this._focusAdjacentOption('start');
  };

  _getFocusableOptionIndex = (selectedOption?: ?Option): number | null => {
    const options = this._visibleOptions;
    if (!options.length) return null;

    const valueKey = this.props.valueKey;
    const focusedOption = this.state.focusedOption || selectedOption;
    if (focusedOption && !focusedOption.disabled) {
      let focusedOptionIndex = -1;
      options.some((option, index) => {
        const isOptionEqual = option[valueKey] === focusedOption[valueKey];
        if (isOptionEqual) {
          focusedOptionIndex = index;
        }
        return isOptionEqual;
      });
      if (focusedOptionIndex !== -1) {
        return focusedOptionIndex;
      }
    }

    for (let i = 0; i < options.length; i++) {
      if (!options[i].disabled) return i;
    }
    return null;
  };

  _getOptionFromValue = (value: ?Value): ?Option => {
    const valueType = typeof value;
    if (valueType !== 'string' && valueType !== 'number') return null;

    const { options, valueKey } = this.props;
    if (!options) return null;

    for (let i = 0; i < options.length; i++) {
      if (options[i][valueKey] === value) return options[i];
    }
    return null;
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
    const visibleOptions = (this._visibleOptions = this._filterOptions());
    let isOpen = this.state.isOpen;
    if (
      multi &&
      !visibleOptions.length &&
      selectedOptions.length &&
      !this.state.inputValue
    ) {
      isOpen = false;
    }
    return {
      hasValue: selectedOptions.length > 0,
      isMulti: multi,
      isSingle: !multi,
      isClearable: clearable,
      isDisabled: readOnly,
      isFocused: this.state.isFocused,
      isLoading,
      isOpen,
      isPseudoFocused: this.state.isPseudoFocused,
      isSearchable: searchable,
      selectedOptions,
      visibleOptions,
    };
  };

  _handleInputValueChange = (newValue: string, triggeredByUser: boolean) => {
    const { onInputChange } = this.props;
    onInputChange && onInputChange(newValue, triggeredByUser);
  };

  _onClearButtonClick = (event: SyntheticEvent<>) => {
    event.stopPropagation();
    event.preventDefault();
    this._clearValue();
  };

  _onControlClick = (event: SyntheticEvent<>) => {
    // if the event was triggered by a click and not the primary
    // button, or if the component is read-only, ignore it.
    // $FlowFixMe
    if (this.props.readOnly || (event.type === 'click' && event.button !== 0)) {
      return;
    }

    // $FlowFixMe
    if (event.target.tagName === 'INPUT') {
      return;
    }

    // prevent default event handlers
    event.stopPropagation();
    event.preventDefault();

    if (this.state.isFocused) {
      // On iOS, we can get into a state where we think the input is focused but it isn't really,
      // since iOS ignores programmatic calls to input.focus() that weren't triggered by a click
      // event.
      // Call focus() again here to be safe.
      this.focus();

      let input = this._input;

      // clears the value so that the cursor will be at the end of input when the component
      // re-renders
      if (input) {
        if (typeof input.getInput === 'function') {
          // Get the actual DOM input if the ref is an <TextInputAutoSize /> component
          input = input.getInput();
        }
        input.value = '';
      }

      // if the input is focused, ensure the menu is open
      this.setState({
        isOpen: true,
        isPseudoFocused: false,
      });
    } else {
      // otherwise, focus the input and open the menu
      this.focus();
    }
  };

  _onControlKeyDown = (event: SyntheticKeyboardEvent<>) => {
    if (this.props.readOnly) return;

    switch (event.keyCode) {
      case 8: // backspace
        if (!this.state.inputValue) {
          event.preventDefault();
          this._popValue();
        }
        return;
      case 13: // enter
        if (!this.state.isOpen) return;
        event.stopPropagation();
        if (this.props.multi) {
          this._toggleFocusedOption();
        } else {
          this._selectFocusedOption();
        }
        break;
      case 27: // escape
        if (this.state.isOpen) {
          this._closeMenu();
          event.stopPropagation();
        }
        break;
      case 38: // up
        this._focusPreviousOption();
        break;
      case 40: // down
        this._focusNextOption();
        break;
      case 33: // page up
        this._focusPageUpOption();
        break;
      case 34: // page down
        this._focusPageDownOption();
        break;
      case 35: // end key
        if (event.shiftKey) {
          return;
        }
        this._focusEndOption();
        break;
      case 36: // home key
        if (event.shiftKey) {
          return;
        }
        this._focusStartOption();
        break;
      case 46: // delete
        if (!this.state.inputValue) {
          event.preventDefault();
          this._popValue();
        }
        return;
      default:
        return;
    }
    event.preventDefault();
  };

  _onControlMouseDown = (event: SyntheticMouseEvent<>) => {
    // $FlowFixMe
    if (event.target.tagName !== 'INPUT') {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  _onDropdownIconClick = (event: SyntheticMouseEvent<>) => {
    // if the event was triggered by a click and not the primary
    // button, or if the component is read-only, ignore it.
    if (this.props.readOnly || (event.type === 'click' && event.button !== 0)) {
      return;
    }
    // If the menu isn't open, let the event bubble to the main handleClick
    if (!this.state.isOpen) {
      return;
    }
    // prevent default event handlers
    event.stopPropagation();
    event.preventDefault();
    // close the menu
    this._closeMenu();
  };

  _onInputBlur = () => {
    // The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from
    // closing the menu in certain contexts.
    if (
      this._menu &&
      (this._menu === document.activeElement ||
        this._menu.contains(document.activeElement))
    ) {
      this.focus();
      return;
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
    const onBlurredState = {
      isFocused: false,
      isOpen: false,
      isPseudoFocused: false,
    };
    this.setState(onBlurredState);
  };

  _onInputChange = (event: SyntheticInputEvent<>) => {
    const newInputValue = event.target.value;

    if (this.state.inputValue !== newInputValue) {
      this._handleInputValueChange(newInputValue, true);
    }

    this.setState({
      isOpen: true,
      isPseudoFocused: false,
      inputValue: newInputValue,
    });
  };

  _onInputFocus = () => {
    if (this.props.readOnly) return;
    if (this.props.onFocus) {
      this.props.onFocus();
    }
    this.setState({
      isFocused: true,
      isOpen: true,
    });
  };

  _onMenuMouseDown = (event: SyntheticMouseEvent<>) => {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is read-only, ignore it.
    if (
      this.props.readOnly ||
      (event.type === 'mousedown' && event.button !== 0)
    ) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();

    this.focus();
  };

  _onTouchEnd = (event: SyntheticTouchEvent<>) => {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this._dragging) return;

    // Fire the mouse events
    this._onControlClick(event);
  };

  _onTouchEndClearValue = (event: SyntheticTouchEvent<>) => {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this._dragging) return;

    // Clear the value
    this._onClearButtonClick(event);
  };

  _onTouchMove = () => {
    // Set a flag that the view is being dragged
    this._dragging = true;
  };

  _onTouchOutside = (event: SyntheticTouchEvent<>) => {
    if (!(event.target instanceof Node)) return;

    // handle touch outside on ios to dismiss menu
    if (this._wrapper && !this._wrapper.contains(event.target)) {
      this._closeMenu();
    }
  };

  _onTouchStart = () => {
    // Set a flag that the view is not being dragged
    this._dragging = false;
  };

  _popValue = () => {
    const selectedOptions = this._getSelectedOptions();
    if (!selectedOptions.length) return;
    this._setValue(
      this.props.multi
        ? selectedOptions.slice(0, selectedOptions.length - 1)
        : [],
    );
  };

  _removeValue = (option: Option) => {
    const selectedOptions = this._getSelectedOptions();
    this._setValue(selectedOptions.filter((i) => i !== option));
    this.focus();
  };

  _selectFocusedOption = () => {
    if (this._focusedOption) {
      this._selectOption(this._focusedOption);
    }
  };

  _selectOption = (option: Option) => {
    // NOTE: we actually add/set the value in a callback to make sure the
    // input value is empty to avoid styling issues in Chrome
    this._hasScrolledToOption = false;

    this._handleInputValueChange('', false);
    if (this.props.multi) {
      this.setState(
        {
          focusedIndex: null,
          inputValue: '',
        },
        () => {
          this._addValue(option);
        },
      );
    } else {
      this.setState(
        (prevState) => ({
          inputValue: '',
          isPseudoFocused: prevState.isFocused,
        }),
        () => {
          this._setValue([option]);
        },
      );
    }
  };

  _setValue = (options: Array<Option>) => {
    const { multi, onValueChange, valueKey } = this.props;
    if (!multi) {
      this.blur();
    }
    if (onValueChange) {
      const valueArray = options.map((option) => option[valueKey]);
      const value = multi
        ? valueArray
        : valueArray.length > 0
        ? valueArray[0]
        : null;
      onValueChange(value);
    }
  };

  _toggleFocusedOption = () => {
    if (this._focusedOption) {
      this._toggleOption(this._focusedOption);
    }
  };

  _toggleOption = (option: Option) => {
    const { valueKey } = this.props;
    const selectedOptions = this._getSelectedOptions();
    if (selectedOptions.find((op) => op[valueKey] === option[valueKey])) {
      this._setValue(
        selectedOptions.filter((op) => op[valueKey] !== option[valueKey]),
      );
    } else {
      this._selectOption(option);
    }
  };

  _toggleTouchOutsideEvent = (enabled: boolean) => {
    if (enabled) {
      // $FlowFixMe
      document.addEventListener('touchstart', this._onTouchOutside);
    } else {
      // $FlowFixMe
      document.removeEventListener('touchstart', this._onTouchOutside);
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
      <ClearZone
        aria-label={label}
        onClick={this._onClearButtonClick}
        onTouchStart={this._onTouchStart}
        onTouchMove={this._onTouchMove}
        onTouchEnd={this._onTouchEndClearValue}
        title={label}
      >
        <Clear>&times;</Clear>
      </ClearZone>
    );
  };

  _renderDropdownIcon = () => {
    const { renderDropdownIcon } = this.props;

    return (
      <ArrowZone
        {...this._getSelectState()}
        onClick={this._onDropdownIconClick}
      >
        {renderDropdownIcon ? (
          renderDropdownIcon()
        ) : (
          <Arrow $isOpen={this.state.isOpen} />
        )}
      </ArrowZone>
    );
  };

  _renderInput = () => {
    const isOpen = !!this.state.isOpen;

    const { readOnly, searchable } = this.props;

    const inputProps = {
      ...this._getSelectState(),
      'aria-expanded': isOpen,
      ref: (ref) => {
        this._input = ref;
      },
      role: 'combobox',
      onBlur: this._onInputBlur,
      onFocus: this._onInputFocus,
    };

    if (readOnly || !searchable) {
      return (
        <FakeInput {...inputProps} aria-readonly={!!readOnly} tabIndex={0} />
      );
    }

    const value = this.state.isFocused ? this.state.inputValue : '';
    return (
      <Input
        {...inputProps}
        aria-haspopup={isOpen}
        onChange={this._onInputChange}
        value={value}
      />
    );
  };

  _renderLoading = () => {
    if (!this.props.isLoading) return null;
    return (
      <LoadingZone aria-hidden="true" data-testid="select-spinner">
        <Loading />
      </LoadingZone>
    );
  };

  _renderMenu = (
    options: Array<Option>,
    selectedOptions: Array<Option>,
    focusedOption: ?Option,
  ) => {
    const {
      labelKey,
      multi,
      noResultsText,
      onDropdownEndReached,
      onDropdownEndReachedThreshold,
      renderOption,
      valueKey,
    } = this.props;

    if (options.length > 0) {
      const handleSelect = multi ? this._toggleOption : this._selectOption;
      return (
        <Menu
          focusedOption={focusedOption}
          focusedOptionRef={this._captureOptionRef}
          labelKey={labelKey}
          listRef={(ref) => {
            this._list = ref;
          }}
          onEndReached={onDropdownEndReached}
          onEndReachedThreshold={onDropdownEndReachedThreshold}
          onItemFocus={this._focusOption}
          onItemSelect={handleSelect}
          options={options}
          renderOption={renderOption}
          selectedOptions={selectedOptions}
          valueKey={valueKey}
        />
      );
    } else if (noResultsText) {
      return <NoResults>{noResultsText}</NoResults>;
    }
    return null;
  };

  _renderOuter = (
    options: Array<Option>,
    selectedOptions: Array<Option>,
    focusedOption: ?Option,
  ) => {
    const menu = this._renderMenu(options, selectedOptions, focusedOption);
    if (!menu) {
      return null;
    }

    return (
      <MenuOuter
        ref={(ref) => {
          this._menuContainer = ref;
        }}
      >
        <MenuInner
          ref={(ref) => {
            this._menu = ref;
          }}
          onMouseDown={this._onMenuMouseDown}
          role="listbox"
          tabIndex={-1}
        >
          {menu}
        </MenuInner>
      </MenuOuter>
    );
  };

  _renderSelectedValue = (selectedOptions: Array<Option>) => {
    const { labelKey, multi, placeholder, valueKey } = this.props;
    const selectState = this._getSelectState();

    if (selectedOptions.length === 0 && !selectState.isOpen) {
      return !this.state.inputValue && <Placeholder>{placeholder}</Placeholder>;
    }
    if (multi) {
      return selectedOptions.map((option) => (
        <SelectedOption
          {...selectState}
          key={`value-${option[valueKey]}`}
          labelKey={labelKey}
          onRemove={this._removeValue}
          option={option}
        />
      ));
    } else if (!this.state.inputValue) {
      const option = selectedOptions[0];
      if (!option) return null;

      return (
        <SelectedOption {...selectState} labelKey={labelKey} option={option} />
      );
    }
    return null;
  };

  _renderSingleSelectedValues = (selectedOptions: Array<Option>) => {
    return (
      <ValueWrapper>
        {this._renderSelectedValue(selectedOptions)}
        {this._renderInput()}
      </ValueWrapper>
    );
  };

  _renderMultiSelectedValues = (selectedOptions: Array<Option>) => {
    return (
      <MultiValueWrapper>
        {this._renderSelectedValue(selectedOptions)}
        {this._renderInput()}
      </MultiValueWrapper>
    );
  };
}

export default Select;
