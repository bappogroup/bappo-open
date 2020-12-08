// @flow

import styled from 'styled-components';

// $FlowFixMe typescript
import { DivViewBase } from '../../../internals/web/ViewBase';

const FieldContainer = styled(DivViewBase).attrs((props) => ({
  role: 'group',
}))`
  padding: 0px;
`;

FieldContainer.displayName = 'FieldContainer';

export default FieldContainer;
