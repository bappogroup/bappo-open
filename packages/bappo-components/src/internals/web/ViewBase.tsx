// Implementation based on https://github.com/necolas/react-native-web/blob/0.15.0/packages/react-native-web/src/exports/View/index.js
import React, { useRef } from 'react';
import useElementLayout from 'react-native-web/dist/cjs/modules/useElementLayout';
import useMergeRefs from 'react-native-web/dist/cjs/modules/useMergeRefs';
import useResponderEvents from 'react-native-web/dist/cjs/modules/useResponderEvents';
import styled from 'styled-components';

import { ViewLayoutEvent } from '../../events';
import { flex } from './styles';

type ViewBaseProps<
  T extends keyof JSX.IntrinsicElements
> = JSX.IntrinsicElements[T] & {
  accessibilityLabel?: string;
  onLayout?: (event: ViewLayoutEvent) => void;
  ref?: React.Ref<HTMLElement>;
  testID?: string;
};

type InternalProps<T extends keyof JSX.IntrinsicElements> = ViewBaseProps<T> & {
  onMoveShouldSetResponder?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onMoveShouldSetResponderCapture?: (
    event: React.SyntheticEvent<HTMLElement>,
  ) => void;
  onResponderEnd?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onResponderGrant?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onResponderMove?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onResponderReject?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onResponderRelease?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onResponderStart?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onResponderTerminate?: (event: React.SyntheticEvent<HTMLElement>) => void;
  onResponderTerminationRequest?: (
    event: React.SyntheticEvent<HTMLElement>,
  ) => boolean;
  onScrollShouldSetResponder?: (
    event: React.SyntheticEvent<HTMLElement>,
  ) => boolean;
  onScrollShouldSetResponderCapture?: (
    event: React.SyntheticEvent<HTMLElement>,
  ) => boolean;
  onSelectionChangeShouldSetResponder?: (
    event: React.SyntheticEvent<HTMLElement>,
  ) => boolean;
  onSelectionChangeShouldSetResponderCapture?: (
    event: React.SyntheticEvent<HTMLElement>,
  ) => boolean;
  onStartShouldSetResponder?: (
    event: React.SyntheticEvent<HTMLElement>,
  ) => boolean;
  onStartShouldSetResponderCapture?: (
    event: React.SyntheticEvent<HTMLElement>,
  ) => boolean;
};

export function createViewBase<T extends keyof JSX.IntrinsicElements>(
  component: T,
): React.ComponentType<ViewBaseProps<T>> {
  const ViewBase = React.forwardRef(function ViewBase<
    T extends keyof JSX.IntrinsicElements
  >(
    {
      accessibilityLabel,
      children,
      onLayout,
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
      testID,
      ...rest
    }: InternalProps<T>,
    forwardedRef: React.Ref<HTMLElement>,
  ) {
    const hostRef = useRef<HTMLElement>(null);

    useElementLayout(hostRef, onLayout);
    useResponderEvents(hostRef, {
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onScrollShouldSetResponder,
      onScrollShouldSetResponderCapture,
      onSelectionChangeShouldSetResponder,
      onSelectionChangeShouldSetResponderCapture,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
    });

    const setRef = useMergeRefs(hostRef, forwardedRef);
    const supportedProps = {
      ...rest,
      'aria-label': accessibilityLabel,
      'data-testid': testID,
      ref: setRef,
    };

    return React.createElement(component, supportedProps, children);
  });

  const StyledViewBase = styled(ViewBase)`
    ${flex};
  `;

  return StyledViewBase as any;
}

export const DivViewBase = createViewBase('div');
