import React from 'react';

import ActivityIndicator from '../../primitives/ActivityIndicator';
import { getFocusedTextColor } from './helpers';
import { SpinnerContainer } from './styles';
import { ButtonContainerStyleProps } from './types';

const ButtonSpinner = ({
  hasDisabledStyle,
  type,
}: Pick<ButtonContainerStyleProps, 'hasDisabledStyle' | 'type'>) => {
  const styleProps = {
    hasDisabledStyle,
    type,
  };
  return (
    <SpinnerContainer {...styleProps}>
      <ActivityIndicator color={getFocusedTextColor(styleProps)} />
    </SpinnerContainer>
  );
};

export default ButtonSpinner;
