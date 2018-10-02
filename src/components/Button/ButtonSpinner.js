// @flow

import * as React from 'react';
import ActivityIndicator from '../../primitives/ActivityIndicator';
import { getTextColor } from './helpers';
import { SpinnerContainer } from './styles';

type Props = {
  disabled?: boolean,
  type?: 'primary' | 'secondary' | 'tertiary' | 'destructive',
};

const ButtonSpinner = ({ disabled, type }: Props) => {
  const styleProps = {
    disabled,
    type,
  };
  return (
    <SpinnerContainer {...styleProps}>
      <ActivityIndicator color={getTextColor(styleProps)} />
    </SpinnerContainer>
  );
};

export default ButtonSpinner;
