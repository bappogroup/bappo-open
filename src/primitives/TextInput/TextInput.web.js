// @flow

import * as React from 'react';
import invariant from 'fbjs/lib/invariant';
import styled, { css } from 'styled-components';
import type { TextInputProps } from './types.js.flow';

type Props = TextInputProps & {
  // Will be removed
  className?: string,
};

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
    if (this._input) {
      this._input.value = '';
    }
  };

  focus = () => {
    this._input && this._input.focus();
  };

  constructor(props: Props) {
    super(props);

    this.constructor._checkProps(this.props);
  }

  static getDerivedStateFromProps(nextProps: Props) {
    TextInput._checkProps(nextProps);
    return null;
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  render() {
    const {
      accessibilityLabel,
      className,
      defaultValue,
      placeholder,
      maxLength,
      multiline,
      readOnly,
      style,
      testID,
      type,
      value,
    } = this.props;

    const InputComponent = multiline ? TextArea : Input;

    const props = {
      defaultValue,
      dir: 'auto',
      innerRef: this._captureInputRef,
      maxLength,
      onBlur: this._createBlurEventHandler(),
      onChange: this._createChangeEventHandler(),
      onFocus: this._createFocusEventHandler(),
      placeholder,
      readOnly,
      type,
      value,
      'aria-label': accessibilityLabel,
      'data-testid': testID,
    };

    const styleProps = {
      className,
      multiline,
      style,
    };

    return <InputComponent {...props} {...styleProps} />;
  }

  static _checkProps(props: Props) {
    const { multiline, type } = props;

    invariant(
      !(multiline && type !== 'text'),
      'Only type="text" is supported for multiline TextInput',
    );
  }

  _input: ?(HTMLInputElement | HTMLTextAreaElement);

  _captureInputRef = (ref: ?(HTMLInputElement | HTMLTextAreaElement)) => {
    this._input = ref;
  };

  _createBlurEventHandler = () => {
    const { onBlur } = this.props;

    if (onBlur) {
      return (
        event: SyntheticFocusEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        onBlur({
          nativeEvent: {
            text: event.currentTarget.value,
          },
        });
      };
    }
    return onBlur;
  };

  _createChangeEventHandler = () => {
    const { onValueChange } = this.props;

    if (onValueChange) {
      return (
        event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        onValueChange(event.currentTarget.value);
      };
    }
    return onValueChange;
  };

  _createFocusEventHandler = () => {
    const { onFocus } = this.props;

    if (onFocus) {
      return (
        event: SyntheticFocusEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        onFocus({
          nativeEvent: {
            text: event.currentTarget.value,
          },
        });
      };
    }
    return onFocus;
  };
}

export default TextInput;

const inputStyles = css`
  appearance: none;
  background-color: transparent;
  border-color: black;
  border-radius: 0;
  border-width: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  height: ${({ multiline }) => (multiline ? '36' : '18')}px;
  padding: 0;
  outline: none;
  resize: none;
`;

const Input = styled.input`
  ${inputStyles};
`;

const TextArea = styled.textarea`
  ${inputStyles};
`;
