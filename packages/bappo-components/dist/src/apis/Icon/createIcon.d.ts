/// <reference types="react" />
import { IconProps, GlyphMap } from './types';
declare const createIcon: (fontFamily: string, fontFileName: string, glyphMap: GlyphMap) => ({ className, name, style }: IconProps) => JSX.Element;
export default createIcon;
