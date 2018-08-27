// @flow

import styled from 'styled-components';
import TextBase from '../../../internals/web/TextBase';

const FieldLabel = styled(TextBase).attrs({
  component: 'label',
  selectable: true,
})`
  font-size: 12px;
  height: 20px;
  line-height: 20px;
`;

FieldLabel.displayName = 'FieldLabel';

export default FieldLabel;
