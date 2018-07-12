import styled from 'styled-components';
import ViewBase from '../../../internals/web/ViewBase';

const OverlayContainer = styled(ViewBase).attrs({
  'aria-modal': 'true',
})`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(178, 178, 178, 0.8);
`;

export default OverlayContainer;
