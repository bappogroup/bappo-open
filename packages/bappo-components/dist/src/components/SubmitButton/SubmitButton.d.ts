/// <reference types="react" />
import { SubmitButtonProps } from './types';
declare type Props = SubmitButtonProps & {
    className?: string;
};
declare const SubmitButton: ({ className, disabled, icon, iconStyle, style, textStyle, testID, text, type, }: Props) => JSX.Element;
export default SubmitButton;
