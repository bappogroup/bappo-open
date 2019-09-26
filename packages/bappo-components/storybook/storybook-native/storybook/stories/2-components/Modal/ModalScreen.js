import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  storiesOf,
  WebLink,
} from '../../../ui-explorer';
import Minimal from './examples/Minimal';
import PropOnOverlayPress from './examples/PropOnOverlayPress';

const ModalScreen = () => (
  <UIExplorer title="Modal" url="2-components/Modal">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/components/Modal"
      text="Source Code"
    />
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/storybook/storybook-native/storybook/stories/2-components/Modal/examples"
      text="Examples Code"
    />

    <Description>
      <AppText>
        The Modal component is a simple way to present content above an
        enclosing view.
      </AppText>
    </Description>

    <Section title="Required Props">
      <DocItem
        name="onRequestClose"
        typeInfo="() => void"
        description="Callback function that closes the modal. This is required because some devices have hardware to request closing the modal (e.g. Android back button)"
      />
    </Section>

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="?React.Node"
        description="Body of the form. Can be a React node or a render function which will receive the form state as argument."
      />

      <DocItem
        name="onOverlayPress?"
        typeInfo="() => void"
        description="The callback function is called when the overlay is pressed."
        example={{
          render: () => <PropOnOverlayPress />,
        }}
      />

      <DocItem
        name="visible?"
        typeInfo="boolean"
        description="Determines whether the modal is visible."
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="Minimal"
        example={{
          render: () => <Minimal />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Modal', ModalScreen);
