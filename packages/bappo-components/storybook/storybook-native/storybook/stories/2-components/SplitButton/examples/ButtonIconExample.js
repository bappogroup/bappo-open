import { Background, Paragraph, SplitButton, View } from 'bappo-components';
import React from 'react';

const ButtonIconExample = () => (
  <View style={styles.vertical}>
    <Background>
      <Paragraph>Button with text and Icon</Paragraph>
      <SplitButton
        text="Save"
        icon="done"
        type="primary"
        onButtonPress={() => alert('You pressed the primary button')}
      >
        <SplitButton.Item
          icon="add-alarm"
          onPress={() => alert('You pressed action 1')}
        >
          Example Action 1
        </SplitButton.Item>
      </SplitButton>
    </Background>
  </View>
);

const styles = {
  vertical: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
};

export default ButtonIconExample;
