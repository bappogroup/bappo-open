// @flow

import * as React from 'react';
import moment from 'moment';
import type Moment from 'moment';
import { DatePickerAndroid } from 'react-native';
import PickerNative from '../../../internals/Picker.native';
import type { DatePickerProps } from '../types.js.flow';
import {
  DEFAULT_DATE_DISPLAY_FORMAT,
  DEFAULT_DATE_VALUE_FORMAT,
} from '../constants';
import { PlaceholderText, ValueText } from '../StyledComponents';

type Props = DatePickerProps;

class DatePicker extends React.Component<Props> {
  static defaultProps = {
    clearable: true,
    clearValueText: 'Clear value',
    displayFormat: DEFAULT_DATE_DISPLAY_FORMAT,
    readOnly: false,
    valueFormat: DEFAULT_DATE_VALUE_FORMAT,
  };

  static displayName = 'DatePicker';

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
      clearable,
      clearValueText,
      displayFormat,
      onBlur,
      readOnly,
      renderDropdownIcon,
      style,
      testID,
      value,
      valueFormat,
    } = this.props;

    const styleProps = {
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
      onFocus: this._openPicker,
      readOnly,
      ref: this._capturePickerRef,
      renderDropdownIcon,
      renderValue: this._renderValue,
      testID,
    };

    return <PickerNative {...styleProps} {...props} />;
  }

  _picker: ?React.ElementRef<typeof PickerNative>;
  _date: Moment;
  _dateStr: string;

  _capturePickerRef = (ref: ?React.ElementRef<typeof PickerNative>) => {
    this._picker = ref;
  };

  _openPicker = () => {
    const { onFocus } = this.props;

    onFocus && onFocus();

    DatePickerAndroid.open({
      year: this._date.year(),
      month: this._date.month(),
      day: this._date.day(),
    }).then(this._onDateSelect);
  };

  _onDateSelect = ({
    action,
    year,
    month,
    day,
  }: {
    action: string,
    year: number,
    month: number,
    day: number,
  }) => {
    if (action !== DatePickerAndroid.dismissedAction) {
      const date = moment({ year, month, day });
      this._selectDate(date);
    } else {
      this.blur();
    }
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
