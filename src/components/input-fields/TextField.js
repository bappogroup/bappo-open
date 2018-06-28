// @flow

import * as React from 'react';
import type { TextInputProps } from '../../primitives/TextInput/types.js.flow';
import TextInput from '../../primitives/TextInput';
import Paragraph from '../Paragraph';
import type { InputField, InputFieldProps } from './types.js.flow';
import FieldContainer from './FieldContainer';
import {
  FieldInputContainer,
  FieldLabel,
  FieldLabelContainer,
} from './StyledComponents';

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
      error,
      label,
      onBlur,
      onFocus,
      onValueChange,
      value,
      ...rest
    } = this.props;
    return (
      <FieldContainer onPress={() => this.focus()}>
        {label && (
          <FieldLabelContainer>
            <FieldLabel>{label}</FieldLabel>
          </FieldLabelContainer>
        )}
        <FieldInputContainer>
          <TextInput
            {...rest}
            ref={this._textInputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            onValueChange={onValueChange}
            value={value || ''}
          />
        </FieldInputContainer>
        <Paragraph type="error">{error}</Paragraph>
      </FieldContainer>
    );
  }

  _textInputRef = React.createRef();
}

export default TextField;