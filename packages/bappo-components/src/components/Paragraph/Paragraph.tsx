import * as React from 'react';

import { StyledText } from './styles';
import { ParagraphProps } from './types';

/**
 * Fixed height text component, no matter there's content or not
 * Reserve 1 line of space by default, and increase height if needed
 */
export default function Paragraph({
  children,
  type = 'default',
  testID,
}: ParagraphProps) {
  return (
    <StyledText selectable $type={type} testID={testID}>
      {children}
    </StyledText>
  );
}
