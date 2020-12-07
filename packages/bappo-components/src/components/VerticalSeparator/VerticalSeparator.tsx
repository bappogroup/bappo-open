import * as React from 'react';

import { styled } from '../../apis/Style';
import View from '../../primitives/View';
import { VerticalSeparatorProps } from './types';

type Props = VerticalSeparatorProps & {
  className?: string;
};

export default function VerticalSeparator({ className, style, testID }: Props) {
  return <StyledView className={className} style={style} testID={testID} />;
}

const StyledView = styled(View)`
  border-width: 0px;
  border-style: solid;
  border-left-width: 1px;
  border-left-color: rgba(0, 0, 0, 0.12);
  margin-left: 8px;
  margin-right: 8px;
`;
