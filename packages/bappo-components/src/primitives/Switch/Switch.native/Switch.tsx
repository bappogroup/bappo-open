import * as React from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';

import { InputHandle } from '../../../input-handle';
import { SwitchProps } from '../types';

const Switch = React.forwardRef(
  (
    {
      accessibilityLabel,
      disabled = false,
      onBlur,
      onFocus,
      onValueChange,
      style,
      testID,
      value = false,
    }: SwitchProps,
    ref: React.Ref<InputHandle>,
  ) => {
    const containerRef = React.useRef<TouchableOpacity>(null);

    React.useImperativeHandle(ref, () => ({
      focus: () => containerRef.current?.focus(),
      blur: () => containerRef.current?.blur(),
    }));

    const toggleHandleLeft = React.useRef(new Animated.Value(2));

    const [prevValue, setPrevValue] = React.useState(value);

    React.useEffect(() => {
      if (!!value !== !!prevValue) {
        Animated.timing(toggleHandleLeft.current, {
          toValue: value ? 26 : 2,
          duration: 200,
        }).start();

        setPrevValue(value);
      }
    }, [value, prevValue]);

    const _onBlur = (_event: NativeSyntheticEvent<TargetedEvent>) => {
      onBlur?.({
        nativeEvent: {
          value,
        },
      });
    };

    const _onFocus = (_event: NativeSyntheticEvent<TargetedEvent>) => {
      onFocus?.({
        nativeEvent: {
          value,
        },
      });
    };

    const _onKeyPress = (event: React.KeyboardEvent<TouchableOpacity>) => {
      const ENTER = 13;
      const SPACE = 32;

      if (event.which === ENTER || event.which === SPACE) {
        event.preventDefault();
        event.stopPropagation();
        _toggle();
      }
    };

    const _toggle = () => !disabled && onValueChange?.(!value);

    const props = {
      accessibilityLabel,
      onPress: _toggle,
      onBlur: _onBlur,
      onFocus: _onFocus,
      onKeyPress: _onKeyPress,
      testID,
    };

    const styleProps = {
      style,
      $value: !!value,
    };

    return (
      <SwitchContainer ref={containerRef} {...props} {...styleProps}>
        <Animated.View
          style={[styles.handle, { left: toggleHandleLeft.current }]}
        />
      </SwitchContainer>
    );
  },
);

export default Switch;

const SwitchContainer = styled(TouchableOpacity).attrs((_props) => ({
  activeOpacity: 1,
}))<{ $value: boolean }>`
  flex: none;
  flex-direction: row;
  background-color: ${({ $value }) => ($value ? '#FF7800' : '#B0ADAB')};
  border-radius: 12px;
  height: 24px;
  width: 48px;
`;

const styles = StyleSheet.create({
  handle: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 20,
    width: 20,
    position: 'absolute',
    top: 2,
    bottom: 2,
  },
});
