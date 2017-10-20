// @flow

import * as React from 'react';
import OptionContainer from './OptionContainer';
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
  Menu,
  MenuOuter,
  MultiValueWrapper,
  NoResults,
  Placeholder,
} from './StyledComponents';
import type {
  Option,
  renderOptionType,
  Value,
} from '../types.js.flow';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  autoFocus: ?boolean,
  className?: string,
  clearable: ?boolean,
  clearAllText: string,
  clearValueText: string,
  defaultValue?: Value,
  disabled: ?boolean,
  filterOption?: ?(option: Option, searchText: string) => boolean,
  isLoading: ?boolean,
  labelKey: string,
  menuBuffer: number,
  multi: ?boolean,
  noResultsText: string,
  onBlur?: ?() => void,
  onFocus?: ?() => void,
  onInputChange?: ?(text: string, triggeredByUser: boolean) => void,
  onValueChange?: ?(value: Value) => void,
  options?: ?Array<Option>,
  pageSize: number,
  placeholder: string,
  renderOption?: ?renderOptionType,
  scrollMenuIntoView: boolean,
  searchable: ?boolean,
  style?: any,
  tabIndex?: number,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
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
    disabled: false,
    isLoading: false,
    labelKey: 'label',
    menuBuffer: 0,
    multi: false,
    noResultsText: 'No results found',
    pageSize: 5,
    placeholder: '',
    scrollMenuIntoView: true,
    searchable: true,
    valueKey: 'value',
  };

  static displayName = 'Select';

  props: Props;

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

  componentWillUpdate(nextProps: Props, nextState: State) {
    if (nextState.isOpen !== this.state.isOpen) {
      this._toggleTouchOutsideEvent(nextState.isOpen);
    }
  }

  componentDidUpdate(prevProps: Props) {
    // focus to the selected option
    if (this._menu && this._focused && this.state.isOpen && !this._hasScrolledToOption) {
      const focusedOptionNode = this._focused;
      const menuNode = this._menu;
      menuNode.scrollTop = focusedOptionNode.offsetTop;
      this._hasScrolledToOption = true;
    } else if (!this.state.isOpen) {
      this._hasScrolledToOption = false;
    }

    if (this._scrollToFocusedOptionOnUpdate && this._focused && this._menu) {
      this._scrollToFocusedOptionOnUpdate = false;
      const focusedDOM = this._focused;
      const menuDOM = this._menu;
      const focusedRect = focusedDOM.getBoundingClientRect();
      const menuRect = menuDOM.getBoundingClientRect();
      if (focusedRect.bottom > menuRect.bottom) {
        menuDOM.scrollTop = (focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight);
      } else if (focusedRect.top < menuRect.top) {
        menuDOM.scrollTop = focusedDOM.offsetTop;
      }
    }
    if (this.props.scrollMenuIntoView && this._menuContainer) {
      const menuContainerRect = this._menuContainer.getBoundingClientRect();
      if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
        window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
      }
    }
    if (prevProps.disabled !== this.props.disabled) {
      this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
      this._closeMenu();
    }
  }

  componentWillUnmount() {
    // $FlowFixMe
    document.removeEventListener('touchstart', this._onTouchOutside);
  }

  render() {
    const {
      accessibilityLabel,
      className,
      style,
      testID,
    } = this.props;

    const selectState = this._getSelectState();
    const {
      isOpen,
      selectedOptions,
      visibleOptions,
    } = selectState;
    const focusedOptionIndex = this._getFocusableOptionIndex(selectedOptions[0]);

    const focusedOption = focusedOptionIndex === null ? null : visibleOptions[focusedOptionIndex];
    this._focusedOption = focusedOption;

    return (
      <Container
        {...selectState}
        aria-label={accessibilityLabel}
        className={className}
        data-testid={testID}
        innerRef={(ref) => { this._wrapper = ref; }}
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
          <MultiValueWrapper
            {...selectState}
          >
            {this._renderSelectedValue(selectedOptions)}
            {this._renderInput()}
          </MultiValueWrapper>
          {this._renderLoading()}
          {this._renderClear()}
          {this._renderDropdownIcon()}
        </Control>
        {isOpen
          ? this._renderOuter(
            visibleOptions,
            !this.props.multi ? selectedOptions : null,
            focusedOption,
          )
          : null
        }
      </Container>
    );
  }

  _dragging: ?boolean;
  _focused: ?HTMLElement;
  _focusedOption: ?Option;
  _hasScrolledToOption: ?boolean;
  _input: ?any;
  _menu: ?HTMLDivElement;
  _menuContainer: ?HTMLDivElement;
  _scrollToFocusedOptionOnUpdate: ?boolean;
  _visibleOptions: Array<Option>;
  _wrapper: ?HTMLDivElement;

  _addValue = (option: Option) => {
    const selectedOptions = this._getSelectedOptions();
    const visibleOptions = this._visibleOptions.filter(val => !val.disabled);
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
    this.setState({
      isOpen: false,
      inputValue: '',
    }, this.focus);
  };

  _closeMenu = () => {
    this._handleInputValueChange('', false);
    this.setState(prevState => ({
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
    if (excludeOptions) excludeValues = excludeOptions.map(i => i[valueKey]);
    return options.filter((option) => {
      if (excludeValues && excludeValues.indexOf(option[valueKey]) > -1) return false;
      if (filterOption) return filterOption(option, filterValue);
      if (!filterValue) return true;
      const labelTest = String(option[labelKey]).toLowerCase();
      return labelTest.indexOf(filterValue) >= 0;
    });
  };

  _focusAdjacentOption = (dir: 'next' | 'previous' | 'page_up' | 'page_down' | 'start' | 'end') => {
    const options = this._visibleOptions
      .map((option, index) => ({ option, index }))
      .filter(option => !option.option.disabled);
    this._scrollToFocusedOptionOnUpdate = true;

    if (!this.state.isOpen) {
      const focusedOption = this._focusedOption ||
        (options.length ? options[dir === 'next' ? 0 : options.length - 1].option : null);
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
    const {
      clearable,
      disabled,
      isLoading,
      multi,
      searchable,
    } = this.props;
    const selectedOptions = this._getSelectedOptions();
    const visibleOptions = this._visibleOptions = this._filterOptions(
      multi ? selectedOptions : null,
    );
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
      isDisabled: disabled,
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
    // button, or if the component is disabled, ignore it.
    if (this.props.disabled || (event.type === 'click' && event.button !== 0)) {
      return;
    }

    if (event.target.tagName === 'INPUT') {
      return;
    }

    // prevent default event handlers
    event.stopPropagation();
    event.preventDefault();

    // for the non-searchable select, toggle the menu
    if (!this.props.searchable) {
      // TODO: This code means that if a select is searchable, onClick the options menu will not
      // appear, only on subsequent click will it open.
      this.focus();
      this.setState(prevState => ({
        isOpen: !prevState.isOpen,
      }));
      return;
    }

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
    if (this.props.disabled) return;

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
        this._selectFocusedOption();
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
      default: return;
    }
    event.preventDefault();
  };

  _onControlMouseDown = (event: SyntheticMouseEvent<>) => {
    if (event.target.tagName !== 'INPUT') {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  _onDropdownIconClick = (event: SyntheticMouseEvent<>) => {
    // if the event was triggered by a click and not the primary
    // button, or if the component is disabled, ignore it.
    if (this.props.disabled || (event.type === 'click' && event.button !== 0)) {
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
      (this._menu === document.activeElement || this._menu.contains(document.activeElement))
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
    if (this.props.disabled) return;
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
    // button, or if the component is disabled, ignore it.
    if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
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
    this._setValue(this.props.multi ? selectedOptions.slice(0, selectedOptions.length - 1) : []);
  };

  _removeValue = (option: Option) => {
    const selectedOptions = this._getSelectedOptions();
    this._setValue(selectedOptions.filter(i => i !== option));
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
      this.setState({
        focusedIndex: null,
        inputValue: '',
        isOpen: false,
      }, () => {
        this._addValue(option);
      });
    } else {
      this.setState(prevState => ({
        inputValue: '',
        isOpen: false,
        isPseudoFocused: prevState.isFocused,
      }), () => {
        this._setValue([option]);
      });
    }
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
    return (
      <ArrowZone
        {...this._getSelectState()}
        onClick={this._onDropdownIconClick}
      >
        <Arrow
          isOpen={this.state.isOpen}
        />
      </ArrowZone>
    );
  };

  _renderInput = () => {
    const isOpen = !!this.state.isOpen;

    const {
      disabled,
      searchable,
      tabIndex,
    } = this.props;

    const inputProps = {
      ...this._getSelectState(),
      'aria-expanded': isOpen,
      innerRef: (ref) => { this._input = ref; },
      role: 'combobox',
      tabIndex,
      onBlur: this._onInputBlur,
      onFocus: this._onInputFocus,
    };

    if (disabled || !searchable) {
      return (
        <FakeInput
          {...inputProps}
          aria-readonly={!!disabled}
          tabIndex={tabIndex || 0}
        />
      );
    }

    return (
      <Input
        {...inputProps}
        aria-haspopup={isOpen}
        onChange={this._onInputChange}
        value={this.state.inputValue}
      />
    );
  };

  _renderLabel = ({
    option,
  }: {
    option: Option,
  }) => {
    return this._getOptionLabel(option);
  };

  _renderLoading = () => {
    if (!this.props.isLoading) return null;
    return (
      <LoadingZone aria-hidden="true">
        <Loading />
      </LoadingZone>
    );
  };

  _renderMenu = (
    options: Array<Option>,
    selectedOptions: ?Array<Option>,
    focusedOption: ?Option,
  ) => {
    const { noResultsText, renderOption, valueKey } = this.props;

    if (options.length > 0) {
      return options.map((option, index) => {
        const isSelected = selectedOptions && selectedOptions.indexOf(option) > -1;
        const isFocused = option === focusedOption;

        const render = renderOption || this._renderLabel;
        const optionElement = render({
          index,
          option,
        });

        return (
          <OptionContainer
            innerRef={(ref) => { this._captureOptionRef(ref, isFocused); }}
            isDisabled={option.disabled}
            isFocused={isFocused}
            isSelected={isSelected}
            key={`option-${index}-${option[valueKey]}`}
            onFocus={this._focusOption}
            onSelect={this._selectOption}
            option={option}
            optionIndex={index}
          >
            {optionElement}
          </OptionContainer>
        );
      });
    } else if (noResultsText) {
      return (
        <NoResults>
          {noResultsText}
        </NoResults>
      );
    }
    return null;
  };

  _renderOuter = (
    options: Array<Option>,
    selectedOptions: ?Array<Option>,
    focusedOption: ?Option,
  ) => {
    const menu = this._renderMenu(options, selectedOptions, focusedOption);
    if (!menu) {
      return null;
    }

    return (
      <MenuOuter
        innerRef={(ref) => { this._menuContainer = ref; }}
      >
        <Menu
          innerRef={(ref) => { this._menu = ref; }}
          onMouseDown={this._onMenuMouseDown}
          role="listbox"
          tabIndex={-1}
        >
          {menu}
        </Menu>
      </MenuOuter>
    );
  };

  _renderSelectedValue = (
    selectedOptions: Array<Option>,
  ) => {
    const { labelKey, multi, placeholder, valueKey } = this.props;

    if (selectedOptions.length === 0) {
      return !this.state.inputValue && (
        <Placeholder>{placeholder}</Placeholder>
      );
    }
    if (multi) {
      return selectedOptions.map(option => (
        <SelectedOption
          {...this._getSelectState()}
          key={`value-${option[valueKey]}`}
          labelKey={labelKey}
          onRemove={this._removeValue}
          option={option}
        />
      ));
    } else if (!this.state.inputValue) {
      const option = selectedOptions[0];
      return (
        <SelectedOption
          {...this._getSelectState()}
          labelKey={labelKey}
          option={option}
        />
      );
    }
    return null;
  };
}

export default Select;
