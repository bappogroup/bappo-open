import React from 'react';
import { TextInput, View } from 'bappo-components';
import { styles } from '../helpers';

const TextInputTypeExample = () => (
  <View>
    <TextInput
      placeholder="email"
      style={styles.textinput}
      type="email"
    />
    <TextInput
      placeholder="password"
      style={styles.textinput}
      type="password"
    />
  </View>
);

export default TextInputTypeExample;
