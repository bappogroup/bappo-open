import React from 'react';
import { Button, Text, View } from 'bappo-components';
import styled from 'styled-components/native';

const action = msg => () => {
  console.log(msg);
};

const ButtonDisabledExample = () => (
  <View>
    <StyledButton
      disabled
      onPress={action('Button')}
    >
      <Text>Disabled Button</Text>
    </StyledButton>

    <StyledButton
      disabled={false}
      onPress={action('Button')}
    >
      <Text>Enabled Button</Text>
    </StyledButton>
  </View>
);

export default ButtonDisabledExample;

const StyledButton = styled(Button)`
  justify-content: center;
  flex-direction: row;
  padding: 10px;
`;
