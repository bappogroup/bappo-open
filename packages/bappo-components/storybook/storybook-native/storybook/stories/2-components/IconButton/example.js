import { Background, Colors, IconButton, styled } from 'bappo-components';
import React from 'react';

const IconButtonExample = () => (
  <Background>
    <IconButton
      name="360"
      onPress={() => {
        alert('Hello Jon');
      }}
    />
    <IconButton
      name="360"
      onPress={() => {
        alert('Hello Jon');
      }}
    />
  </Background>
);

export default IconButtonExample;
