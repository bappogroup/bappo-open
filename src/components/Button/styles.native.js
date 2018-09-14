import styled from 'styled-components';
import TouchableView from '../../primitives/TouchableView';
import { buttonContainerStyle } from './common-styles';

export const StyledTouchableView = styled(TouchableView)`
  ${buttonContainerStyle};
`;

export * from './common-styles';
