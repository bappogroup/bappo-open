/* eslint-disable react/jsx-sort-props */

import React from 'react';

import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  WebLink,
  storiesOf,
} from '../../../ui-explorer';
import { url } from '../../../url';
import PropType from './examples/PropType';

const ParagraphScreen = () => (
  <UIExplorer title="Paragraph" url="2-components/Paragraph">
    <Description>
      <AppText>Paragraph.</AppText>
    </Description>

    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/2-components/Paragraph/examples`}
      text="Examples Code"
    />

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="string"
        description="The text content of the paragraph."
      />

      <DocItem
        name="type?"
        typeInfo="default | bold | small | error | success | white"
        description="The type of information contained in the paragraph."
        example={{
          render: () => <PropType />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Paragraph', ParagraphScreen);
