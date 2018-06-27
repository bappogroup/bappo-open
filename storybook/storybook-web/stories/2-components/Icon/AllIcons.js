import React from 'react';
import { Icon, Text, View } from 'bappo-components';
import glyphMap from 'bappo-components/glyphmaps/MaterialIcons.json';

const IconWithName = ({ name }) => (
  <View style={{ alignItems: 'center', height: 90, width: 100 }}>
    <Icon name={name} style={{ fontSize: 20 }} />
    <Text selectable>{name}</Text>
  </View>
);

const AllIcons = () => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {Object.keys(glyphMap).map(name => {
        return <IconWithName key={name} name={name} />;
      })}
    </View>
  );
};

export default AllIcons;
