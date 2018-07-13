// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import View from '../../primitives/View';
import Text from '../../primitives/Text';
import TouchableView from '../../primitives/TouchableView';

type Props = {
  options: Array<any>,
  selectedOptions: Array<any>,
  optionToString: any => string,
  selectItem: any => any,
  onChange: (Array<any>) => void,
};

const Picker = ({
  options,
  selectedOptions = [],
  onChange,
  optionToString,
}: Props) => {
  return (
    <StyledView>
      {options.map((option, i) => (
        <TabButton
          key={i}
          selected={selectedOptions.find(op => op === option) ? true : false}
          position={getPosition(i, options.length)}
          onPress={() => {
            let output;
            if (selectedOptions.find(item => item === option)) {
              output = selectedOptions.filter(item => item !== option);
            } else {
              output = [...selectedOptions, option];
            }
            onChange(output);
          }}
        >
          <Text key={option.value}>{optionToString(option)}</Text>
        </TabButton>
      ))}
    </StyledView>
  );
};

Picker.defaultProps = {};

export default Picker;

const StyledView = styled(View)`
  flex-direction: column;
  max-width: 400px;
`;

const TabButton = styled(TouchableView)`
  min-width: 50px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${props => (props.selected ? 'orange' : '#f8f8f8')};
  border-top-left-radius: ${props =>
    props.position === 'first' ? '4px' : '0px'};
  border-top-right-radius: ${props =>
    props.position === 'first' ? '4px' : '0px'};
  border-bottom-left-radius: ${props =>
    props.position === 'last' ? '4px' : '0px'};
  border-bottom-right-radius: ${props =>
    props.position === 'last' ? '4px' : '0px'};
  margin-bottom: 1px;
  align-items: center;
  justify-content: center;
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
