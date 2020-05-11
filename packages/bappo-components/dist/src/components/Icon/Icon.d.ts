import { IconProps as BaseIconProps } from '../../apis/Icon/types';
export interface IconProps extends BaseIconProps {
    color?: string;
    size?: number | 'small' | 'medium' | 'large';
}
declare const Icon: import("styled-components").StyledComponentClass<BaseIconProps & IconProps, any, Pick<BaseIconProps, "style" | "name" | "className"> & {
    theme?: any;
} & IconProps>;
export default Icon;
