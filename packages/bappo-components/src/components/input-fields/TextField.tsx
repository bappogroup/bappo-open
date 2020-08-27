import React from 'react';
import warning from 'warning';

import { useFieldState } from '../../primitives/Form';
import { InputField, InputFieldProps } from '../../primitives/Form/types';
import TextInput from '../../primitives/TextInput';
import { TextInputProps } from '../../primitives/TextInput/types';
import { InputFieldWrapper } from './wrappers';

type Props = Omit<InputFieldProps<string>, 'value'> & TextInputProps;

function TextField(props: Props, ref: React.Ref<InputField>) {
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

  const inputRef = React.useRef<TextInput>(null);
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
    <InputFieldWrapper
      fieldState={fieldState}
      focusInput={focusInput}
      label={label}
      required={required}
      reserveErrorSpace={reserveErrorSpace}
      testID={testID}
    >
      <TextInput
        {...rest}
        ref={inputRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onValueChange={onValueChange}
        value={fieldState.value}
      />
    </InputFieldWrapper>
  );
}

const ForwardRefTextField = React.forwardRef(TextField);
// Cast to NamedExoticComponent to remove `propTypes` which causes problems when
// type checking.
export default ForwardRefTextField as React.NamedExoticComponent<Props>;
