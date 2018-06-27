import React from 'react';
import { TextInput, View } from 'bappo-components';
import { styles } from '../helpers';

const TextInputMultilineExample = () => (
  <View>
    <TextInput multiline style={styles.multiline} />
    <TextInput multiline style={styles.multiline} />
  </View>
);

export default TextInputMultilineExample;
