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

const AlertScreen = () => (
  <UIExplorer title="Alert" url="3-apis/Alert">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/apis/Alert"
      text="Source Code"
    />
    <Description>
      <AppText>
        Launches an alert dialog with the specified title and message.
      </AppText>
      <AppText>
        Optionally provide a list of actions. Tapping any button will fire the
        respective onPress callback and dismiss the alert. By default, the only
        button will be an 'OK' button.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="alert"
        typeInfo={`(options: {
  title?: string,
  message?: string,
  actions?: {
    confirm: {
      text: string,
      onPress?: () => void,
      destructive?: boolean,
    },
    cancel: {
      text: string,
      onPress?: () => void,
      destructive?: boolean,
    },
    neutral: {
      text: string,
      onPress?: () => void,
      destructive?: boolean,
    }
  }
}) => void`}
        description="Alert options. "
      />
    </Section>

    <Section title="Examples">
      <WebLink
        href="https://github.com/bappogroup/bappo-components/tree/master/storybook/storybook-native/storybook/stories/4-apis/Alert/examples"
        text="Examples Code"
      />
      <DocItem
        example={{
          render: () => <Minimal />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('Alert', AlertScreen);
