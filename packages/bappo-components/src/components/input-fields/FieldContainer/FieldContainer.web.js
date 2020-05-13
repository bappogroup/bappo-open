// @flow

import styled from 'styled-components';

// $FlowFixMe typescript
import { DivViewBase } from '../../../internals/web/ViewBase';

const FieldContainer = styled(DivViewBase).attrs({
  role: 'group',
})`
  padding: 8px 0;
`;

FieldContainer.displayName = 'FieldContainer';

export default FieldContainer;
