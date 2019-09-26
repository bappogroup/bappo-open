import React from 'react';
import { Avatar, View } from 'bappo-components';

const AvatarNameExample = () => (
  <View style={styles.horizontal}>
    <Avatar name="John Doe" style={styles.rightPadding} />
    <Avatar name="Bappo Components" style={styles.rightPadding} />
  </View>
);

const styles = {
  horizontal: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightPadding: {
    marginRight: 10,
  },
};

export default AvatarNameExample;
