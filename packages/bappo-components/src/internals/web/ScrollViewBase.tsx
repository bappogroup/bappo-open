import throttle from 'lodash/throttle';
import * as React from 'react';
import styled from 'styled-components';

import { ViewLayoutEvent } from '../../events';
import { ScrollViewProps } from '../../primitives/ScrollView/types';
import { DivViewBase } from './ViewBase';

type Props = ScrollViewProps & {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};

export const ScrollViewBase = React.forwardRef(
  (
    {
      accessibilityLabel,
      children,
      className,
      horizontal,
      onLayout,
      style,
      contentContainerStyle,
      testID,
      onScroll,
      onContentSizeChange,
      scrollEventThrottle = 16,
    }: Props,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const styleProps = {
      className,
      $horizontal: horizontal,
      style,
    };

    const onContentLayout = (event: ViewLayoutEvent) => {
      const { width, height } = event.nativeEvent.layout;

      onContentSizeChange && onContentSizeChange(width, height);
    };

    const _onScroll = (event: React.SyntheticEvent<HTMLDivElement>) => {
      event.persist();
      onScrollThrottled(event);
    };

    const onScrollThrottled = throttle(
      (event: React.SyntheticEvent<HTMLDivElement>) => {
        onScroll &&
          onScroll({
            nativeEvent: {
              contentOffset: {
                x: event.currentTarget.scrollLeft,
                y: event.currentTarget.scrollTop,
              },
              contentSize: {
                height: event.currentTarget.scrollHeight,
                width: event.currentTarget.scrollWidth,
              },
              layoutMeasurement: {
                height: event.currentTarget.offsetHeight,
                width: event.currentTarget.offsetWidth,
              },
            },
            timeStamp: Date.now(),
          });
      },
      scrollEventThrottle,
    );

    return (
      <ScrollContainer
        {...styleProps}
        accessibilityLabel={accessibilityLabel}
        ref={ref}
        onLayout={onLayout}
        onScroll={_onScroll}
        testID={testID}
      >
        <ContentContainer
          $horizontal={horizontal}
          onLayout={onContentLayout}
          style={contentContainerStyle}
        >
          {children}
        </ContentContainer>
      </ScrollContainer>
    );
  },
);

const ScrollContainer = styled(DivViewBase)<{ $horizontal?: boolean }>`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);

  ${({ $horizontal }) =>
    $horizontal &&
    `
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  `};
`;

const ContentContainer = styled(DivViewBase)<{ $horizontal?: boolean }>`
  ${({ $horizontal }) =>
    $horizontal
      ? `
    flex-direction: row;
    min-width: 100%;
  `
      : `
    min-height: 100%;
  `};
`;
