// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import ActivityIndicator from '../../primitives/ActivityIndicator';
import {
  StyledTouchableView,
  StyledIcon,
  ButtonLabel,
  selectTextColor,
} from './styles';

type RequiredProps = {
  type: 'primary' | 'secondary' | 'tertiary' | 'destructive',
};
type OptionalProps = {
  disabled?: boolean,
  icon?: string,
  loading?: boolean,
  onPress?: () => void,
  text?: string,
  style?: any,
};
type Props = RequiredProps & OptionalProps;

const Button = ({
  disabled,
  icon,
  loading,
  onPress,
  text,
  type,
  style,
}: Props) => {
  return (
    <StyledTouchableView
      disabled={disabled}
      icon={icon}
      onPress={onPress}
      text={text}
      type={type}
      style={style}
    >
      {loading && (
        <ActivityIndicator
          color={selectTextColor(type)}
          style={{ marginRight: 8 }}
        />
      )}
      {icon ? <StyledIcon name={icon} disabled={disabled} type={type} /> : null}
      {text ? (
        <ButtonLabel disabled={disabled} type={type}>
          {text}
        </ButtonLabel>
      ) : null}
    </StyledTouchableView>
  );
};

Button.defaultProps = {
  type: 'primary',
};

export default Button;
