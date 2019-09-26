import React from 'react';
import { Button, View } from 'bappo-components';

const ButtonSizeExample = () => (
  <View style={styles.horizontal}>
    <Button text="Primary" type="primary" style={{ marginRight: 16 }} />
    <Button text="Secondary" type="secondary" style={{ marginRight: 16 }} />
    <Button text="Tertiary" type="tertiary" style={{ marginRight: 16 }} />
    <Button text="Destructive" type="destructive" />
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
