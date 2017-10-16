import React from 'react';
import { TextInput, View } from 'bappo-components';
import { styles } from '../helpers';

const TextInputPlaceholderExample = () => (
  <View>
    <TextInput placeholder="This is placeholder text" style={styles.textinput} />
    <TextInput multiline placeholder="This is placeholder text" style={styles.multiline} />
  </View>
);

export default TextInputPlaceholderExample;
