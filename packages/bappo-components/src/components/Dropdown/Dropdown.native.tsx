import * as React from 'react';

import View from '../../primitives/View';
import Icon from '../Icon';
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
import { DropdownProps } from './types';

export default function Dropdown({
  actions,
  icon = 'more-vert',
  children,
  iconColor = 'black',
}: DropdownProps) {
  const [active, setActive] = React.useState(false);

  const close = () => setActive(false);

  const renderAction = (action: any) => (
    <ActionRow
      key={action.label}
      onPress={() => {
        close();
        action.onPress();
      }}
    >
      {action.icon && <Icon name={action.icon} />}
      <Label>{action.label}</Label>
    </ActionRow>
  );

  return (
    <LinkContainer>
      <LinkInner onPress={() => setActive(true)}>
        {children || <Icon name={icon} color={iconColor} />}
      </LinkInner>
      <Modal onRequestClose={close} visible={active}>
        <ModalContainer>
          <BackLink onPress={close}>
            <View pointerEvents={'none'}>
              <Icon name="arrow-back-ios" />
            </View>
          </BackLink>
          {actions.map(renderAction)}
        </ModalContainer>
      </Modal>
    </LinkContainer>
  );
}
