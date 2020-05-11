import React from 'react';
import { IconProps } from '../Icon/Icon';
interface IconButtonProps extends IconProps {
    onPress?: () => void;
    tooltip?: string;
}
declare const IconButton: React.FC<IconButtonProps>;
export default IconButton;
