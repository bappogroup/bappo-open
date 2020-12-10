import * as React from 'react';
import { ModalProps } from 'react-native';
import styled from 'styled-components';

import Icon from '../Icon';
// Note that this is not the Modal we export. It has a slide animation on native.
import Modal from './Modal';
import {
  ActionRow,
  BackLink,
  Label,
  WebContainer,
} from './StyledComponents.web';
import { DropdownProps } from './types';

type Props = DropdownProps & {
  align?: 'left' | 'right';
  width?: number;
};

export default function Dropdown({
  actions,
  icon = 'menu',
  align,
  width = 300,
  children,
  iconColor = 'black',
  testID,
}: Props) {
  const [active, setActive] = React.useState(false);

  const [modalPlacement, setModalPlacement] = React.useState({});

  const containerRef = React.useRef<HTMLDivElement>(null);

  const updatePlacement = () => {
    if (containerRef && containerRef.current) {
      const dims = containerRef.current.getBoundingClientRect();

      let left: number | null = Math.max(dims.left, 5);
      let right: number | null = Math.max(
        window.innerWidth - (dims.left + dims.width),
        5,
      );
      const _align = align || (left < right * 2 ? 'left' : 'right');

      if (_align === 'left') {
        right = null;
        if (left + width > window.innerWidth) {
          // the left position cannot be too high, it should not push the dropdown over the edge of the screen
          left = window.innerWidth - (width + 5);
        }
      } else {
        left = null;
        if (right + width > window.innerWidth) {
          // the right position cannot be too high, it should not push the dropdown over the edge of the screen
          right = window.innerWidth - (width + 5);
        }
      }

      let top = dims.bottom + 3;
      const height = actions.length * 40;

      if (top + height + 10 > window.innerHeight) {
        top = window.innerHeight - height - 10;
      }

      setModalPlacement({
        type: 'dropdown',
        top,
        height,
        width,
        align: _align,
        left,
        right,
      });
    }
  };

  React.useEffect(() => {
    updatePlacement();
  }, [active]);

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
    <WebContainer data-testid={testID}>
      <div
        style={{
          display: 'inline-block',
          cursor: 'pointer',
          padding: '0px 5px',
        }}
        onClick={() => setActive(true)}
        ref={containerRef}
      >
        {children || <Icon name={icon} color={iconColor} />}
      </div>
      {active ? (
        <Modal
          onRequestClose={close}
          placement={modalPlacement}
          visible
          hideHeader={true}
        >
          <BackButton onPress={close} />
          {actions.map(renderAction)}
        </Modal>
      ) : null}
    </WebContainer>
  );
}

const BackButton = ({ onPress }) => (
  <BackLink onPress={onPress}>
    <Icon name="arrow-back-ios" />
  </BackLink>
);
