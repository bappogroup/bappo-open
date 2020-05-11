import React from 'react';
import { ViewLayoutEvent } from '../../events';
interface Props {
    accessibilityLabel?: string;
    children?: React.ReactNode;
    className?: string;
    component?: string;
    onLayout?: (event: ViewLayoutEvent) => void;
    style?: any;
    testID?: string;
}
declare const _default: React.ForwardRefExoticComponent<Props & React.RefAttributes<unknown>>;
export default _default;
