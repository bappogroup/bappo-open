// @flow

import * as React from 'react';
import styled from 'styled-components';

// $FlowFixMe: forwardRef not supported yet
const FieldContainer = React.forwardRef((props, ref) => {
  return <StyledTouchable {...props} innerRef={ref} />;
});

export default FieldContainer;

const StyledTouchable = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  padding: 8px;
`;
