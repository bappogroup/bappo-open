// @flow

import moment from 'moment';
import type Moment from 'moment';
import * as React from 'react';

import PickerWeb from '../../../internals/Picker.web';
import type { DatePickerProps } from '../types.js.flow';
import Calendar from './Calendar';
import { PlaceholderText, ValueText } from './StyledComponents';

type Props = DatePickerProps & {
  // Will be removed
  className?: string,
};

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

class DatePicker extends React.Component<Props> {
  static defaultProps = {
    clearable: true,
    clearValueText: 'Clear value',
    displayFormat: DEFAULT_DATE_FORMAT,
    readOnly: false,
    valueFormat: DEFAULT_DATE_FORMAT,
    alignRight: undefined,
    textColor: undefined,
  };

  static displayName = 'DatePicker';

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
      modal,
      onBlur,
      onFocus,
      onValueChange,
      readOnly,
      renderDropdownIcon,
      style,
      testID,
      value,
      valueFormat,
      alignRight,
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
      modal,
      onBlur,
      onFocus,
      onValueChange,
      readOnly,
      ref: this._capturePickerRef,
      renderDropdownIcon,
      renderPopover: this._renderPopover,
      renderValue: this._renderValue,
      testID,
      alignRight,
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
    return (
      <Calendar
        alignRight={this.props.alignRight}
        initialDate={this._date}
        onSelect={this._selectDate}
      />
    );
  };

  _renderValue = () => {
    const { placeholder } = this.props;

    if (!this._dateStr) {
      return <PlaceholderText>{placeholder}</PlaceholderText>;
    }

    return (
      <ValueText $textColor={this.props.textColor}>{this._dateStr}</ValueText>
    );
  };

  _selectDate = (date: Moment) => {
    const { onValueChange, valueFormat } = this.props;

    this.blur();

    onValueChange && onValueChange(date.format(valueFormat));
  };
}

export default DatePicker;
