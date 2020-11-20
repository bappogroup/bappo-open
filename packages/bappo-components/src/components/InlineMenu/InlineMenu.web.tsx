import * as React from 'react';

import { Popover } from '../../internals/Popover.web';
import { ScrollView } from '../../primitives/ScrollView';
import Icon from '../Icon';
import {
  ActionRow,
  BackLink,
  Label,
  PopoverContentContainer,
  WebContainer,
} from './StyledComponents.web';
import { InlineMenuProps } from './types';

type Props = InlineMenuProps & {
  align?: 'left' | 'right';
  width?: number;
};

export default function InlineMenu({
  actions,
  icon,
  align,
  width = 300,
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
    <PopoverContentContainer $width={width} $maxHeight={600}>
      {/* <ScrollView> */}
      <BackButton onPress={close} />
      {actions.map(renderAction)}
      {/* </ScrollView> */}
    </PopoverContentContainer>
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
      {active && (
        <Popover
          anchorEl={containerRef.current}
          onRequestClose={() => setActive(false)}
          visible={active}
        >
          {renderPopover()}
        </Popover>
      )}
    </WebContainer>
  );
}

const BackButton = ({ onPress }) => (
  <BackLink onPress={onPress}>
    <Icon name="arrow-back-ios" />
  </BackLink>
);
