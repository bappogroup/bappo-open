// @flow

import { styled } from '../../apis/Style';
import View from '../../primitives/View';

export const FieldLabelContainer = styled(View)`
  align-items: flex-start;
`;

export const FieldInputContainer = styled(View)`
  flex: none;
  justify-content: center;
  background-color: white;
  border-color: #dddbda;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  height: 40px;
  padding: 10px 16px;
`;
