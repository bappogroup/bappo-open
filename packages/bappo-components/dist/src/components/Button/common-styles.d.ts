import { ButtonContainerStyleProps } from './types';
export declare const buttonContainerStyle: import("styled-components").FlattenInterpolation<import("styled-components").ThemedStyledProps<ButtonContainerStyleProps, any>>[];
export declare const buttonTextStyle: import("styled-components").FlattenInterpolation<import("styled-components").ThemedStyledProps<Pick<ButtonContainerStyleProps, "type" | "loading" | "hasDisabledStyle">, any>>[];
export declare const ButtonLabel: import("styled-components").StyledComponentClass<import("../../primitives/Text/types").TextProps & {
    className?: string | undefined;
    ellipsis?: boolean | undefined;
} & Pick<ButtonContainerStyleProps, "type" | "loading" | "hasDisabledStyle">, any, Pick<import("../../primitives/Text/types").TextProps & {
    className?: string | undefined;
    ellipsis?: boolean | undefined;
}, "children" | "style" | "testID" | "className" | "accessibilityLabel" | "numberOfLines" | "selectable" | "ellipsis"> & {
    theme?: any;
} & Pick<ButtonContainerStyleProps, "type" | "loading" | "hasDisabledStyle">>;
export declare const SpinnerContainer: import("styled-components").StyledComponentClass<unknown, any, any>;
export declare const StyledIcon: import("styled-components").StyledComponentClass<import("../../apis/Icon/types").IconProps & import("../Icon/Icon").IconProps & Pick<ButtonContainerStyleProps, "type" | "loading" | "hasDisabledStyle">, any, Pick<import("../../apis/Icon/types").IconProps, "style" | "name" | "className"> & {
    theme?: any;
} & import("../Icon/Icon").IconProps & Pick<ButtonContainerStyleProps, "type" | "loading" | "hasDisabledStyle">>;
