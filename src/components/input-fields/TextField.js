// @flow

import * as React from 'react';
import TextInput from '../../primitives/TextInput';
import Paragraph from '../Paragraph';
import type { InputField, InputFieldProps } from './types.js.flow';
import {
  FieldContainer,
  FieldInputContainer,
  FieldLabel,
  FieldLabelContainer,
} from './StyledComponents';

type Props = InputFieldProps;

class TextField extends React.Component<Props> implements InputField {
  static displayName = 'TextField';

  blur() {
    this._textInputRef.current && this._textInputRef.current.blur();
  }

  focus() {
    this._textInputRef.current && this._textInputRef.current.focus();
  }

  render() {
    const { error, label, onBlur, onFocus, onValueChange, value } = this.props;
    return (
      <FieldContainer>
        {label && (
          <FieldLabelContainer>
            <FieldLabel>{label}</FieldLabel>
          </FieldLabelContainer>
        )}
        <FieldInputContainer>
          <TextInput
            ref={this._textInputRef}
            onBlur={onBlur}
            onFocus={onFocus}
            onValueChange={onValueChange}
            value={value}
          />
        </FieldInputContainer>
        <Paragraph type="error">{error}</Paragraph>
      </FieldContainer>
    );
  }

  _textInputRef = React.createRef();
}

export default TextField;
