/* eslint-disable react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../ui-explorer';
import FeedbackEvents from './examples/FeedbackEvents';
import PropDisabled from './examples/PropDisabled';

const ButtonScreen = () => (
  <UIExplorer title="Button" url="1-components/Button">
    <Description>
      <AppText>
        A view that responds to touches.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="delayLongPress?"
        typeInfo="number"
        description={
          <AppText>
            Delay in ms, from <Code>onPressIn</Code>, before <Code>onLongPress</Code> is called.
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

      <DocItem
        name="style?"
        typeInfo="style"
        description="Same as View"
      />

      <DocItem
        name="testID?"
        typeInfo="string"
        description="Same as View"
      />
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

storiesOf('Components', module).add('Button', ButtonScreen);
