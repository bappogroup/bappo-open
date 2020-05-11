/// <reference types="react" />
declare class Icon {
    static create: (fontFamily: string, fontFileName: string, glyphMap: import("./types").GlyphMap) => ({ className, name, style }: import("./types").IconProps) => JSX.Element;
}
export default Icon;
