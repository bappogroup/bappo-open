// @flow

import Colors from '../../apis/Colors';
import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';
import View from '../../primitives/View';

export const FieldLabelContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const FieldLabelAsterisk = styled(Text).attrs({
  children: '*',
})`
  color: ${Colors.RED};
  margin-left: 2px;
`;

export const FieldInputContainer = styled(View)`
  flex: none;
  justify-content: center;
  background-color: white;
  border-color: #dddbda;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  min-height: 40px;
  padding: 0px 16px;
`;
