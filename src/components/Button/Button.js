// @flow

import * as React from 'react';
import ActivityIndicator from '../../primitives/ActivityIndicator';
import TouchableView from '../../primitives/TouchableView';
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
  const content = () => [
    loading && (
      <ActivityIndicator
        key="activity-indicator"
        color={selectTextColor(type)}
        style={{ marginRight: 8 }}
      />
    ),
    icon && (
      <StyledIcon
        key="icon"
        name={icon}
        disabled={disabled}
        type={type}
        iconOnly={icon && !text}
      />
    ),
    text && (
      <ButtonLabel disabled={disabled} type={type} key="label">
        {text}
      </ButtonLabel>
    ),
  ];

  if (icon && !text)
    return (
      <TouchableView
        disabled={disabled}
        onPress={onPress}
        className={className}
        icon={icon}
        style={style}
        text={text}
        type={type}
      >
        {content()}
      </TouchableView>
    );

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
      {content()}
    </StyledTouchableView>
  );
};

Button.defaultProps = {
  type: 'primary',
};

export default Button;
