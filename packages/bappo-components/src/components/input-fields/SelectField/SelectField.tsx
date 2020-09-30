import React from 'react';
import warning from 'warning';

import { useFieldState } from '../../../primitives/Form';
import { InputField, InputFieldProps } from '../../../primitives/Form/types';
import OldSelect from '../../OldSelect';
import { SelectProps } from '../../OldSelect/types';
import Select from '../../Select';
import { InputFieldWrapper } from '../wrappers';

type Props = Omit<InputFieldProps<SelectProps['value']>, 'value'> &
  SelectProps & {
    modal?: boolean;
  };

function SelectField(props: Props, ref: React.Ref<InputField>) {
  const {
    fieldState: passedFieldState,
    label,
    modal,
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

  const SelectComponent = modal ? Select : OldSelect;

  const inputRef = React.useRef<OldSelect>(null);
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
      <SelectComponent
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
