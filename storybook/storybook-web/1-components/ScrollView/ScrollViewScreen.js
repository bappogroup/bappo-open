/* eslint-disable react/jsx-no-bind, react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../ui-explorer';
import ScrollToExample from './examples/ScrollTo';
import ScrollToEndExample from './examples/ScrollToEnd';

const ScrollViewScreen = () => (
  <UIExplorer title="ScrollView" url="1-components/ScrollView">
    <Description>
      <AppText>
        A scrollable view.{' '}
        <Code>ScrollView</Code>'s must have a bounded height: either set the height of the
        view directly (discouraged) or make sure all parent views have bounded height (e.g.,
        transfer <Code>{'{ flex: 1 }'}</Code> down the view stack).
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="onScroll?"
        typeInfo="function"
        description={[
          <AppText>
            Fires at most once per frame during scrolling. The frequency of the events can be
            contolled using the <Code>scrollEventThrottle</Code> prop.
          </AppText>,
        ]}
      />

      <DocItem
        name="scrollEventThrottle?"
        typeInfo="number = 16"
        description={
          <AppText>
            This controls how often the scroll event will be fired while scrolling (as a time
            interval in ms). A lower number yields better accuracy for code that is tracking the
            scroll position, but can lead to scroll performance problems. The default value is{' '}
            <Code>16</Code>, which means the scroll event will be sent once per frame.
          </AppText>
        }
      />
    </Section>

    <Section title="Instance methods">
      <DocItem
        name="scrollTo"
        typeInfo="(options: { x: number = 0; y: number = 0; }) => void"
        description="Scrolls to a given `x`, `y` offset."
        example={{
          render: () => <ScrollToExample />,
        }}
      />

      <DocItem
        name="scrollToEnd"
        typeInfo="() => void"
        description="Scrolls to the end of the scroll view."
        example={{
          render: () => <ScrollToEndExample />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('ScrollView', ScrollViewScreen);
