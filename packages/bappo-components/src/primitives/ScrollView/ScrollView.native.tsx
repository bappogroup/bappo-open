import * as React from 'react';
import RN from 'react-native';

import { ScrollViewProps } from './types';

const ScrollView = React.forwardRef(
  (
    {
      accessibilityLabel,
      children,
      horizontal,
      onLayout,
      style,
      contentContainerStyle,
      testID,
      onScroll,
      onContentSizeChange,
      scrollEventThrottle = 16,
    }: ScrollViewProps,
    ref,
  ) => {
    React.useImperativeHandle(ref, () => ({
      scrollTo: (options: { x?: number; y?: number }) => {
        scrollableNodeRef &&
          scrollableNodeRef.current &&
          scrollableNodeRef.current.scrollTo(options);
      },
      scrollToEnd: () => {
        if (scrollableNodeRef && scrollableNodeRef.current) {
          scrollableNodeRef &&
            scrollableNodeRef.current &&
            scrollableNodeRef.current.scrollToEnd();
        }
      },
    }));

    const scrollableNodeRef = React.useRef<RN.ScrollView>();

    const props: RN.ScrollViewProps = {
      accessibilityLabel,
      horizontal,
      keyboardDismissMode: 'on-drag',
      keyboardShouldPersistTaps: 'handled',
      onContentSizeChange,
      onLayout,
      onScroll,
      scrollEventThrottle,
      style,
      contentContainerStyle,
      testID,
    };

    return (
      <RN.ScrollView {...props} ref={scrollableNodeRef as any}>
        {children}
      </RN.ScrollView>
    );
  },
);

export default ScrollView;
