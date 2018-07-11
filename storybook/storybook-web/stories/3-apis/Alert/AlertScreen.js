import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer';
import Minimal from './examples/Minimal';

const AlertScreen = () => (
  <UIExplorer title="Alert" url="3-apis/Alert">
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

    <Section title="Static Methods">
      <DocItem
        name="alert"
        typeInfo={`(options: {
  title?: string,
  message?: string,
  actions?: Array<{
    text: string,
    onPress?: () => void,
    style?: 'default' | 'cancel' | 'destructive'
  }>
}) => void`}
        description="Alert options. "
        example={{
          render: () => <Minimal />,
          code: `
Alert.alert({
  title: 'Alert Title',
  message: 'My Alert Msg',
  actions: [
    {
      text: 'Ask me later',
      onPress: () => console.log('Ask me later Pressed'),
    },
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Destroy',
      onPress: () => console.log('Destroyed'),
      style: 'destructive',
    },
  ],
})
          `
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('Alert', AlertScreen);
