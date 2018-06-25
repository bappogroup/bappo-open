// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import TouchableView from '../Button';
import Text from '../Text';
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

const Button = ({ disabled, icon, loading, text, type }: Props) => {
  return (
    <StyledTouchableView
      disabled={disabled}
      icon={icon}
      text={text}
      type={type}
    >
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

const ButtonLabel = styled(Text)`
  ${buttonTextStyle};
`;
