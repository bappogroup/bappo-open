import * as React from 'react';

import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';
import TouchableView from '../../primitives/TouchableView';
import View from '../../primitives/View';
import { ButtonCSS } from './styles';
import { TabPickerProps } from './types';

export default function Picker({
  options,
  selected = [],
  onChange,
  optionToString,
  multi = false,
  testID,
}: TabPickerProps) {
  return (
    <StyledView testID={testID}>
      {options.map((option, i) => {
        let isSelected: boolean;
        if (multi) isSelected = selected.includes(option);
        else isSelected = selected === option;
        return (
          <TabButton
            key={i}
            $isSelected={isSelected}
            $position={getPosition(i, options.length)}
            onPress={() => {
              let output;
              if (!multi) {
                output = option;
              } else {
                if (selected.includes(option)) {
                  output = selected.filter((item) => item !== option);
                } else {
                  output = [...selected, option];
                }
              }
              onChange(output);
            }}
          >
            <Text key={option.value}>{optionToString(option)}</Text>
          </TabButton>
        );
      })}
    </StyledView>
  );
}

const StyledView = styled(View)`
  flex-direction: column;
  max-width: 400px;
`;

const TabButton = styled(TouchableView)<{
  $isSelected: boolean;
  $position: string;
}>`
  min-width: 50px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? 'orange' : '#f8f8f8'};
  border-top-left-radius: ${({ $position }) =>
    $position === 'first' ? '4px' : '0px'};
  border-top-right-radius: ${({ $position }) =>
    $position === 'first' ? '4px' : '0px'};
  border-bottom-left-radius: ${({ $position }) =>
    $position === 'last' ? '4px' : '0px'};
  border-bottom-right-radius: ${({ $position }) =>
    $position === 'last' ? '4px' : '0px'};
  margin-bottom: 1px;
  align-items: center;
  justify-content: center;
  ${(props) => ButtonCSS(props)};
`;

const getPosition = (pos, length) => {
  if (pos === 0) {
    return 'first';
  }
  if (pos === length - 1) {
    return 'last';
  }
  return 'middle';
};
