import React from 'react';
import { styled, View, Text } from 'bappo-components';

function StyledView() {
  return (
    <Container>
      <Text>left</Text>
      <View style={{ backgroundColor: 'pink' }}>
        <Text>middle</Text>
      </View>
      <Text>right</Text>
    </Container>
  );
}

export default StyledView;

const Container = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid dodgerblue;
  padding: 16px;
`;
