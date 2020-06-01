// @flow

import moment from 'moment';
import type Moment from 'moment';
import * as React from 'react';

import PickerWeb from '../../../internals/Picker.web';
import {
  DEFAULT_TIME_DISPLAY_FORMAT,
  DEFAULT_TIME_VALUE_FORMAT,
} from '../constants';
import type { TimePickerProps } from '../types.js.flow';
import { PlaceholderText, ValueText } from './StyledComponents';
import WheelPicker from './WheelPicker';

type Props = TimePickerProps & {
  // Will be removed
  className?: string,
};

class TimePicker extends React.Component<Props> {
  static defaultProps = {
    clearable: true,
    clearValueText: 'Clear value',
    displayFormat: DEFAULT_TIME_DISPLAY_FORMAT,
    readOnly: false,
    valueFormat: DEFAULT_TIME_VALUE_FORMAT,
    displayRight: undefined,
  };

  static displayName = 'TimePicker';

  blur() {
    const picker = this._picker;
    picker && setTimeout(() => picker.blur(), 10);
    // the timeout is to counter some focus event that occurs after setting the value
    // not an elegant fix, will need to fix this properly, Hernus
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
      displayRight,
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
    return (
      <WheelPicker
        displayRight={this.props.displayRight}
        initialTime={this._time}
        onSelect={this._selectTime}
      />
    );
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
