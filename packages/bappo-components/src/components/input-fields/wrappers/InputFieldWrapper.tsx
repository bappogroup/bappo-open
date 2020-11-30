import React from 'react';

import Paragraph from '../../Paragraph';
import FieldContainer from '../FieldContainer';
import FieldLabel from '../FieldLabel';
import {
  FieldInputContainer,
  FieldLabelAsterisk,
  FieldLabelContainer,
} from '../StyledComponents';
import TouchToFocusArea from '../TouchToFocusArea';
import { InputWrapperProps } from './types';

function InputFieldWrapper<V>(props: InputWrapperProps<V>) {
  const {
    children,
    className,
    fieldState,
    focusInput,
    label,
    required,
    style,
    testID,
    reserveErrorSpace = true,
  } = props;

  return (
    <FieldContainer className={className} style={style} testID={testID}>
      <TouchToFocusArea
        onPress={focusInput}
        testID={testID && `${testID}-control`}
      >
        {label && (
          <FieldLabelContainer>
            <FieldLabel testID={testID && `${testID}-label`}>
              {label}
            </FieldLabel>
            {required && <FieldLabelAsterisk />}
          </FieldLabelContainer>
        )}
        <FieldInputContainer $hasError={fieldState.touched && fieldState.error}>
          {children}
        </FieldInputContainer>
      </TouchToFocusArea>
      {reserveErrorSpace && (
        <Paragraph type="error">
          {fieldState.touched ? fieldState.error : ''}
        </Paragraph>
      )}
    </FieldContainer>
  );
}

export default InputFieldWrapper;
