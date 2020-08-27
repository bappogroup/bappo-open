import React from 'react';
import warning from 'warning';

import { useFieldState } from '../../../primitives/Form';
import { InputField, InputFieldProps } from '../../../primitives/Form/types';
import Select from '../../OldSelect';
import { SelectProps } from '../../OldSelect/types';
import { InputFieldWrapper } from '../wrappers';

type Props = Omit<InputFieldProps<SelectProps['value']>, 'value'> & SelectProps;

function SelectField(props: Props, ref: React.Ref<InputField>) {
  const {
    fieldState: passedFieldState,
    label,
    options,
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

  const inputRef = React.useRef<Select>(null);
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
      onValueChange={onValueChange}
      required={required}
      reserveErrorSpace={reserveErrorSpace}
      testID={testID}
    >
      <Select
        {...rest}
        ref={inputRef}
        onBlur={onBlur}
        onFocus={onFocus}
        onValueChange={onValueChange}
        options={options}
        value={fieldState.value}
      />
    </InputFieldWrapper>
  );
}

const ForwardRefSelectField = React.forwardRef(SelectField);
// Cast to NamedExoticComponent to remove `propTypes` which causes problems when
// type checking.
export default ForwardRefSelectField as React.NamedExoticComponent<Props>;
