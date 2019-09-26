// @flow

import * as React from 'react';
import Colors from '../../apis/Colors';
import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';
import View from '../../primitives/View';

export const FieldLabelContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

// styled(Text).attrs({ children: '*' }) does not work on native
const FieldLabelAsteriskText = styled(Text)`
  color: ${Colors.RED};
  margin-left: 2px;
`;
export const FieldLabelAsterisk = () => (
  <FieldLabelAsteriskText>*</FieldLabelAsteriskText>
);

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
