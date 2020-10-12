// @ts-ignore
import invariant from 'fbjs/lib/invariant';
import React from 'react';
import styled from 'styled-components';

import InputBase from '../../internals/web/InputBase';
import TextAreaBase from '../../internals/web/TextAreaBase';
import FontContext from '../Font/FontContext';
import { TextInputProps } from './types';

type Props = TextInputProps & {
  // Will be removed
  className?: string;
};

class TextInput extends React.Component<Props> {
  static defaultProps = {
    autoFocus: false,
    multiline: false,
    placeholder: '',
    readOnly: false,
    type: 'text',
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  static displayName = 'TextInput';

  public blur() {
    this._input && this._input.blur();
  }

  public clear() {
    if (this._input) {
      this._input.value = '';
    }
  }

  public focus() {
    this._input && this._input.focus();
  }

  static getDerivedStateFromProps(nextProps: Props) {
    TextInput._checkProps(nextProps);
    return null;
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      setTimeout(() => this.focus());
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
      accessibilityLabel,
      autoComplete: 'off',
      defaultValue,
      dir: 'auto',
      ref: this._captureInputRef,
      maxLength,
      onBlur: this._createBlurEventHandler(),
      onChange: this._createChangeEventHandler(),
      onFocus: this._createFocusEventHandler(),
      placeholder,
      readOnly,
      testID,
      type,
      value: value || '',
    };

    return (
      <FontContext.Consumer>
        {({ fontFamily, fontSize }) => {
          const styleProps = {
            className,
            multiline,
            style,
            $fontFamily: fontFamily,
            $fontSize: fontSize,
          };
          //@ts-ignore
          return <InputComponent {...props} {...styleProps} />;
        }}
      </FontContext.Consumer>
    );
  }

  private _input: HTMLInputElement | HTMLTextAreaElement | null = null;

  private static _checkProps(props: Props) {
    const { multiline, type } = props;

    invariant(
      !(multiline && type !== 'text'),
      'Only type="text" is supported for multiline TextInput',
    );
  }

  private _captureInputRef = (
    ref: HTMLInputElement | HTMLTextAreaElement | null,
  ) => {
    this._input = ref;
  };

  private _createBlurEventHandler = () => {
    const { onBlur } = this.props;

    if (onBlur) {
      return (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  private _createChangeEventHandler = () => {
    const { onValueChange } = this.props;

    if (onValueChange) {
      return (event: any) => {
        onValueChange(event.currentTarget.value);
      };
    }
    return onValueChange;
  };

  private _createFocusEventHandler = () => {
    const { onFocus } = this.props;

    if (onFocus) {
      return (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
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

type InputProps = {
  $fontFamily: string;
  $fontSize: string;
};

const Input = styled(InputBase)<InputProps>`
  font-family: ${(props) => props.$fontFamily};
  font-size: ${(props) => props.$fontSize}px;
`;

const TextArea = styled(TextAreaBase).attrs({
  rows: 5,
})`
  font-family: ${(props: InputProps) => props.$fontFamily};
  font-size: ${(props) => props.$fontSize}px;
  height: 18px;
  padding: 8px 0px;
`;
