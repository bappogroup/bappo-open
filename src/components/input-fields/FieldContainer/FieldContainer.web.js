// @flow

import styled from 'styled-components';
import ViewBase from '../../../internals/web/ViewBase';

const FieldContainer = styled(ViewBase).attrs({
  role: 'group',
})`
  padding: 8px 0;
`;

FieldContainer.displayName = 'FieldContainer';

export default FieldContainer;
