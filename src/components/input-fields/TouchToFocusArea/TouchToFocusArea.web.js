// @flow

import * as React from 'react';
import styled from 'styled-components';
import FlexDiv from '../../../internals/web/FlexDiv';

type Props = {
  onPress?: any,
};

const FieldContainer = ({ onPress, ...rest }: Props) => {
  return <StyledDiv {...rest} onClick={onPress} />;
};

export default FieldContainer;

const StyledDiv = styled(FlexDiv)`
  margin: 2px 0;
`;
