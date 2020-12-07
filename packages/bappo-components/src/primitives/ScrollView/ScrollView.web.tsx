import throttle from 'lodash/throttle';
import * as React from 'react';
import styled from 'styled-components';

import { ViewLayoutEvent } from '../../events';
import { DivViewBase } from '../../internals/web/ViewBase';
import { ScrollViewProps } from './types';

type Props = ScrollViewProps & {
  className?: string;
};

const ScrollView = React.forwardRef(
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
    ref,
  ) => {
    React.useImperativeHandle(ref, () => ({
      scrollTo: (options: { x?: number; y?: number }) => {
        const { x, y } = options;

        if (scrollableNodeRef && scrollableNodeRef.current) {
          if (typeof x === 'number') {
            scrollableNodeRef.current.scrollLeft = x;
          }
          if (typeof y === 'number') {
            scrollableNodeRef.current.scrollTop = y;
          }
        }
      },
      scrollToEnd: () => {
        if (scrollableNodeRef && scrollableNodeRef.current) {
          scrollableNodeRef.current.scrollTop =
            scrollableNodeRef.current.scrollHeight;
        }
      },
    }));

    const scrollableNodeRef = React.useRef<HTMLDivElement>(null);

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
        ref={scrollableNodeRef}
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

export default ScrollView;

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
