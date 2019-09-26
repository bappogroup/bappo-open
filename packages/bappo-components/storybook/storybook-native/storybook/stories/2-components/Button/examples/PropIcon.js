import React from 'react';
import { Button, View, Paragraph, Background } from 'bappo-components';

const ButtonSizeExample = () => (
  <View style={styles.vertical}>
    <Background>
      <Paragraph>Button with text and Icon</Paragraph>
      <Button text="Save" icon="done" />
      <Paragraph>Primary Button with Icon</Paragraph>
      <Button type="primary" icon="done" />
      <Paragraph>Secondary Button with Icon</Paragraph>
      <Button type="secondary" icon="close" />
      <Paragraph>Tertiary Button with Icon</Paragraph>
      <Button type="tertiary" icon="edit" />
      <Paragraph>Destructive Button with Icon</Paragraph>
      <Button type="destructive" icon="delete" />
    </Background>
  </View>
);

const styles = {
  vertical: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
};

export default ButtonSizeExample;
