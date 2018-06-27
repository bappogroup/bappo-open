// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';
import TouchableView from '../../primitives/TouchableView';
import Icon from '../Icon';
import { buttonContainerStyle, buttonTextStyle } from './styles';

type RequiredProps = {
  type: 'primary' | 'secondary' | 'tertiary' | 'destructive',
};
type OptionalProps = {
  disabled?: boolean,
  icon?: string,
  loading?: boolean,
  onPress?: () => void,
  text?: string,
};
type Props = RequiredProps & OptionalProps;

const Button = ({ disabled, icon, loading, onPress, text, type }: Props) => {
  return (
    <StyledTouchableView
      disabled={disabled}
      icon={icon}
      onPress={onPress}
      text={text}
      type={type}
    >
      {icon ? <StyledIcon name={icon} disabled={disabled} type={type} /> : null}
      {text ? (
        <ButtonLabel disabled={disabled} type={type}>
          {text}
        </ButtonLabel>
      ) : null}
    </StyledTouchableView>
  );
};

export default Button;

const StyledTouchableView = styled(TouchableView)`
  ${buttonContainerStyle};
`;

const StyledIcon = styled(Icon)`
  ${buttonTextStyle};
`;

const ButtonLabel = styled(Text)`
  ${buttonTextStyle};
`;
