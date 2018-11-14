import React from 'react';
import UIExplorer, {
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer';
import WithCloseButton from './examples/WithCloseButton';

const OverlayScreen = () => (
  <UIExplorer title="Overlay" url="1-primitives/Overlay">
    <Description>Show a full screen overlay on top of the page</Description>
    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="?React.Node"
        description="Body of the Overlay."
      />

      <DocItem
        name="onPress?"
        typeInfo="?() => void"
        description="The callback function is called when the overlay is pressed. Note that clicking on the children wouldn't fire this."
      />

      <DocItem
        name="visible?"
        typeInfo="boolean = false"
        description="Determines whether the Overlay is visible."
      />

      <DocItem
        name="showCloseButton?(web only)"
        typeInfo="boolean = false"
        description="Whether to show a close button at the top left corner. Must provide the onClose callback if true."
      />

      <DocItem
        name="onClose?(web only)"
        typeInfo="?() => void"
        description="Callback function passed to close button that closes the Overlay."
      />
    </Section>

    <Section title="Example">
      <DocItem
        description="Simple overlay with close button"
        example={{
          code: `
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
`,
          render: () => <WithCloseButton />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Primitives', module).add('Overlay', OverlayScreen);
