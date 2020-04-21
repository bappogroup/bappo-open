import {
  Background,
  Colors,
  IconSelector,
  Text,
  styled,
} from 'bappo-components';
import React from 'react';

const IconSelectorExample = () => (
  <Background>
    <Text>User Define</Text>
    <IconSelector name="computer" size={24} color="green" />
  </Background>
);

export default IconSelectorExample;
