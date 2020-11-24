import * as React from 'react';

import View from '../../primitives/View';
import Icon from '../Icon';
import { Context, useMenuContext } from './MenuContext';
// Note that this is not the Modal we export. It has a slide animation on native.
import Modal from './Modal';
import {
  ActionRow,
  BackLink,
  Label,
  LinkContainer,
  LinkInner,
  ModalContainer,
} from './StyledComponents.native';
import { MenuItemProps, MenuProps } from './types';

export default function Menu({
  icon,
  children,
  iconColor = 'black',
  trigger,
}: MenuProps) {
  const [active, setActive] = React.useState(false);

  const close = () => setActive(false);

  return (
    <Context.Provider value={{ close, active }}>
      <LinkContainer>
        <LinkInner onPress={() => setActive(true)}>
          {trigger || <Icon name={icon} color={iconColor} />}
        </LinkInner>
        <Modal onRequestClose={close} visible={active}>
          <ModalContainer>
            <Menu.CloseButton />
            {children}
          </ModalContainer>
        </Modal>
      </LinkContainer>
    </Context.Provider>
  );
}

const BackButton = ({ onPress }) => (
  <BackLink onPress={onPress}>
    <View pointerEvents={'none'}>
      <Icon name="arrow-back-ios" />
    </View>
  </BackLink>
);

const CloseButton = () => {
  const context = useMenuContext();

  return <BackButton onPress={context.close} />;
};

const MenuItem = ({ label, icon, onPress }: MenuItemProps) => {
  const context = useMenuContext();

  return (
    <ActionRow
      key={label}
      onPress={() => {
        context.close();
        onPress();
      }}
    >
      {icon && <Icon name={icon} />}
      <Label>{label}</Label>
    </ActionRow>
  );
};

Menu.MenuItem = MenuItem;
Menu.CloseButton = CloseButton;
