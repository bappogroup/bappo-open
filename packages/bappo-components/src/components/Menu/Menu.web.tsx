import * as React from 'react';
import { CSSProperties } from 'styled-components';

import { Popover } from '../../internals/Popover.web';
import Icon from '../Icon';
import { Context, useMenuContext } from './MenuContext';
import {
  ActionRow,
  BackLink,
  Label,
  PopoverContentContainer,
  WebContainer,
} from './StyledComponents.web';
import { MenuItemProps, MenuProps } from './types';

type Props = MenuProps & {
  align?: 'left' | 'right';
  minWidth?: number;
  maxWidth?: number;
  maxHeight?: number;
  triggerStyle?: CSSProperties;
};

export default function Menu({
  icon,
  align,
  minWidth = 300,
  maxWidth,
  maxHeight = 150,
  children,
  iconColor = 'black',
  testID,
  trigger,
  triggerStyle = {
    display: 'inline-block',
    cursor: 'pointer',
    padding: '0px 5px',
  },
}: Props) {
  const [active, setActive] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const close = () => setActive(false);

  const getPopoverPlacement = (anchorRect, popupContentRect) => {
    const right = anchorRect.left - popupContentRect.width + anchorRect.width;

    const _align = align || (anchorRect.left < right * 2 ? 'left' : 'right');

    return {
      top: anchorRect.bottom,
      left: _align === 'left' ? anchorRect.left : right,
    };
  };

  return (
    <Context.Provider value={{ close, active }}>
      <WebContainer data-testid={testID}>
        <div
          style={triggerStyle}
          onClick={() => setActive(true)}
          ref={containerRef}
        >
          {trigger || <Icon name={icon} color={iconColor} />}
        </div>
        <Popover
          anchorEl={containerRef.current}
          onRequestClose={() => setActive(false)}
          visible={active}
          placement={getPopoverPlacement}
        >
          <PopoverContentContainer
            $minWidth={minWidth}
            $maxWidth={maxWidth}
            $maxHeight={maxHeight}
          >
            {children}
          </PopoverContentContainer>
        </Popover>
      </WebContainer>
    </Context.Provider>
  );
}

const BackButton = ({ onPress }) => (
  <BackLink onPress={onPress}>
    <Icon name="arrow-back-ios" />
  </BackLink>
);

const CloseButton = () => {
  const context = useMenuContext();

  return <BackButton onPress={context.close} />;
};

const MenuItem = ({ label, icon, numberOfLines, onPress }: MenuItemProps) => {
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
      <Label numberOfLines={numberOfLines}>{label}</Label>
    </ActionRow>
  );
};

Menu.MenuItem = MenuItem;
Menu.CloseButton = CloseButton;
