import React from 'react';
import { styled, View, Text, Button, Overlay } from 'bappo-components';

class WithCloseButton extends React.Component {
  state = {
    show: false,
  };

  render() {
    return (
      <View>
        <Overlay
          visible={this.state.show}
          showCloseButton={true}
          onClose={() => this.setState({ show: false })}
        >
          <ChildrenContainer>
            <Text>I'm fullscreen content</Text>
          </ChildrenContainer>
        </Overlay>
        <Button
          text="Show Overlay"
          onPress={() => this.setState({ show: true })}
        />
      </View>
    );
  }
}

export default WithCloseButton;

const ChildrenContainer = styled(View)`
  flex: 1;
  background-color: dodgerblue;
  justify-content: center;
  align-items: center;
`;
