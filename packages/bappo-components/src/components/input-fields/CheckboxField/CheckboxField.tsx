import React from 'react';
import warning from 'warning';

import { InputHandle } from '../../../input-handle';
import Checkbox from '../../../primitives/Checkbox';
import { CheckboxProps } from '../../../primitives/Checkbox/types';
import { useFieldState } from '../../../primitives/Form';
import { InputField, InputFieldProps } from '../../../primitives/Form/types';
import { CheckboxFieldWrapper } from '../wrappers';

type Props = Omit<InputFieldProps<boolean>, 'value'> & CheckboxProps;

function CheckboxField(props: Props, ref: React.Ref<InputField>) {
  const {
    fieldState: passedFieldState,
    label,
    required,
    reserveErrorSpace,
    testID,
    validate,
    ...rest
  } = props;
  warning(
    !(validate && !reserveErrorSpace),
    `Prop "reserveErrorSpace" is set to false while "validate" is supplied. You will not see the validation error.`,
  );

  const inputRef = React.useRef<InputHandle>(null);
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

  const { fieldState, onBlur, onFocus, onValueChange } = useFieldState(props);

  return (
    <CheckboxFieldWrapper
      fieldState={fieldState}
      focusInput={focusInput}
      label={label}
      onValueChange={onValueChange}
      reserveErrorSpace={reserveErrorSpace}
      testID={testID}
    >
      <Checkbox
        {...rest}
        ref={inputRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onValueChange={onValueChange}
        value={fieldState.value}
      />
    </CheckboxFieldWrapper>
  );
}

export default React.forwardRef(CheckboxField);
