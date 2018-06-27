// @flow

import * as React from 'react';
import RN from 'react-native';
import styled from 'styled-components';
import type { TextInputProps } from './types.js.flow';

type Props = TextInputProps;

class TextInput extends React.Component<Props> {
  static defaultProps = {
    autoFocus: false,
    multiline: false,
    placeholder: '',
    readOnly: false,
    type: 'text',
  };

  static displayName = 'TextInput';

  props: Props;

  blur = () => {
    this._input && this._input.blur();
  };

  clear = () => {
    this._input && this._input.clear();
  };

  focus = () => {
    this._input && this._input.focus();
  };

  render() {
    const {
      accessibilityLabel,
      autoFocus,
      defaultValue,
      maxLength,
      multiline,
      onValueChange,
      placeholder,
      readOnly,
      style,
      testID,
      type,
      value,
    } = this.props;

    const props: Object = {
      accessibilityLabel,
      autoFocus,
      defaultValue,
      editable: !readOnly,
      innerRef: this._captureInputRef,
      maxLength,
      multiline,
      onChangeText: onValueChange,
      onEndEditing: this._createBlurEventHandler(),
      onFocus: this._createFocusEventHandler(),
      placeholder,
      style,
      testID,
      value,
      underlineColorAndroid: 'rgba(0, 0, 0, 0)',
    };

    // type specific props
    switch (type) {
      case 'email':
        Object.assign(props, {
          autoCapitalize: 'none',
          autoCorrect: false,
          keyboardType: 'email-address',
        });
        break;
      case 'number':
        Object.assign(props, {
          keyboardType: 'numeric',
        });
        break;
      case 'password':
        Object.assign(props, {
          autoCapitalize: 'none',
          autoCorrect: false,
          secureTextEntry: true,
        });
        break;
      case 'tel':
        Object.assign(props, {
          keyboardType: 'phone-pad',
        });
        break;
      default:
        break;
    }

    return <StyledTextInput {...props} />;
  }

  _input: ?React.ElementRef<typeof RN.TextInput>;

  _captureInputRef = (ref: ?React.ElementRef<typeof RN.TextInput>) => {
    this._input = ref;
  };

  _createBlurEventHandler = () => {
    const { onBlur } = this.props;

    if (onBlur) {
      return (event: Object) => {
        // eslint-disable-next-line no-param-reassign
        event.nativeEvent = {
          text: event.nativeEvent.text,
        };
        onBlur(event);
      };
    }
    return onBlur;
  };

  _createFocusEventHandler = () => {
    const { onFocus } = this.props;

    if (onFocus) {
      return (event: Object) => {
        // eslint-disable-next-line no-param-reassign
        event.nativeEvent = {
          text: event.nativeEvent.text,
        };
        onFocus(event);
      };
    }
    return onFocus;
  };
}

export default TextInput;

const StyledTextInput = styled.TextInput`
  font-family: 'Quicksand';
  font-size: 14px;
  height: ${({ multiline }) => (multiline ? '36' : '18')}px;
  margin: 0;
  padding: 0;
`;
