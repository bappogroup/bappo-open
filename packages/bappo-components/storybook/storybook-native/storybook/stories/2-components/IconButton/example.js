import { Background, Text, Colors, IconButton, styled } from 'bappo-components';
import React from 'react';

const IconButtonExample = () => (
  <Background>
    <Text>Small</Text>
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
      name="account-circle"
      onPress={() => {
        alert('Welcom to Bappo-Components');
      }}
      size="medium"
      color="pink"
    />
    <Text>Large</Text>
    <IconButton
      name="chat-bubble"
      onPress={() => {
        alert('Welcom to Bappo-Components');
      }}
      size="large"
      color="#ddd"
    />
    <Text>User Define</Text>
    <IconButton
      name="computer"
      onPress={() => {
        alert('Welcom to Bappo-Components');
      }}
      size={120}
      color="green"
    />
  </Background>
);

export default IconButtonExample;
