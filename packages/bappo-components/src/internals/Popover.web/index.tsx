import React from 'react';
import styled from 'styled-components';

import Overlay from '../../primitives/Overlay';
import { DivViewBase } from '../web/ViewBase';
import { PopoverProps } from './types';

export function Popover({
  anchorEl,
  children,
  onContentMouseDown,
  onRequestClose,
  visible,
}: PopoverProps) {
  const contentContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (visible && anchorEl && contentContainerRef.current) {
      const { top, left } = calculateContentContainerStyle(
        anchorEl,
        contentContainerRef.current,
      );
      if (top != null) {
        contentContainerRef.current.style.top = `${top}px`;
      }
      if (left != null) {
        contentContainerRef.current.style.left = `${left}px`;
      }
      contentContainerRef.current.style.opacity = '1';
    }
  }, [anchorEl, visible]);

  return (
    <Overlay color="transparent" onPress={onRequestClose} visible={visible}>
      <ContentContainer
        ref={contentContainerRef}
        onMouseDown={onContentMouseDown}
      >
        {children}
      </ContentContainer>
    </Overlay>
  );
}

function calculateContentContainerStyle(
  anchorEl: HTMLElement,
  contentContainerEl: HTMLElement,
): {
  top?: number;
  left?: number;
} {
  const anchorRect = anchorEl.getBoundingClientRect();
  const contentContainerRect = contentContainerEl.getBoundingClientRect();

  const top = Math.min(
    Math.max(0, anchorRect.top),
    Math.floor(window.innerHeight - contentContainerRect.height),
  );
  const left = Math.min(
    Math.max(0, anchorRect.left),
    Math.floor(window.innerWidth - contentContainerRect.width),
  );
  return {
    top,
    left,
  };
}

const ContentContainer = styled(DivViewBase)`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  opacity: 0;
`;
