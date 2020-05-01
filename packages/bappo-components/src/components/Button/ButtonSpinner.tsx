import React from 'react';

import ActivityIndicator from '../../primitives/ActivityIndicator';
import { getFocusedTextColor } from './helpers';
import { SpinnerContainer } from './styles';

type Props = {
  hasDisabledStyle?: boolean;
  type?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
};

const ButtonSpinner = ({ hasDisabledStyle, type }: Props) => {
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
