// @flow

import * as React from 'react';
import type { TextInputProps } from '../../primitives/TextInput/types.js.flow';
import TextInput from '../../primitives/TextInput';
import type { InputField, InputFieldProps } from './types.js.flow';
import { InputFieldWrapper } from './wrappers';

type Props = InputFieldProps & TextInputProps;

class TextField extends React.Component<Props> implements InputField {
  static displayName = 'TextField';

  blur() {
    this._textInputRef.current && this._textInputRef.current.blur();
  }

  focus() {
    this._textInputRef.current && this._textInputRef.current.focus();
  }

  render() {
    const {
      fieldState,
      label,
      onBlur,
      onFocus,
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
        onBlur={onBlur}
        onFocus={onFocus}
        onValueChange={onValueChange}
        testID={testID}
        value={value}
      >
        <TextInput
          {...rest}
          ref={this._textInputRef}
          onBlur={onBlur}
          onFocus={onFocus}
          onValueChange={onValueChange}
          value={value || ''}
        />
      </InputFieldWrapper>
    );
  }

  _textInputRef = React.createRef();
}

export default TextField;
