// @flow

import * as React from 'react';
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
  style?: any,
  text?: string,
  // Will be removed
  className?: string,
};
type Props = RequiredProps & OptionalProps;

const Button = ({
  className,
  disabled,
  icon,
  loading,
  onPress,
  style,
  text,
  type,
}: Props) => {
  return (
    <StyledTouchableView
      disabled={disabled}
      onPress={onPress}
      className={className}
      icon={icon}
      style={style}
      text={text}
      type={type}
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
