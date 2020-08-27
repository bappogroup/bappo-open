import React from 'react';
import RN from 'react-native';
import styled from 'styled-components';

import FontContext from '../Font/FontContext';
import { TextInputProps } from './types';

class TextInput extends React.Component<TextInputProps> {
  static defaultProps = {
    autoFocus: false,
    multiline: false,
    placeholder: '',
    readOnly: false,
    type: 'text',
  };

  static displayName = 'TextInput';

  public blur = () => {
    this._input && this._input.blur();
  };

  public clear = () => {
    this._input && this._input.clear();
  };

  public focus = () => {
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

    const props = {
      accessibilityLabel,
      autoFocus,
      defaultValue,
      editable: !readOnly,
      ref: this._captureInputRef,
      maxLength,
      multiline,
      onChangeText: onValueChange || undefined,
      onEndEditing: this._createBlurEventHandler(),
      onFocus: this._createFocusEventHandler(),
      placeholder,
      style,
      testID,
      value: value || '',
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

    return (
      <FontContext.Consumer>
        {({ fontFamily, fontSize }) => {
          return (
            <StyledTextInput
              {...props}
              $fontFamily={fontFamily}
              $fontSize={fontSize}
            />
          );
        }}
      </FontContext.Consumer>
    );
  }

  private _input: RN.TextInput | null = null;

  private _captureInputRef = (ref: RN.TextInput | null) => {
    this._input = ref;
  };

  private _createBlurEventHandler = () => {
    const { onBlur } = this.props;

    if (onBlur) {
      return (event: any) => {
        event.nativeEvent = {
          text: event.nativeEvent.text,
        };
        onBlur(event);
      };
    }
    return onBlur || undefined;
  };

  private _createFocusEventHandler = () => {
    const { onFocus } = this.props;

    if (onFocus) {
      return (event: any) => {
        event.nativeEvent = {
          text: event.nativeEvent.text,
        };
        onFocus(event);
      };
    }
    return onFocus || undefined;
  };
}

export default TextInput;

const StyledTextInput = styled(RN.TextInput)<{
  $fontFamily: string;
  $fontSize: number;
}>`
  font-family: ${(props) => props.$fontFamily};
  font-size: ${(props) => props.$fontSize}px;
  height: ${({ multiline }) => (multiline ? '36' : '18')}px;
  margin: 0;
  padding: ${({ multiline }) => (multiline ? '8px 0px' : '0')};
`;
