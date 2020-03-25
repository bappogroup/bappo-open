import { Background, Text, Colors, IconButton, styled } from 'bappo-components';
import React from 'react';

const IconButtonExample = () => (
  <Background>
    <Text>Default</Text>
    <IconButton
      name="adjust"
      onPress={() => {
        alert('Welcom to Bappo-Components');
      }}
      fontSize="small"
      color="blue"
    />
    <Text>Medium</Text>
    <IconButton
      name="adjust"
      onPress={() => {
        alert('Welcom to Bappo-Components');
      }}
      size="medium"
      color="pink"
    />
    <Text>Large</Text>
    <IconButton
      name="adjust"
      onPress={() => {
        alert('Welcom to Bappo-Components');
      }}
      size="large"
      color="#ddd"
    />
    <Text>User Define</Text>
    <IconButton
      name="adjust"
      onPress={() => {
        alert('Welcom to Bappo-Components');
      }}
      size={120}
      color="red"
    />
  </Background>
);

export default IconButtonExample;
