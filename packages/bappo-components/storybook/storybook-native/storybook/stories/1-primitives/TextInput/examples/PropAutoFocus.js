import React from 'react';
import { TextInput, View } from 'bappo-components';
import { styles } from '../helpers';

const TextInputAutoFocusExample = () => (
  <View>
    <TextInput autoFocus={true} style={styles.textinput} />
  </View>
);

export default TextInputAutoFocusExample;
