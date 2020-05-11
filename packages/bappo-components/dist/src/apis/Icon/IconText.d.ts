declare const IconText: import("styled-components").StyledComponentClass<import("../../primitives/Text/types").TextProps & {
    className?: string | undefined;
    ellipsis?: boolean | undefined;
} & {
    fontFamilyValue: string;
}, any, Pick<import("../../primitives/Text/types").TextProps & {
    className?: string | undefined;
    ellipsis?: boolean | undefined;
}, "children" | "style" | "testID" | "className" | "accessibilityLabel" | "numberOfLines" | "selectable" | "ellipsis"> & {
    theme?: any;
} & {
    fontFamilyValue: string;
}>;
export default IconText;
