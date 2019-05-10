// @flow

import * as React from 'react';
import type { TimePickerProps } from '../../TimePicker/types.js.flow';
import TimePicker from '../../TimePicker';
import type { InputField, InputFieldProps } from '../types.js.flow';
import { InputFieldWrapper } from '../wrappers';

type Props = InputFieldProps & TimePickerProps;

class TimeField extends React.Component<Props> implements InputField {
  static displayName = 'TimeField';

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
        <TimePicker
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

export default TimeField;
