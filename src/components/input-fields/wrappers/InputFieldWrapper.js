// @flow

import * as React from 'react';
import Paragraph from '../../Paragraph';
import FieldContainer from '../FieldContainer';
import FieldLabel from '../FieldLabel';
import TouchToFocusArea from '../TouchToFocusArea';
import {
  FieldInputContainer,
  FieldLabelAsterisk,
  FieldLabelContainer,
} from '../StyledComponents';
import type { InputWrapperProps } from './types.js.flow';

const InputFieldWrapper = (props: InputWrapperProps) => {
  const {
    children,
    className,
    fieldState,
    focusInput,
    label,
    required,
    style,
    testID,
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
        <FieldInputContainer>{children}</FieldInputContainer>
      </TouchToFocusArea>
      <Paragraph type="error">
        {fieldState.touched ? fieldState.error : ''}
      </Paragraph>
    </FieldContainer>
  );
};

export default InputFieldWrapper;
