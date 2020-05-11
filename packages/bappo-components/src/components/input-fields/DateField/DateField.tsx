import React from 'react';
import warning from 'warning';

import DatePicker from '../../DatePicker';
import { DatePickerProps } from '../../DatePicker/types';
import { InputField, InputFieldProps } from '../types';
import { useFieldState } from '../useFieldState';
import { InputFieldWrapper } from '../wrappers';

type Props = InputFieldProps<string> & DatePickerProps;

function DateField(props: Props, ref: React.Ref<InputField>) {
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

  const inputRef = React.useRef<DatePicker>(null);
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
    <InputFieldWrapper
      fieldState={fieldState}
      focusInput={focusInput}
      label={label}
      required={required}
      reserveErrorSpace={reserveErrorSpace}
      testID={testID}
    >
      <DatePicker
        {...rest}
        ref={inputRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onValueChange={onValueChange}
        value={value}
      />
    </InputFieldWrapper>
  );
}

export default React.forwardRef(DateField);
