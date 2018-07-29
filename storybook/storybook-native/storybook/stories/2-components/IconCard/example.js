import React from 'react';
import { IconCard, Background, Colors } from 'bappo-components';

const IconCardTypeExample = () => (
  <Background>
    <IconCard icon="done" color={Colors.ORANGE} size="small" />
    <IconCard icon="album" color={Colors.GREEN} size="medium" />
    <IconCard
      icon="airport-shuttle"
      color={Colors.BLUE}
      badge={6}
      size="large"
      text="Drivers"
      onPress={() => console.log('click')}
    />
  </Background>
);

export default IconCardTypeExample;
