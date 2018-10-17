// @flow

import * as React from 'react';
import styled from 'styled-components';
import { buttonDefaultStyle } from './styles';
import ViewBase from './ViewBase';

const StyledViewBase = styled(ViewBase)`
  ${buttonDefaultStyle};
`;

// $FlowFixMe: forwardRef not supported yet
const TouchableViewBase = React.forwardRef((props, ref) => {
  return <StyledViewBase {...props} nativeRef={ref} />;
});

export default TouchableViewBase;
