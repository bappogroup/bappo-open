// @flow

import * as React from 'react';
import moment from 'moment';
import type Moment from 'moment';
import PickerWeb from '../../../internals/Picker.web';
import {
  DEFAULT_TIME_DISPLAY_FORMAT,
  DEFAULT_TIME_VALUE_FORMAT,
} from '../constants';
import WheelPicker from './WheelPicker';
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
   * The value of the time input.
   */
  value?: ?string,
  /**
   * Date format of the input value.
   */
  valueFormat: string,
};

class TimePicker extends React.Component<Props> {
  static defaultProps = {
    clearable: true,
    clearValueText: 'Clear value',
    displayFormat: DEFAULT_TIME_DISPLAY_FORMAT,
    readOnly: false,
    valueFormat: DEFAULT_TIME_VALUE_FORMAT,
  };

  static displayName = 'TimePicker';

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
      this._time = moment(value, valueFormat);
      this._timeStr = this._time.format(displayFormat);
    } else {
      this._time = moment();
      this._timeStr = '';
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

  _picker: ?React.ElementRef<typeof PickerWeb>;
  _time: Moment;
  _timeStr: string;

  _capturePickerRef = (ref: ?React.ElementRef<typeof PickerWeb>) => {
    this._picker = ref;
  };

  _renderPopover = () => {
    return <WheelPicker initialTime={this._time} onSelect={this._selectTime} />;
  };

  _renderValue = () => {
    const { placeholder } = this.props;

    if (!this._timeStr) {
      return <PlaceholderText>{placeholder}</PlaceholderText>;
    }

    return <ValueText>{this._timeStr}</ValueText>;
  };

  _selectTime = (time: Moment) => {
    const { onValueChange, valueFormat } = this.props;

    this.blur();

    onValueChange && onValueChange(time.format(valueFormat));
  };
}

export default TimePicker;
