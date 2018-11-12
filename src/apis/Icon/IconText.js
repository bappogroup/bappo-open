// @flow

import styled from 'styled-components';
import Text from '../../primitives/Text';

const IconText = styled(Text)`
  font-family: ${props => props.fontFamily};
  font-size: 16px;
  text-align: center;
`;

export default IconText;
