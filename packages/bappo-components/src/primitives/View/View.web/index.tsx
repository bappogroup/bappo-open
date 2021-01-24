import * as React from 'react';
import styled from 'styled-components';

import { DivViewBase } from '../../../internals/web/ViewBase';
import { ViewProps } from '../types';

export default function View({
  accessibilityLabel,
  children,
  className,
  onLayout,
  pointerEvents,
  style,
  testID,
}: ViewProps) {
  const styleProps = {
    className,
    $pointerEvents: pointerEvents,
    style,
  };

  return (
    <StyledViewBase
      {...styleProps}
      accessibilityLabel={accessibilityLabel}
      onLayout={onLayout}
      testID={testID}
    >
      {children}
    </StyledViewBase>
  );
}

const pointerEventsAuto = `
  pointer-events: auto;
`;

const pointerEventsBoxNone = `
  pointer-events: none;
  * {
    pointer-events: all;
  }
`;

const pointerEventsBoxOnly = `
  pointer-events: all;
  * {
    pointer-events: none;
  }
`;

const pointerEventsNone = `
  pointer-events: none;
  * {
    pointer-events: none;
  }
`;

const StyledViewBase = styled(DivViewBase)<{
  $pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
}>`
  ${({ $pointerEvents }) => {
    if ($pointerEvents === 'auto') {
      return pointerEventsAuto;
    } else if ($pointerEvents === 'none') {
      return pointerEventsNone;
    } else if ($pointerEvents === 'box-none') {
      return pointerEventsBoxNone;
    } else if ($pointerEvents === 'box-only') {
      return pointerEventsBoxOnly;
    }
    return '';
  }};
`;
