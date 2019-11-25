import React from 'react';
import { Text, View } from 'bappo-components';

const TextNumberOfLinesExample = () => (
  <View style={{ maxWidth: 320 }}>
    <Text numberOfLines={1} style={{ marginBottom: 20 }}>
      Maximum of one line without an ellipsis
    </Text>
    <Text numberOfLines={1} ellipsis>
      Maximum of one line with an ellipsis, no matter how much I write here. If
      I keep writing, it
      {"'"}
      ll just truncate after one line.
    </Text>
    <Text numberOfLines={2} ellipsis style={{ marginTop: 20 }}>
      Maximum of two lines, no matter how much I write here. If I keep writing,
      it
      {"'"}
      ll just truncate after two lines.
    </Text>
    <Text style={{ marginTop: 20 }}>
      No maximum lines specified, no matter how much I write here. If I keep
      writing, it
      {"'"}
      ll just keep going and going.
    </Text>
  </View>
);

export default TextNumberOfLinesExample;
