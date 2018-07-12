/* eslint-disable react/jsx-sort-props */

import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer';
import PropType from './examples/PropType';

const ParagraphScreen = () => (
  <UIExplorer title="Paragraph" url="2-components/Paragraph">
    <Description>
      <AppText>Paragraph.</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="string"
        description="The text content of the paragraph."
      />

      <DocItem
        name="type?"
        typeInfo="default | bold | small | error | success"
        description="User name. The initial of the user name is displayed by default."
        example={{
          render: () => <PropType />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Paragraph', ParagraphScreen);
