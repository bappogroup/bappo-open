import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React from 'react';

import PickerNative from '../../../internals/Picker.native';
import {
  DEFAULT_TIME_DISPLAY_FORMAT,
  DEFAULT_TIME_VALUE_FORMAT,
} from '../constants';
import { PlaceholderText, ValueText } from '../StyledComponents';
import { TimePickerProps } from '../types';

function TimePicker({
  clearable = true,
  clearValueText = 'Clear value',
  displayFormat = DEFAULT_TIME_DISPLAY_FORMAT,
  readOnly = false,
  valueFormat = DEFAULT_TIME_VALUE_FORMAT,
  accessibilityLabel,
  autoFocus,
  onBlur,
  onFocus,
  onValueChange,
  renderDropdownIcon,
  style,
  testID,
  value,
  placeholder,
}: TimePickerProps) {
  const [showPicker, setShowPicker] = React.useState(false);
  const pickerRef = React.useRef<any>();

  const styleProps = {
    style,
  };

  let _time: moment.Moment;
  let _timeStr: string = '';

  if (value) {
    _time = moment(value, valueFormat);
    _timeStr = _time.format(displayFormat);
  } else {
    _time = moment();
    _timeStr = '';
  }

  function renderValue() {
    if (!_timeStr) {
      return <PlaceholderText>{placeholder}</PlaceholderText>;
    }

    return <ValueText>{_timeStr}</ValueText>;
  }

  function blur() {
    pickerRef.current && pickerRef.current.blur();
  }

  function focus() {
    pickerRef.current && pickerRef.current.focus();
  }

  const props = {
    accessibilityLabel,
    autoFocus,
    clearable,
    clearValueText,
    onBlur: () => {
      setShowPicker(false);
      onBlur && onBlur();
    },
    onFocus: () => {
      setShowPicker(true);
      onFocus && onFocus();
    },
    readOnly,
    ref: pickerRef,
    renderDropdownIcon,
    renderValue,
    testID,
  };

  return (
    <React.Fragment>
      <PickerNative {...styleProps} {...props} />
      {showPicker && <DateTimePicker mode="time" value={_time.toDate()} onChange={(event, newTime) => {
        blur();

        if (newTime && onValueChange) {
          onValueChange(moment(newTime).format(valueFormat));
        }
      }}/>}
    </React.Fragment>
  );
}

export default TimePicker;
