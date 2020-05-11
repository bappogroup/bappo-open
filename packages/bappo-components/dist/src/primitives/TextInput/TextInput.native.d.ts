import React from 'react';
import { TextInputProps } from './types';
declare class TextInput extends React.Component<TextInputProps> {
    static defaultProps: {
        autoFocus: boolean;
        multiline: boolean;
        placeholder: string;
        readOnly: boolean;
        type: string;
    };
    static displayName: string;
    blur: () => void;
    clear: () => void;
    focus: () => void;
    render(): JSX.Element;
    private _input;
    private _captureInputRef;
    private _createBlurEventHandler;
    private _createFocusEventHandler;
}
export default TextInput;
