import { Background, IconButton, Text } from 'bappo-components';
import React from 'react';

const IconButtonDisabledExample = () => (
  <Background>
    <Text>Disabled</Text>
    <IconButton
      disabled
      name="style"
      onPress={() => {
        alert('Welcom to Bappo-Components');
      }}
    />
  </Background>
);

export default IconButtonDisabledExample;
