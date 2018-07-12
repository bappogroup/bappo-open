import React from 'react';
import { Text, TouchableView, View } from 'bappo-components';
import styled from 'styled-components';

const action = msg => () => {
  console.log(msg);
};

const ButtonDisabledExample = () => (
  <View>
    <StyledButton disabled onPress={action('pressed')}>
      <Text>Disabled TouchableView</Text>
    </StyledButton>

    <StyledButton disabled={false} onPress={action('pressed')}>
      <Text>Enabled TouchableView</Text>
    </StyledButton>
  </View>
);

export default ButtonDisabledExample;

const StyledButton = styled(TouchableView)`
  justify-content: center;
  flex-direction: row;
  padding: 10px;
`;
