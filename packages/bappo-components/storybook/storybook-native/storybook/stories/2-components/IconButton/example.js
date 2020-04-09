import { Background, Colors, IconButton, Text, styled } from 'bappo-components';
import React from 'react';

const IconButtonExample = () => (
  <Background>
    <Text>Default</Text>
    <IconButton
      name="360"
      onPress={() => {
        alert('Welcom to Bappo-Components');
      }}
      color="green"
    />
    <Text>Small</Text>
    <IconButton
      name="adjust"
      onPress={() => {
        alert('Welcom to Bappo-Components');
      }}
      size="small"
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
