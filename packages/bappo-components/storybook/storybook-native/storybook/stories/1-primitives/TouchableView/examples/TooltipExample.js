import React from 'react';
import { Text, TouchableView, View } from 'bappo-components';
import styled from 'styled-components';

const action = msg => () => {
  console.log(msg);
};

const TooltipExample = () => (
  <View>
    <StyledButton tooltip="heihei" disabled={false} onPress={action('pressed')}>
      <Text>Hover for tooltip</Text>
    </StyledButton>
  </View>
);

export default TooltipExample;

const StyledButton = styled(TouchableView)`
  justify-content: center;
  flex-direction: row;
  padding: 10px;
`;
