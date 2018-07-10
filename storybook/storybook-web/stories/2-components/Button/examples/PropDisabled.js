import React from 'react';
import { Button, View } from 'bappo-components';

const ButtonSizeExample = () => (
  <View style={styles.horizontal}>
    <Button text="Disabled" disabled />
  </View>
);

const styles = {
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightPadding: {
    marginRight: 10,
  },
};

export default ButtonSizeExample;
