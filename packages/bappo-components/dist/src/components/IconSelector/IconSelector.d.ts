import React from 'react';
interface IconSelectorProps {
    size?: number;
    color?: string;
    value?: string;
    onValueChange: (value: string) => void;
}
declare const IconSelector: React.FC<IconSelectorProps>;
export default IconSelector;
