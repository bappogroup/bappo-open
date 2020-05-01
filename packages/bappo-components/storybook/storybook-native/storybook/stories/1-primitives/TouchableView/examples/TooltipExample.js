import React from 'react';
import { Text, TouchableView, View } from 'bappo-components';
import styled from 'styled-components';

const action = msg => () => {
  console.log(msg);
};

const TooltipExample = () => (
  <View style={{ alignItems: 'center' }}>
    <StyledButton
      tooltip="Your tooltip show here"
      disabled={false}
      onPress={action('pressed')}
    >
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
