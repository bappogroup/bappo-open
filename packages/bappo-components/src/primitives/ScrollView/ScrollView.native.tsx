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
    const scrollableNodeRef = React.useRef<RN.ScrollView>(null);

    React.useImperativeHandle(ref, () => ({
      scrollTo: (options: { x?: number; y?: number }) => {
        scrollableNodeRef.current?.scrollTo(options);
      },
      scrollToEnd: () => {
        scrollableNodeRef.current?.scrollToEnd();
      },
    }));

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
      <RN.ScrollView {...props} ref={scrollableNodeRef}>
        {children}
      </RN.ScrollView>
    );
  },
);

export default ScrollView;
