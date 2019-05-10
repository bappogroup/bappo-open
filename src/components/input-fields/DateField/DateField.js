// @flow

import * as React from 'react';
import type { DatePickerProps } from '../../DatePicker/types.js.flow';
import DatePicker from '../../DatePicker';
import type { InputField, InputFieldProps } from '../types.js.flow';
import { InputFieldWrapper } from '../wrappers';

type Props = InputFieldProps & DatePickerProps;

class DateField extends React.Component<Props> implements InputField {
  static displayName = 'DateField';

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

export default DateField;
