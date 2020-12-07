import * as React from 'react';

import { StyledView } from './styles';
import { SeparatorProps } from './types';

type Props = SeparatorProps & {
  className?: string;
};

export default function Separator({ className, style, testID }: Props) {
  return <StyledView className={className} style={style} testID={testID} />;
}
