/// <reference types="react" />
import { TextProps } from '../types';
declare type Props = TextProps & {
    className?: string;
    ellipsis?: boolean;
};
export default function Text({ accessibilityLabel, children, className, numberOfLines, selectable, style, testID, ellipsis, }: Props): JSX.Element;
export {};
