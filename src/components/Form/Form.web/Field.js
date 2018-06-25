// @flow

import * as React from 'react';
import styled from 'styled-components';
import FlexDiv from '../../internals/web/FlexDiv';
import Label from '../../internals/Label';
import Paragraph from '../../Paragraph';
import type { FieldValidator } from '../FormState/types.js.flow';
import { FieldState } from '../FormState';
import { FieldInputContainer, FieldLabelContainer } from '../StyledComponents';

type InputComponentProps = {
  [string]: mixed,
  onValueChange: (value: mixed) => void,
  value?: mixed,
};
interface InputComponentInterface {
  blur(): void;
  focus(): void;
}
type InputComponent = React.Component<InputComponentProps, any> &
  InputComponentInterface;
type RequiredProps = {
  component: Class<InputComponent>,
  label: string,
  name: string,
};
type OptionalProps = {
  props?: ?{},
  validate?: FieldValidator,
};
type Props = RequiredProps & OptionalProps;

class Field extends React.Component<Props> {
  props: Props;

  blur() {
    this._inputRef.current && this._inputRef.current.blur();
  }

  focus() {
    this._inputRef.current && this._inputRef.current.focus();
  }

  constructor(props: Props) {
    super(props);

    if (!this.props.name) {
      throw new Error(`Field name is required`);
    }
    if (!this.props.component) {
      throw new Error(`Field component is required`);
    }
  }

  render() {
    const { component, label, name, props, validate } = this.props;

    return (
      <FieldState name={name} validate={validate}>
        {({ error, touched, value, changeValue }) => {
          const inputEl = React.createElement(component, {
            onValueChange: value => changeValue(name, value),
            value,
            ...(props || {}),
            ref: this._inputRef,
          });
          return (
            <FieldContainer onClick={() => this.focus()}>
              <FieldLabelContainer>
                <Label>{label}</Label>
              </FieldLabelContainer>
              <FieldInputContainer>{inputEl}</FieldInputContainer>
              <Paragraph type="error">{touched ? error : ''}</Paragraph>
            </FieldContainer>
          );
        }}
      </FieldState>
    );
  }

  // $FlowFixMe: RefObject is not supported yet
  _inputRef: React.RefObject = React.createRef();
}

export default Field;

const FieldContainer = styled(FlexDiv)``;
