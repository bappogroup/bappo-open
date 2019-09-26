// @flow

import styled from 'styled-components';
import { createText } from '../../../internals/web/TextBase';

const LabelText = createText('label');
const FieldLabel = styled(LabelText).attrs({
  selectable: true,
})`
  font-size: 12px;
  height: 20px;
  line-height: 20px;
`;

FieldLabel.displayName = 'FieldLabel';

export default FieldLabel;
