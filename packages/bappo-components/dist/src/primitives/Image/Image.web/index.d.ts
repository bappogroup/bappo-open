/// <reference types="react" />
import { ImageProps } from '../types';
interface Props extends ImageProps {
    className?: string;
}
export default function Image({ accessibilityLabel, className, source, style, testID, }: Props): JSX.Element;
export {};
