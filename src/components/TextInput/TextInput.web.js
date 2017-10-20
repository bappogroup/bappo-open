// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import type {
  BlurEvent,
  FocusEvent,
} from '../../events.js.flow';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  /**
   * If true, focuses the input on componentDidMount. The default value is false.
   */
  autoFocus: ?boolean,
  className?: string,
  /**
   * Provides an initial value that will change when the user starts typing. Useful for simple
   * use-cases where you do not want to deal with listening to events and updating the value prop to
   * keep the controlled state in sync.
   */
  defaultValue?: string,
  /**
   * Limits the maximum number of characters that can be entered.
   */
  maxLength?: number,
  /**
   * If true, the text input can be multiple lines. The default value is false.
   */
  multiline: ?boolean,
  /**
   * Callback that is called when the text input is blurred.
   */
  onBlur?: ?(event: BlurEvent) => void,
  /**
   * Callback that is called when the text input is focused.
   */
  onFocus?: ?(event: FocusEvent) => void,
  /**
   * Callback that is called when the text input's text changes. Changed text is passed as an
   * argument to the callback handler.
   */
  onValueChange?: ?(value: string) => void,
  /**
   * The string that will be rendered before text input has been entered.
   */
  placeholder: string,
  /**
   * If true, text is not editable. The default value is false.
   */
  readOnly: ?boolean,
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
  /**
   * Input type. Only works with `multiline={false}`.
   */
  type: 'email' | 'password' | 'text',
  /**
   * The value to show for the text input. TextInput is a controlled component, which means the
   * native value will be forced to match this value prop if provided.
   */
  value?: string,
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

    return (
      <InputComponent
        {...props}
        {...styleProps}
      />
    );
  }

  _input: ?(HTMLInputElement | HTMLTextAreaElement);

  _captureInputRef = (ref: ?(HTMLInputElement | HTMLTextAreaElement)) => {
    this._input = ref;
  };

  _createBlurEventHandler = () => {
    const {
      onBlur,
    } = this.props;

    if (onBlur) {
      return (event: SyntheticFocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // eslint-disable-next-line no-param-reassign
        event.nativeEvent = {
          text: event.currentTarget.value,
        };
        onBlur(event);
      };
    }
    return onBlur;
  };

  _createChangeEventHandler = () => {
    const {
      onValueChange,
    } = this.props;

    if (onValueChange) {
      return (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onValueChange(event.currentTarget.value);
      };
    }
    return onValueChange;
  };

  _createFocusEventHandler = () => {
    const {
      onFocus,
    } = this.props;

    if (onFocus) {
      return (event: SyntheticFocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // eslint-disable-next-line no-param-reassign
        event.nativeEvent = {
          text: event.currentTarget.value,
        };
        onFocus(event);
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
  font-family: System;
  font-size: 14px;
  height: ${({ multiline }) => (multiline ? '36' : '18')}px;
  padding: 0;
  resize: none;
`;

const Input = styled.input`
  ${inputStyles}
`;

const TextArea = styled.textarea`
  ${inputStyles}
`;
