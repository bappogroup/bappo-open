import * as React from 'react';

import Colors from '../../apis/Colors';
import Icon from '../Icon';
import { Context, useMenuContext } from './MenuContext';
// Note that this is not the Modal we export. It has a slide animation on native.
import Modal from './Modal';
import {
  ActionRow,
  MenuItemIcon,
  MenuItemLabel,
  ModalContainer,
  TriggerContainer,
} from './StyledComponents.native';
import { MenuItemProps, MenuProps } from './types';

export default function Menu({
  children,
  icon = 'menu',
  iconColor = Colors.BLACK,
  testID,
  trigger,
  triggerStyle,
}: MenuProps) {
  const [active, setActive] = React.useState(false);

  const close = () => setActive(false);

  return (
    <Context.Provider value={{ close, active }}>
      <TriggerContainer
        onPress={() => setActive(true)}
        style={triggerStyle}
        testID={testID}
      >
        {typeof trigger === 'function'
          ? trigger(active)
          : trigger || <Icon name={icon} color={iconColor} />}
      </TriggerContainer>
      <Modal onRequestClose={close} visible={active}>
        <ModalContainer>{children}</ModalContainer>
      </Modal>
    </Context.Provider>
  );
}

const Item = ({ children, icon, numberOfLines, onPress }: MenuItemProps) => {
  const context = useMenuContext();

  return (
    <ActionRow
      onPress={() => {
        context.close();
        onPress?.();
      }}
    >
      {typeof children === 'string' ? (
        <React.Fragment>
          {icon ? <MenuItemIcon name={icon} /> : null}
          <MenuItemLabel numberOfLines={numberOfLines} $hasIcon={!!icon}>
            {children}
          </MenuItemLabel>
        </React.Fragment>
      ) : (
        children
      )}
    </ActionRow>
  );
};

Menu.Item = Item;
