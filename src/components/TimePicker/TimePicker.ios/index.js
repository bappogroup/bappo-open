// @flow

import * as React from 'react';
import moment from 'moment';
import { DatePickerIOS } from 'react-native';
import PickerNative from '../../../internals/Picker.native';
import type { TimePickerProps } from '../types.js.flow';
import {
  DEFAULT_TIME_DISPLAY_FORMAT,
  DEFAULT_TIME_VALUE_FORMAT,
} from '../constants';
import { PlaceholderText, ValueText } from './StyledComponents';

type Props = TimePickerProps;

type State = {
  selectedTime: Date | null,
};

const getDefaultTime = (): Date =>
  moment()
    .startOf('minute')
    .toDate();

class TimePicker extends React.Component<Props, State> {
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

  constructor(props: Props) {
    super(props);

    const { value, valueFormat } = this.props;

    let initialTime = moment(value || '', valueFormat);
    if (!initialTime.isValid()) {
      initialTime = moment();
    }

    this.state = {
      selectedTime: initialTime.toDate(),
    };
  }

  render() {
    const {
      accessibilityLabel,
      autoFocus,
      clearable,
      clearValueText,
      onBlur,
      onFocus,
      readOnly,
      renderDropdownIcon,
      style,
      testID,
    } = this.props;

    const styleProps = {
      style,
    };

    const props = {
      accessibilityLabel,
      autoFocus,
      clearable,
      clearValueText,
      onBlur,
      onClear: () => this._selectTime(null),
      onConfirm: () =>
        this._selectTime(this.state.selectedTime || getDefaultTime()),
      onFocus,
      readOnly,
      ref: this._capturePickerRef,
      renderDropdownIcon,
      renderPopup: this._renderPopup,
      renderValue: this._renderValue,
      testID,
    };

    return <PickerNative {...styleProps} {...props} />;
  }

  _picker: ?React.ElementRef<typeof PickerNative>;

  _capturePickerRef = (ref: ?React.ElementRef<typeof PickerNative>) => {
    this._picker = ref;
  };

  _onTimeChange = (time: Date) => {
    this.setState({ selectedTime: time });
  };

  _renderPopup = () => {
    return (
      <DatePickerIOS
        date={this.state.selectedTime || getDefaultTime()}
        mode="time"
        onDateChange={this._onTimeChange}
      />
    );
  };

  _renderValue = () => {
    const { displayFormat, placeholder, value, valueFormat } = this.props;

    const time = moment(value || '', valueFormat);
    const timeStr = time.isValid() ? time.format(displayFormat) : '';

    if (!timeStr) {
      return <PlaceholderText>{placeholder}</PlaceholderText>;
    }

    return <ValueText>{timeStr}</ValueText>;
  };

  _selectTime = (time: Date | null) => {
    const { onValueChange, valueFormat } = this.props;

    this.blur();

    this.setState({
      selectedTime: time,
    });

    if (onValueChange) {
      const timeMoment = moment(time);
      if (timeMoment.isValid()) {
        onValueChange(timeMoment.format(valueFormat));
      } else {
        onValueChange(null);
      }
    }
  };
}

export default TimePicker;
