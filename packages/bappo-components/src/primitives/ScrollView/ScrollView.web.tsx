import * as React from 'react';

import { ScrollViewBase } from '../../internals/web/ScrollViewBase';
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
    const scrollableNodeRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
      scrollTo: (options: { x?: number; y?: number }) => {
        const { x, y } = options;

        if (scrollableNodeRef.current) {
          if (typeof x === 'number') {
            scrollableNodeRef.current.scrollLeft = x;
          }
          if (typeof y === 'number') {
            scrollableNodeRef.current.scrollTop = y;
          }
        }
      },
      scrollToEnd: () => {
        if (scrollableNodeRef.current) {
          if (horizontal) {
            scrollableNodeRef.current.scrollLeft =
              scrollableNodeRef.current.scrollWidth;
          } else {
            scrollableNodeRef.current.scrollTop =
              scrollableNodeRef.current.scrollHeight;
          }
        }
      },
    }));

    const props = {
      accessibilityLabel,
      className,
      horizontal,
      onContentSizeChange,
      onLayout,
      onScroll,
      scrollEventThrottle,
      style,
      contentContainerStyle,
      testID,
    };

    return (
      <ScrollViewBase {...props} ref={scrollableNodeRef}>
        {children}
      </ScrollViewBase>
    );
  },
);

export default ScrollView;
