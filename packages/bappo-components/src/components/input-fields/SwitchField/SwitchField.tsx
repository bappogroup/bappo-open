import React from 'react';
import warning from 'warning';

import Switch from '../../../primitives/Switch';
import { SwitchProps } from '../../../primitives/Switch/types';
import { InputField, InputFieldProps } from '../types';
import { useFieldState } from '../useFieldState';
import { SwitchFieldWrapper } from '../wrappers';

type Props = InputFieldProps<boolean> & SwitchProps;

function SwitchField(props: Props, ref: React.Ref<InputField>) {
  const {
    fieldState: passedFieldState,
    label,
    onValueChange,
    required,
    reserveErrorSpace,
    testID,
    validate,
    value,
    ...rest
  } = props;
  warning(
    !(validate && !reserveErrorSpace),
    `Prop "reserveErrorSpace" is set to false while "validate" is supplied. You will not see the validation error.`,
  );

  const inputRef = React.useRef<Switch>(null);
  const focusInput = React.useCallback(
    () => inputRef.current && inputRef.current.focus(),
    [],
  );
  const blurInput = React.useCallback(
    () => inputRef.current && inputRef.current.blur(),
    [],
  );
  React.useImperativeHandle(ref, () => ({
    focus: focusInput,
    blur: blurInput,
  }));

  const { fieldState, onBlur, onFocus } = useFieldState(props);

  return (
    <SwitchFieldWrapper
      fieldState={fieldState}
      focusInput={focusInput}
      label={label}
      reserveErrorSpace={reserveErrorSpace}
      testID={testID}
      value={value}
    >
      <Switch
        {...rest}
        ref={inputRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onValueChange={onValueChange}
        value={value}
      />
    </SwitchFieldWrapper>
  );
}

export default React.forwardRef(SwitchField);
