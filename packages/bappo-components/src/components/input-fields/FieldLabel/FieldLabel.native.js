// @flow

import { styled } from '../../../apis/Style';
import Text from '../../../primitives/Text';

const FieldLabel = styled(Text).attrs(props => ({
  selectable: true,
}))`
  font-size: 12px;
  height: 20px;
  line-height: 20px;
`;

FieldLabel.displayName = 'FieldLabel';

export default FieldLabel;
