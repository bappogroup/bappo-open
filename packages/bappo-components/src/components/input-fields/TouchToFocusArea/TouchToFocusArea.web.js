// @flow

import * as React from 'react';
import styled from 'styled-components';

// $FlowFixMe typescript
import { DivViewBase } from '../../../internals/web/ViewBase';

type Props = {
  onPress?: any,
  testID?: string,
};

const TouchToFocusArea = ({ onPress, ...rest }: Props) => {
  return <StyledView {...rest} onClick={onPress} />;
};

export default TouchToFocusArea;

const StyledView = styled(DivViewBase)`
  margin: 2px 0;
`;
