import React from 'react';
import { Avatar, View } from 'bappo-components';

const AvatarSizeExample = () => (
  <View style={styles.horizontal}>
    <Avatar icon="face" size="large" style={styles.rightPadding} />
    <Avatar icon="face" size="medium" style={styles.rightPadding} />
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

export default AvatarSizeExample;
