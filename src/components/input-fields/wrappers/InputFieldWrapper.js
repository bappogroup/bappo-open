// @flow

import * as React from 'react';
import Paragraph from '../../Paragraph';
import FieldLabel from '../FieldLabel';
import TouchToFocusArea from '../TouchToFocusArea';
import {
  FieldContainer,
  FieldInputContainer,
  FieldLabelContainer,
} from '../StyledComponents';
import type { InputWrapperProps } from './types.js.flow';

const InputFieldWrapper = (props: InputWrapperProps) => {
  const { children, fieldState, focusInput, label, testID } = props;

  return (
    <FieldContainer testID={testID}>
      <TouchToFocusArea
        onPress={focusInput}
        testID={testID && `${testID}-control`}
      >
        {label && (
          <FieldLabelContainer>
            <FieldLabel testID={testID && `${testID}-label`}>
              {label}
            </FieldLabel>
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
