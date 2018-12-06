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
        example={{
          render: () => <Minimal />,
          code: `
            await Alert.alert('My simple alert message');

              --- OR ---

            result = await Alert.alert({
              title: 'Alert Title',
              message: 'My Alert Msg',
              actions: {
                neutral: {
                  text: 'Ask me later',
                },
                cancel: {
                  text: 'Abort!',
                },
                confirm: {
                  text: 'Destroy',
                  destructive: true,
                },
              },
            });
            console.log(result);

          `,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('Alert', AlertScreen);
