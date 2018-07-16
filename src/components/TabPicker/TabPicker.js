// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import View from '../../primitives/View';
import Text from '../../primitives/Text';
import TouchableView from '../../primitives/TouchableView';
import { ButtonCSS } from './styles';

type Props = {
  options: Array<any>,
  selected: Array<any>,
  optionToString: any => string,
  selectItem: any => any,
  onChange: (Array<any>) => void,
  multi?: boolean,
};

const Picker = ({
  options,
  selected = [],
  onChange,
  optionToString,
  multi = false,
}: Props) => {
  const _selected = multi ? selected : [selected];
  return (
    <StyledView>
      {options.map((option, i) => {
        let isSelected;
        if (multi)
          isSelected = selected.find(op => op === option) ? true : false;
        else isSelected = selected === option;
        return (
          <TabButton
            key={i}
            isSelected={isSelected}
            position={getPosition(i, options.length)}
            onPress={() => {
              let output;
              if (!multi) {
                output = option;
              } else {
                if (selected.find(item => item === option)) {
                  output = selected.filter(item => item !== option);
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
  background-color: ${props => (props.isSelected ? 'orange' : '#f8f8f8')};
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
  ${props => ButtonCSS(props)};
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
