// @flow

import * as React from 'react';
import styled from 'styled-components';
import FlexDiv from '../../../internals/web/FlexDiv';

// $FlowFixMe: forwardRef not supported yet
const FieldContainer = React.forwardRef((props, ref) => {
  const { onPress, ...rest } = props;
  return <StyledDiv {...rest} innerRef={ref} onClick={onPress} />;
});

export default FieldContainer;

const StyledDiv = styled(FlexDiv)`
  padding: 8px;
`;
