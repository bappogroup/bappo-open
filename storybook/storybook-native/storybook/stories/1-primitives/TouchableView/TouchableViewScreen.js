/* eslint-disable react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
  WebLink,
} from '../../../ui-explorer';
import FeedbackEvents from './examples/FeedbackEvents';
import PropDisabled from './examples/PropDisabled';

const TouchableViewScreen = () => (
  <UIExplorer title="TouchableView" url="1-primitives/TouchableView">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/primitives/TouchableView"
      text="Source Code"
    />
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/storybook/storybook-native/storybook/stories/1-primitives/TouchableView/examples"
      text="Examples Code"
    />

    <Description>
      <AppText>A view that responds to touches.</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="accessibilityLabel?"
        typeInfo="string"
        description="Same as View"
      />

      <DocItem
        name="delayLongPress?"
        typeInfo="number"
        description={
          <AppText>
            Delay in ms, from <Code>onPressIn</Code>, before{' '}
            <Code>onLongPress</Code> is called.
          </AppText>
        }
      />

      <DocItem
        name="disabled?"
        typeInfo="boolean"
        description={
          <AppText>
            If <Code>true</Code>, disable all interactions for this component.
          </AppText>
        }
        example={{
          render: () => <PropDisabled />,
        }}
      />

      <DocItem name="onLongPress?" typeInfo="function" />

      <DocItem
        name="onPress?"
        typeInfo="function"
        description="Called when the touch is released, but not if cancelled (e.g. by a scroll that steals the responder lock)."
      />

      <DocItem name="onPressIn?" typeInfo="function" />

      <DocItem name="onPressOut?" typeInfo="function" />

      <DocItem name="style?" typeInfo="style" description="Same as View" />

      <DocItem name="testID?" typeInfo="string" description="Same as View" />
    </Section>

    <Section title="More examples">
      <DocItem
        description="Feedback events"
        example={{
          render: () => <FeedbackEvents />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Primitives', module).add('TouchableView', TouchableViewScreen);
