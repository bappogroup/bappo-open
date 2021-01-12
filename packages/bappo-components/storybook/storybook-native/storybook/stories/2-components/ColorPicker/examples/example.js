import { ColorPicker, Text, View, styled } from 'bappo-components';
import React from 'react';

const ColorPickerExample = () => {
  const [color, setColor] = React.useState({});

  return (
    <View style={outerStyle}>
      <ColorPicker hex="#000" onChange={(color) => setColor(color)} />
      {/* <SelectedColor $color={color.hex} /> */}
    </View>
  );
};

export default ColorPickerExample;

const outerStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: '#f8f8f8',
  padding: 20,
  margin: 20,
};

const SelectedColor = styled(View)`
  background-color: ${($color) => `${$color}`};
  width: 20px;
  height: 20px;
  margin: 0;
`;
