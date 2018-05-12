// @flow

import * as React from 'react';
import moment from 'moment';
import type Moment from 'moment';
import PickerWeb from '../../internals/Picker.web';
import Calendar from './Calendar';
import { PlaceholderText, ValueText } from './StyledComponents';

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
  clearValueText: string,
  /**
   * Date format of the displayed value.
   */
  displayFormat: string,
  /**
   * Callback that is called when the input is blurred.
   */
  onBlur?: ?() => void,
  /**
   * Callback that is called when the input is focused.
   */
  onFocus?: ?() => void,
  /**
   * Callback that is called when the input value changes.
   */
  onValueChange?: ?(value: string | null) => void,
  /**
   * The string that will be rendered when there is no value.
   */
  placeholder: string,
  /**
   * If `true`, the input is not editable. The default value is `false`.
   */
  readOnly: boolean,
  /**
   * Function to render the dropdown icon.
   */
  renderDropdownIcon?: ?() => ?React.Element<any>,
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
  /**
   * The value of the date input.
   */
  value?: ?string,
  /**
   * Date format of the input value.
   */
  valueFormat: string,
};

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

class DatePicker extends React.Component<Props> {
  static defaultProps = {
    clearable: true,
    clearValueText: 'Clear value',
    displayFormat: DEFAULT_DATE_FORMAT,
    readOnly: false,
    valueFormat: DEFAULT_DATE_FORMAT,
  };

  static displayName = 'DatePicker';

  props: Props;

  blur() {
    this._picker && this._picker.blur();
  }

  focus() {
    this._picker && this._picker.focus();
  }

  render() {
    const {
      accessibilityLabel,
      autoFocus,
      className,
      clearable,
      clearValueText,
      displayFormat,
      onBlur,
      onFocus,
      onValueChange,
      readOnly,
      renderDropdownIcon,
      style,
      testID,
      value,
      valueFormat,
    } = this.props;

    const styleProps = {
      className,
      style,
    };

    if (value) {
      this._date = moment(value, valueFormat);
      this._dateStr = this._date.format(displayFormat);
    } else {
      this._date = moment();
      this._dateStr = '';
    }

    const props = {
      accessibilityLabel,
      autoFocus,
      clearable,
      clearValueText,
      onBlur,
      onFocus,
      onValueChange,
      readOnly,
      ref: this._capturePickerRef,
      renderDropdownIcon,
      renderPopover: this._renderPopover,
      renderValue: this._renderValue,
      testID,
    };

    return <PickerWeb {...styleProps} {...props} />;
  }

  _date: Moment;
  _dateStr: string;
  _picker: ?React.ElementRef<typeof PickerWeb>;

  _capturePickerRef = (ref: ?React.ElementRef<typeof PickerWeb>) => {
    this._picker = ref;
  };

  _renderPopover = () => {
    return <Calendar initialDate={this._date} onSelect={this._selectDate} />;
  };

  _renderValue = () => {
    const { placeholder } = this.props;

    if (!this._dateStr) {
      return <PlaceholderText>{placeholder}</PlaceholderText>;
    }

    return <ValueText>{this._dateStr}</ValueText>;
  };

  _selectDate = (date: Moment) => {
    const { onValueChange, valueFormat } = this.props;

    this.blur();

    onValueChange && onValueChange(date.format(valueFormat));
  };
}

export default DatePicker;
