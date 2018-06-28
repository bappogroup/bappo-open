// @flow

import * as React from 'react';
import { styled } from '../../../apis/Style';
import type { SwitchProps } from '../../../primitives/Switch/types.js.flow';
import Switch from '../../../primitives/Switch';
import View from '../../../primitives/View';
import Paragraph from '../../Paragraph';
import type { InputField, InputFieldProps } from '../types.js.flow';
import TouchToFocusArea from '../TouchToFocusArea';
import { FieldContainer, FieldLabel } from '../StyledComponents';

type Props = InputFieldProps & SwitchProps;

class SwitchField extends React.Component<Props> implements InputField {
  static displayName = 'SwitchField';

  blur() {
    this._switchRef.current && this._switchRef.current.blur();
  }

  focus() {
    this._switchRef.current && this._switchRef.current.focus();
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
      <FieldContainer>
        <SwitchTouchToFocusArea
          onPress={() => onValueChange && onValueChange(!value)}
        >
          {label && <FieldLabel>{label}</FieldLabel>}
          <SwitchContainer>
            <Switch
              {...rest}
              ref={this._switchRef}
              onBlur={onBlur}
              onFocus={onFocus}
              onValueChange={onValueChange}
              value={value}
            />
          </SwitchContainer>
        </SwitchTouchToFocusArea>
        <Paragraph type="error">{error}</Paragraph>
      </FieldContainer>
    );
  }

  _switchRef = React.createRef();
}

export default SwitchField;

const SwitchTouchToFocusArea = styled(TouchToFocusArea)`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
`;

const SwitchContainer = styled(View)`
  margin-left: 2px;
`;
