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

const SelectFieldScreen = () => (
  <UIExplorer title="SelectField" url="2-components/SelectField">
    <Description>
      <AppText>SelectField.</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="string"
        description="The text content of the SelectField."
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

storiesOf('Components', module).add('SelectField', SelectFieldScreen);
