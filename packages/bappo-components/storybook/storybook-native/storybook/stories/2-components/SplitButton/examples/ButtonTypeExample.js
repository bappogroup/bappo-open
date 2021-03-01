import { SplitButton, View } from 'bappo-components';
import React from 'react';

const ButtonTypeExample = () => (
  <View style={styles.horizontal}>
    <SplitButton
      text="Primary"
      icon="done"
      type="primary"
      onButtonPress={() => alert('You pressed the primary button')}
    >
      <SplitButton.Item onPress={() => alert('You pressed action 1')}>
        Example Action 1
      </SplitButton.Item>
    </SplitButton>
    <View style={{ width: 10 }} />
    <SplitButton
      text="Secondary"
      icon="done"
      type="secondary"
      onButtonPress={() => alert('You pressed the primary button')}
    >
      <SplitButton.Item onPress={() => alert('You pressed action 1')}>
        Example Action 1
      </SplitButton.Item>
    </SplitButton>
    <View style={{ width: 10 }} />
    <SplitButton
      text="Tertiary"
      icon="done"
      type="tertiary"
      onButtonPress={() => alert('You pressed the primary button')}
    >
      <SplitButton.Item onPress={() => alert('You pressed action 1')}>
        Example Action 1
      </SplitButton.Item>
    </SplitButton>
    <View style={{ width: 10 }} />
    <SplitButton
      text="Destructive"
      icon="done"
      type="destructive"
      onButtonPress={() => alert('You pressed the primary button')}
    >
      <SplitButton.Item onPress={() => alert('You pressed action 1')}>
        Example Action 1
      </SplitButton.Item>
    </SplitButton>
  </View>
);

const styles = {
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
  },
};

export default ButtonTypeExample;
