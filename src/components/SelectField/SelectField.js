// @flow

import * as React from 'react';
import type { InputField, InputFieldProps, SelectProps } from './types.js.flow';
import { InputFieldWrapper } from '../input-fields/wrappers';
import OldSelect from '../OldSelect';

type Props = InputFieldProps & SelectProps;

class SelectField extends React.Component<Props> implements InputField {
  static displayName = 'SelectField';

  blur() {
    this._textInputRef.current && this._textInputRef.current.blur();
  }

  focus() {
    this._textInputRef.current && this._textInputRef.current.focus();
  }

  render() {
    const {
      fieldState = {},
      label,
      options,
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
        <OldSelect
          {...rest}
          options={options}
          value={value}
          onValueChange={onValueChange}
        />
      </InputFieldWrapper>
    );
  }

  _textInputRef = React.createRef();
}

export default SelectField;
