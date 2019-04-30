// @flow

import * as React from 'react';
import type { SwitchProps } from '../../../primitives/Switch/types.js.flow';
import Switch from '../../../primitives/Switch';
import type { InputField, InputFieldProps } from '../types.js.flow';
import { SwitchFieldWrapper } from '../wrappers';

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
      fieldState,
      label,
      onBlur,
      onFocus,
      onValueChange,
      testID,
      value,
      reserveErrorSpace,
      ...rest
    } = this.props;
    return (
      <SwitchFieldWrapper
        fieldState={fieldState}
        focusInput={() => this.focus()}
        label={label}
        onBlur={onBlur}
        onFocus={onFocus}
        onValueChange={onValueChange}
        testID={testID}
        reserveErrorSpace={reserveErrorSpace}
        value={value}
      >
        <Switch
          {...rest}
          ref={this._switchRef}
          onBlur={onBlur}
          onFocus={onFocus}
          onValueChange={onValueChange}
          value={value}
        />
      </SwitchFieldWrapper>
    );
  }

  _switchRef = React.createRef();
}

export default SwitchField;
