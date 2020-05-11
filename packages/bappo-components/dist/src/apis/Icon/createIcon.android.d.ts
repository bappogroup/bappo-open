/// <reference types="react" />
import { IconProps, GlyphMap } from './types';
declare const createIcon: (fontFamily: string, fontFileName: string, glyphMap: GlyphMap) => ({ name, style }: IconProps) => JSX.Element;
export default createIcon;
