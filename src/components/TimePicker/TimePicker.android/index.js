// @flow

import * as React from 'react';
import moment from 'moment';
import type Moment from 'moment';
import { TimePickerAndroid } from 'react-native';
import PickerNative from '../../../internals/Picker.native';
import type { TimePickerProps } from '../types.js.flow';
import {
  DEFAULT_TIME_DISPLAY_FORMAT,
  DEFAULT_TIME_VALUE_FORMAT,
} from '../constants';
import { PlaceholderText, ValueText } from './StyledComponents';

type Props = TimePickerProps;

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
  _time: Moment;
  _timeStr: string;

  _capturePickerRef = (ref: ?React.ElementRef<typeof PickerNative>) => {
    this._picker = ref;
  };

  _openPicker = () => {
    const { onFocus } = this.props;

    onFocus && onFocus();

    TimePickerAndroid.open({
      hour: this._time.hour(),
      minute: this._time.minute(),
    }).then(this._onTimeSelect);
  };

  _onTimeSelect = ({
    action,
    hour,
    minute,
  }: {
    action: string,
    hour: number,
    minute: number,
  }) => {
    if (action !== TimePickerAndroid.dismissedAction) {
      const time = moment({ hour, minute });
      this._selectTime(time);
    } else {
      this.blur();
    }
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
