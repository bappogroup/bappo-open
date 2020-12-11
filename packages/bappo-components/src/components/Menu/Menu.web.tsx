import * as React from 'react';

import Colors from '../../apis/Colors';
import { useDeviceKind } from '../../apis/DeviceKind';
import { Popover } from '../../internals/Popover.web';
import Icon from '../Icon';
import { Context, useMenuContext } from './MenuContext';
import {
  ActionRow,
  MenuItemIcon,
  MenuItemLabel,
  PopoverContentContainer,
  TriggerContainer,
} from './StyledComponents.web';
import { MenuItemProps, MenuProps } from './types';

type Props = MenuProps & {
  align?: 'left' | 'right';
  className?: string;
  minWidth?: number;
  maxWidth?: number;
  maxHeight?: number;
};

export default function Menu({
  align,
  children,
  className,
  icon = 'menu',
  iconColor = Colors.BLACK,
  maxHeight = 150,
  maxWidth,
  minWidth = 120,
  testID,
  trigger,
  triggerStyle,
}: Props) {
  const [active, setActive] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const deviceKind = useDeviceKind();

  const close = () => setActive(false);

  const getPopoverPlacement = (anchorRect, popupContentRect) => {
    const right = anchorRect.left - popupContentRect.width + anchorRect.width;

    const distanceFromRight =
      window.innerWidth - anchorRect.left - anchorRect.width;

    const _align =
      align || (anchorRect.left < distanceFromRight * 2 ? 'left' : 'right');

    return {
      top: anchorRect.bottom,
      left: _align === 'left' ? anchorRect.left : right,
    };
  };

  return (
    <Context.Provider value={{ close, active }}>
      <TriggerContainer
        ref={containerRef}
        className={className}
        onClick={() => setActive(true)}
        testID={testID}
        style={triggerStyle}
      >
        {typeof trigger === 'function'
          ? trigger(active)
          : trigger || <Icon name={icon} color={iconColor} />}
      </TriggerContainer>
      {active ? (
        <Popover
          anchorEl={containerRef.current}
          onRequestClose={() => setActive(false)}
          placement={getPopoverPlacement}
          visible
        >
          <PopoverContentContainer
            $minWidth={minWidth}
            $maxWidth={maxWidth}
            $maxHeight={maxHeight}
            $deviceKind={deviceKind}
          >
            {children}
          </PopoverContentContainer>
        </Popover>
      ) : null}
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
