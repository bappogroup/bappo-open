import React from 'react';
import { Avatar, Colors, View } from 'bappo-components';

const AvatarBackgroundColorExample = () => (
  <View style={styles.horizontal}>
    <Avatar
      backgroundColor={Colors.BLUE}
      icon="face"
      style={styles.rightPadding}
    />
    <Avatar
      backgroundColor={Colors.GREEN}
      icon="face"
      style={styles.rightPadding}
    />
    <Avatar
      backgroundColor={Colors.YELLOW}
      icon="face"
      style={styles.rightPadding}
    />
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

export default AvatarBackgroundColorExample;
