import { styled } from '../../../apis/Style';
import View from '../../View';

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

export const FieldLabelContainer = styled(View)`
  align-items: flex-start;
`;
