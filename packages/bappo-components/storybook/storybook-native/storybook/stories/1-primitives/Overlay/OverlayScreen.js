import React from 'react';
import { url } from '../../../url';
import UIExplorer, {
  Description,
  DocItem,
  Section,
  storiesOf,
  WebLink,
} from '../../../ui-explorer';
import WithCloseButton from './examples/WithCloseButton';

const OverlayScreen = () => (
  <UIExplorer title="Overlay" url="1-primitives/Overlay">
    <WebLink href={`${url}/src/primitives/Overlay`} text="Source Code" />

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
        name="closeButtonStyle?(web only)"
        typeInfo="style"
        description="Styles applied on close button."
      />

      <DocItem
        name="onClose?(web only)"
        typeInfo="?() => void"
        description="Callback function passed to close button that closes the Overlay."
      />
    </Section>

    <Section title="Example">
      <WebLink
        href={`${url}/storybook/storybook-native/storybook/stories/1-primitives/Overlay/examples`}
        text="Examples Code"
      />
      <DocItem
        description="Simple overlay with close button"
        example={{
          render: () => <WithCloseButton />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Primitives', module).add('Overlay', OverlayScreen);
