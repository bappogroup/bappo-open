import * as React from 'react';

import { Popover } from '../../internals/Popover.web';
import Icon from '../Icon';
import {
  ActionRow,
  BackLink,
  Label,
  PopoverContentContainer,
  WebContainer,
} from './StyledComponents.web';
import { MenuProps } from './types';

type Props = MenuProps & {
  align?: 'left' | 'right';
  width?: number;
  height?: number;
};

export default function Menu({
  actions,
  icon,
  align,
  width = 300,
  height = 150,
  children,
  iconColor = 'black',
  testID,
}: Props) {
  const [active, setActive] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

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

  const renderPopover = () => (
    <PopoverContentContainer $width={width} $maxHeight={height}>
      <BackButton onPress={close} />
      {actions.map(renderAction)}
    </PopoverContentContainer>
  );

  const getPopoverPlacement = (anchorRect, popupContentRect) => {
    return {
      top: anchorRect.bottom,
      left: anchorRect.left,
    };
  };

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
      <Popover
        anchorEl={containerRef.current}
        onRequestClose={() => setActive(false)}
        visible={active}
        placement={getPopoverPlacement}
      >
        {renderPopover()}
      </Popover>
    </WebContainer>
  );
}

const BackButton = ({ onPress }) => (
  <BackLink onPress={onPress}>
    <Icon name="arrow-back-ios" />
  </BackLink>
);
