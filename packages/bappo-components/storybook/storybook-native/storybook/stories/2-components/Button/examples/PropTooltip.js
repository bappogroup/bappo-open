import { Background, Button, Paragraph, View } from 'bappo-components';
import React from 'react';

const ButtonTooltipExample = () => (
  <View style={styles.vertical}>
    <Background>
      <Paragraph>Button with tooltip</Paragraph>
      <Button type="primary" icon="done" tooltip="Save" />
    </Background>
  </View>
);

const styles = {
  vertical: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
};

export default ButtonTooltipExample;
