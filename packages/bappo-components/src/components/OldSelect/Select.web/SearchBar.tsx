import React from 'react';
import { BlurEvent } from 'src/events';
import styled from 'styled-components';

import { DivViewBase } from '../../../internals/web/ViewBase';
import ActivityIndicator from '../../../primitives/ActivityIndicator';
import Text from '../../../primitives/Text';
import TextInput from '../../../primitives/TextInput';
import { TextInputHandle } from '../../../primitives/TextInput/types';
import View from '../../../primitives/View';
import Icon from '../../Icon';

type Props = {
  autoFocus?: boolean;
  className?: string;
  /**
   * If true, the search bar is disabled.
   */
  disabled?: boolean;
  isLoading?: boolean;
  onInputBlur?: (event: BlurEvent) => void;
  /**
   * Callback that is called when the search text changes.
   */
  onInputChange?: (searchText: string) => void;
  /**
   * Callback that is called when search is performed.
   */
  onInputSubmit?: (searchText: string) => void;
  /**
   * Current search text.
   */
  searchText: string;
  style?: any;
};

export default function SearchBar({
  autoFocus,
  className,
  disabled,
  isLoading,
  onInputBlur,
  onInputChange,
  searchText,
  style,
}: Props) {
  const inputRef = React.useRef<TextInputHandle>(null);

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  return (
    <Container
      className={className}
      onClick={handleContainerPress}
      style={style}
      testID="select-searchbar-container"
    >
      <InnerContainer>
        <IconContainer>
          <Icon name="search" />
        </IconContainer>
        {disabled ? (
          <SearchText>{searchText}</SearchText>
        ) : (
          <StyledTextInput
            ref={inputRef}
            autoFocus={autoFocus}
            onBlur={onInputBlur}
            onValueChange={onInputChange}
            readOnly={disabled}
            testID="select-searchbar-textinput"
            value={searchText}
          />
        )}
        <SpinnerContainer>
          <ActivityIndicator animating={isLoading ?? false} />
        </SpinnerContainer>
      </InnerContainer>
    </Container>
  );
}

const Container = styled(DivViewBase)`
  flex: none;
  background-color: #eee;
  padding: 6px;
`;

const InnerContainer = styled(View)`
  flex-direction: row;
  background-color: #fff;
  height: 28px;
  border-width: 0;
  border-radius: 15px;
`;

const IconContainer = styled(View)`
  align-items: center;
  justify-content: center;
  background-color: transparent;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 8px;
`;

const SearchText = styled(Text).attrs({
  numberOfLines: 1,
})`
  margin-left: 32px;
`;

const SpinnerContainer = styled(View)`
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  font-size: 14px;
  margin-left: 32px;
`;
