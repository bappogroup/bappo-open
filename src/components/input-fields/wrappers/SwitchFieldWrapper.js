// @flow

import * as React from 'react';
import { styled } from '../../../apis/Style';
import View from '../../../primitives/View';
import Paragraph from '../../Paragraph';
import FieldContainer from '../FieldContainer';
import FieldLabel from '../FieldLabel';
import TouchToFocusArea from '../TouchToFocusArea';
import type { InputWrapperProps } from './types.js.flow';

const SwitchFieldWrapper = (props: InputWrapperProps) => {
  const {
    children,
    className,
    fieldState,
    label,
    onValueChange,
    style,
    testID,
    value,
  } = props;

  return (
    <FieldContainer className={className} style={style} testID={testID}>
      <SwitchTouchToFocusArea
        onPress={() => onValueChange && onValueChange(!value)}
        testID={testID && `${testID}-control`}
      >
        {label && (
          <FieldLabel testID={testID && `${testID}-label`}>{label}</FieldLabel>
        )}
        <SwitchContainer>{children}</SwitchContainer>
      </SwitchTouchToFocusArea>
      <Paragraph type="error">
        {fieldState.touched ? fieldState.error : ''}
      </Paragraph>
    </FieldContainer>
  );
};

export default SwitchFieldWrapper;

const SwitchTouchToFocusArea = styled(TouchToFocusArea)`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
`;

const SwitchContainer = styled(View)`
  margin-left: 2px;
`;
