import styled from 'styled-components';

import { DivViewBase } from '../../../internals/web/ViewBase';

const OverlayContainer = styled(DivViewBase).attrs((props) => ({
  'aria-modal': 'true',
}))`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default OverlayContainer;
