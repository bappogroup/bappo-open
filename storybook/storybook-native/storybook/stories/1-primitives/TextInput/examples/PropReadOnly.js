import React from 'react';
import { TextInput, View } from 'bappo-components';
import { styles } from '../helpers';

const TextInputReadOnlyExample = () => (
  <View>
    <TextInput
      defaultValue="uneditable text input"
      readOnly
      style={styles.textinput}
    />
    <TextInput
      defaultValue="uneditable multiline text input"
      multiline
      readOnly
      style={styles.multiline}
    />
  </View>
);

export default TextInputReadOnlyExample;
