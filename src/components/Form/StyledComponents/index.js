import { styled } from '../../../apis/Style';
import Text from '../../Text';
import View from '../../View';
import { buttonTextStyle } from '../../NewButton/styles';

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

export const SubmitButtonText = styled(Text).attrs({
  type: 'primary',
})`
  ${buttonTextStyle};
`;
