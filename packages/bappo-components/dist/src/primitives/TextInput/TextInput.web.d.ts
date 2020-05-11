import React from 'react';
import { TextInputProps } from './types';
declare type Props = TextInputProps & {
    className?: string;
};
declare class TextInput extends React.Component<Props> {
    static defaultProps: {
        autoFocus: boolean;
        multiline: boolean;
        placeholder: string;
        readOnly: boolean;
        type: string;
    };
    static displayName: string;
    blur(): void;
    clear(): void;
    focus(): void;
    static getDerivedStateFromProps(nextProps: Props): null;
    componentDidMount(): void;
    render(): JSX.Element;
    private _input;
    private static _checkProps;
    private _captureInputRef;
    private _createBlurEventHandler;
    private _createChangeEventHandler;
    private _createFocusEventHandler;
}
export default TextInput;
