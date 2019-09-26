import React from 'react';
import { Avatar, Colors, View } from 'bappo-components';

const AvatarBackgroundColorExample = () => (
  <View style={styles.horizontal}>
    <Avatar
      backgroundColor={Colors.BLUE}
      icon="face"
      style={styles.rightPadding}
      badge={23}
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
