import React from 'react';

import Menu from '../../components/Menu';
import {
  Container,
  MainButton,
  MenuButton,
  Separator,
} from './StyledComponents.native';
import { SplitButtonProps } from './types';

type Props = SplitButtonProps & {
  className?: string;
};

export default function SplitButton({
  children,
  className,
  onButtonPress,
  style,
  testID,
  text,
  icon,
  type = 'primary',
}: Props) {
  return (
    <Container className={className} style={style}>
      <MainButton
        data-testid={`${testID}-main`}
        onPress={onButtonPress}
        icon={icon}
        text={text}
        type={type}
      />
      <Separator />
      <Menu
        align="right"
        testID={`${testID}-arrow`}
        trigger={(open, _close, _active) => MenuTrigger(open, type, testID)}
      >
        {children}
      </Menu>
    </Container>
  );
}

const MenuTrigger = (open, type, testID) => {
  return (
    <MenuButton
      onPress={() => open()}
      data-testid={`${testID}-menu-button`}
      icon="arrow-drop-down"
      type={type}
    />
  );
};

SplitButton.Item = Menu.Item;
