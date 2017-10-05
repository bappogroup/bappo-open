// @flow

import React from 'react';
import RX from 'reactxp';
import ButtonBase from './Button';

type Props = {
  style?: any,
};

const Button = ({ style, ...props }: Props) => (
  <ButtonBase
    {...props}
    style={Array.isArray(style) ? [styles.default, ...style] : [styles.default, style]}
  />
);

Button.defaultProps = {
  style: null,
};

export default Button;

const styles = {
  default: RX.Styles.createButtonStyle({
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
  }),
};
