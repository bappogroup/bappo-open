import React from 'react';

import { styled } from '../../../apis/Style';
import View from '../../../primitives/View';
import Paragraph from '../../Paragraph';
import FieldContainer from '../FieldContainer';
import FieldLabel from '../FieldLabel';
import TouchToFocusArea from '../TouchToFocusArea';
import { InputWrapperProps } from './types';

function SwitchFieldWrapper(props: InputWrapperProps<boolean | null>) {
  const {
    children,
    className,
    fieldState,
    label,
    onValueChange,
    style,
    testID,
    value,
    reserveErrorSpace = true,
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
      {reserveErrorSpace && (
        <Paragraph type="error">
          {fieldState.touched ? fieldState.error : ''}
        </Paragraph>
      )}
    </FieldContainer>
  );
}

export default SwitchFieldWrapper;

const SwitchTouchToFocusArea = styled(TouchToFocusArea)`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SwitchContainer = styled(View)`
  margin-left: 2px;
`;
