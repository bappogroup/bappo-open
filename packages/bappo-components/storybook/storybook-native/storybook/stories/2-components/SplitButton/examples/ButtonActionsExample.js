import { SplitButton, View } from 'bappo-components';
import React from 'react';

const ButtonActionsExample = () => (
  <View style={styles.vertical}>
    <SplitButton
      text="Split Button"
      onButtonPress={() => alert('You pressed the primary button')}
    >
      <SplitButton.Item onPress={() => alert('You pressed action 1')}>
        Example Action 1
      </SplitButton.Item>
    </SplitButton>
  </View>
);

const styles = {
  vertical: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
};
export default ButtonActionsExample;
