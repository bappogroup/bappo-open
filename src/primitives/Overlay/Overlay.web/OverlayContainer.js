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
  background-color: ${props => props.color};
`;

export default OverlayContainer;
