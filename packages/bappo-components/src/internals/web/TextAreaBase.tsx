import React from 'react';
import styled from 'styled-components';

import FontContext from '../../primitives/Font/FontContext';

type TextAreaBaseProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  accessibilityLabel?: string;
  testID?: string;
};

interface InternalProps {
  nativeRef: React.Ref<HTMLTextAreaElement>;
}

function TextAreaBase({
  accessibilityLabel,
  nativeRef,
  testID,
  ...props
}: TextAreaBaseProps & InternalProps) {
  return (
    <FontContext.Consumer>
      {({ fontFamily, fontSize }) => {
        return (
          <StyledTextArea
            {...props}
            aria-label={accessibilityLabel}
            data-testid={testID}
            ref={nativeRef as any}
            fontFamilyValue={fontFamily}
            fontSizeValue={fontSize}
          />
        );
      }}
    </FontContext.Consumer>
  );
}

export default React.forwardRef<HTMLTextAreaElement, TextAreaBaseProps>(
  (props, ref) => {
    return <TextAreaBase {...props} nativeRef={ref} />;
  },
);

const StyledTextArea = styled.textarea<{
  fontFamilyValue: string;
  fontSizeValue: number;
}>`
  appearance: none;
  background-color: transparent;
  border-color: black;
  border-radius: 0;
  border-width: 0;
  box-sizing: border-box;
  font-family: ${(props) => props.fontFamilyValue};
  font-size: ${(props) => props.fontSizeValue}px;
  padding: 0;
  outline: none;
  resize: none;
`;
