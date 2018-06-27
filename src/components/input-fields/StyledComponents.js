// @flow

import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';
import View from '../../primitives/View';

export const FieldLabelContainer = styled(View)`
  align-items: flex-start;
`;

export const FieldLabel = styled(Text).attrs({
  selectable: true,
})`
  font-size: 12px;
  height: 20px;
  line-height: 20px;
`;

export const FieldInputContainer = styled(View)`
  flex: none;
  justify-content: center;
  border-color: #dddbda;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  height: 40px;
  margin: 2px 0;
  padding: 10px 16px;
`;
