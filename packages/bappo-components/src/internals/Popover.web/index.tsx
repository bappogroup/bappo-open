import React from 'react';
import styled from 'styled-components';

import { DeviceKind, useDeviceKind } from '../../apis/DeviceKind';
import Overlay from '../../primitives/Overlay';
import { DivViewBase } from '../web/ViewBase';
import { GetPopupPosition, PopoverProps } from './types';

export function Popover({
  anchorEl,
  children,
  onContentMouseDown,
  onRequestClose,
  placement,
  visible,
}: PopoverProps) {
  const deviceKind = useDeviceKind();

  const contentContainerRef = React.useRef<HTMLDivElement>(null);

  const updateContentContainerStyle = React.useCallback(() => {
    if (deviceKind === 'phone' || deviceKind === 'large-phone') {
      // We will display a full screen popup
      return;
    }
    if (!anchorEl || !contentContainerRef.current) return;
    const { top, left } = calculateContentContainerStyle(
      anchorEl,
      contentContainerRef.current,
      createGetPopupPositionFromPlacement(placement),
    );
    contentContainerRef.current.style.top = `${top}px`;
    contentContainerRef.current.style.left = `${left}px`;
    // Now that we know the exact position of the popup, we can show it
    contentContainerRef.current.style.opacity = '1';
  }, [anchorEl, deviceKind, placement]);

  // Update popup position upon open
  // 1. This component is re-rendered with visible = true
  // 2. Overlay element is added to the DOM but the content is invisible
  //    (opacity = 0)
  // 3. Effect runs and the style of the content container DOM element gets
  //    updated, making it visible in the right position
  const [prevVisible, setPrevVisible] = React.useState(visible);
  React.useEffect(() => {
    if (!prevVisible && visible) {
      updateContentContainerStyle();
    }
    if (visible !== prevVisible) {
      setPrevVisible(visible);
    }
  }, [prevVisible, visible, updateContentContainerStyle]);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      updateContentContainerStyle();
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateContentContainerStyle]);

  return (
    <Overlay color="transparent" onPress={onRequestClose} visible={visible}>
      <ContentContainer
        ref={contentContainerRef}
        onMouseDown={onContentMouseDown}
        $deviceKind={deviceKind}
      >
        {children}
      </ContentContainer>
    </Overlay>
  );
}

function calculateContentContainerStyle(
  anchorEl: HTMLElement,
  contentContainerEl: HTMLElement,
  getPopupPosition: GetPopupPosition,
): {
  top: number;
  left: number;
} {
  const anchorRect = anchorEl.getBoundingClientRect();
  const contentContainerRect = contentContainerEl.getBoundingClientRect();

  const popupPosition = getPopupPosition(anchorRect, contentContainerRect);
  const top = Math.min(
    Math.max(0, popupPosition.top),
    Math.floor(window.innerHeight - contentContainerRect.height),
  );
  const left = Math.min(
    Math.max(0, popupPosition.left),
    Math.floor(window.innerWidth - contentContainerRect.width),
  );
  return {
    top,
    left,
  };
}

function createGetPopupPositionFromPlacement(
  placement: PopoverProps['placement'],
): GetPopupPosition {
  if (!placement) {
    return (anchorRect) => ({
      top: anchorRect.top,
      left: anchorRect.left,
    });
  }
  return placement;
}

const ContentContainer = styled(DivViewBase)<{
  $deviceKind: DeviceKind;
}>`
  position: absolute;
  background-color: white;

  ${({ $deviceKind }) =>
    $deviceKind === 'desktop' || $deviceKind === 'tablet'
      ? `}
    border: 1px solid #ccc;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
    // hide popup initially until we know its exact position
    opacity: 0;
  `
      : `
    border-top: 1px solid #ccc;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.06);
    // grow from the bottom
    bottom: 0;
    left: 0;
    right: 0;
  `}
`;
