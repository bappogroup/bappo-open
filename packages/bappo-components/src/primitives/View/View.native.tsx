import * as React from 'react';
import RN from 'react-native';

import { ViewProps } from './types';

const View = React.forwardRef(
  (
    {
      accessibilityLabel,
      children,
      className,
      onLayout,
      pointerEvents,
      style,
      testID,
    }: ViewProps,
    ref,
  ) => {
    const nativeViewRef = React.useRef<RN.View>(null);

    React.useImperativeHandle(ref, () => ({
      // To be able to use View inside TouchableHighlight/TouchableOpacity
      setNativeProps: (...args: Array<any>) =>
        nativeViewRef.current &&
        nativeViewRef.current.setNativeProps({ ...args }),
    }));

    const props = {
      accessibilityLabel,
      onLayout,
      pointerEvents,
      style,
      testID,
    };

    return (
      <RN.View {...props} ref={nativeViewRef}>
        {children}
      </RN.View>
    );
  },
);

export default View;
