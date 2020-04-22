import {
  Background,
  Colors,
  IconSelector,
  Text,
  styled,
} from 'bappo-components';
import React, { useState } from 'react';

const IconSelectorExample = () => {
  const [iconName, setIconName] = useState('style');
  return (
    <Background>
      <Text>User Define</Text>
      <IconSelector
        name="computer"
        size={24}
        color="green"
        value={iconName}
        onValueChange={setIconName}
      />
    </Background>
  );
};

export default IconSelectorExample;
