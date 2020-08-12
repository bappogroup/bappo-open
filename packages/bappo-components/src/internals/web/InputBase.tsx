import React from 'react';
import styled from 'styled-components';

import FontContext from '../../primitives/Font/FontContext';

type InputBaseProps = React.HTMLAttributes<HTMLInputElement> & {
  accessibilityLabel?: string;
  testID?: string;
};

interface InternalProps {
  nativeRef: React.Ref<HTMLInputElement>;
}

function InputBase({
  accessibilityLabel,
  nativeRef,
  testID,
  ...props
}: InputBaseProps & InternalProps) {
  return (
    <FontContext.Consumer>
      {({ fontFamily, fontSize }) => {
        return (
          <StyledInput
            {...props}
            aria-label={accessibilityLabel}
            data-testid={testID}
            ref={nativeRef as any}
            $fontFamilyValue={fontFamily}
            $fontSizeValue={fontSize}
          />
        );
      }}
    </FontContext.Consumer>
  );
}

export default React.forwardRef<HTMLInputElement, InputBaseProps>(
  (props, ref) => {
    return <InputBase {...props} nativeRef={ref} />;
  },
);

const StyledInput = styled.input<{
  $fontFamilyValue: string;
  $fontSizeValue: number;
}>`
  appearance: none;
  background-color: transparent;
  border-color: black;
  border-radius: 0;
  border-width: 0;
  box-sizing: border-box;
  font-family: ${(props) => props.$fontFamilyValue};
  font-size: ${(props) => props.$fontSizeValue}px;
  padding: 0;
  outline: none;
  resize: none;
`;
