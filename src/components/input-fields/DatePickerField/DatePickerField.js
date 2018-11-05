// @flow

import * as React from 'react';
import type {
  InputField,
  InputFieldProps,
  DatePickerProps,
} from './types.js.flow';
import { InputFieldWrapper } from '../wrappers';
import DatePicker from '../../DatePicker';

type Props = InputFieldProps & DatePickerProps;

class DatePickerField extends React.Component<Props> implements InputField {
  static displayName = 'DatePickerField';

  blur() {
    this._inputRef.current && this._inputRef.current.blur();
  }

  focus() {
    this._inputRef.current && this._inputRef.current.focus();
  }

  render() {
    const {
      fieldState = {},
      label,
      onValueChange,
      testID,
      value,
      ...rest
    } = this.props;

    return (
      <InputFieldWrapper
        fieldState={fieldState}
        focusInput={() => this.focus()}
        label={label}
        testID={testID}
      >
        <DatePicker
          {...rest}
          ref={this._inputRef}
          value={value}
          onValueChange={onValueChange}
        />
      </InputFieldWrapper>
    );
  }

  _inputRef = React.createRef();
}

export default DatePickerField;
