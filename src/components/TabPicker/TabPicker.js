// @flow

import * as React from 'react';
import { styled } from '../../apis/Style';
import View from '../../primitives/View';
import Text from '../../primitives/Text';
import TouchableView from '../../primitives/TouchableView';

type Props = {
  children?: string,
};

const Picker = ({ options, selected, onChange }: Props) => {
  return (
    <StyledView>
      {options.map((option, i) => (
        <TabButton
          selected={selected[option.value]}
          position={getPosition(i, options.length)}
          onPress={() => {
            const s = { ...selected };
            s[option.value] = s[option.value] || false;
            s[option.value] = !s[option.value];
            onChange(s);
          }}
        >
          <Text key={option.value}>{option.label}</Text>
        </TabButton>
      ))}
    </StyledView>
  );
};

Picker.defaultProps = {};

export default Picker;

const StyledView = styled(View)`
  border-radius: 3px;
  background: #fff;
  flex-direction: row;
`;

const TabButton = styled(TouchableView)`
  min-width: 50px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${props => (props.selected ? 'orange' : '#f8f8f8')};
  border-top-left-radius: ${props =>
    props.position === 'first' ? '4px' : '0px'};
  border-bottom-left-radius: ${props =>
    props.position === 'first' ? '4px' : '0px'};
  border-top-right-radius: ${props =>
    props.position === 'last' ? '4px' : '0px'};
  border-bottom-right-radius: ${props =>
    props.position === 'last' ? '4px' : '0px'};
  margin-right: 1px;
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
