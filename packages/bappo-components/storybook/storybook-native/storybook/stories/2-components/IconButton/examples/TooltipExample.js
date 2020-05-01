import { Background, Colors, IconButton, Text, styled } from 'bappo-components';
import React from 'react';

const IconButtonExample = () => (
  <Background>
    <Text>Show Tooltip</Text>
    <IconButton
      name="style"
      onPress={() => {
        alert('Welcom to Bappo-Components');
      }}
      tooltip="Your tooltips"
    />
  </Background>
);

export default IconButtonExample;
