import React from 'react';

import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  WebLink,
  storiesOf,
} from '../../../ui-explorer';
import { url } from '../../../url';
import Disabled from './examples/Disabled';
import Minimal from './examples/Minimal';

const CheckboxScreen = () => (
  <UIExplorer title="Checkbox" url="1-primitives/Checkbox">
    <WebLink href={`${url}/src/primitives/Checkbox`} text="Source Code" />

    <Description>
      <AppText>Renders a boolean input.</AppText>
      <AppText>
        This is a controlled component that requires an{' '}
        <Code>onValueChange</Code> callback that updates the{' '}
        <Code>checked</Code> prop in order for the component to reflect user
        actions. If the <Code>checked</Code> prop is not updated, the component
        will continue to render the supplied <Code>checked</Code> prop instead
        of the expected result of any user actions.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="accessibilityLabel?"
        typeInfo="string"
        description={
          <AppText>
            Overrides the text that's read by the screen reader when the user
            interacts with the element. On web: it is stored as attribute
            "aria-label". On native: it uses the accessibilityLabel prop.
          </AppText>
        }
      />

      <DocItem
        name="disabled?"
        typeInfo="boolean"
        description={
          <AppText>
            If true the user won't be able to change the checkbox value. Default
            value is false.
          </AppText>
        }
      />

      <DocItem
        name="onValueChange?"
        typeInfo="(value: boolean) => void"
        description={
          <AppText>Invoked with the new value when the value changes.</AppText>
        }
      />

      <DocItem name="style?" typeInfo="style" description="Styles" />

      <DocItem
        name="testID?"
        typeInfo="string"
        description={
          <AppText>
            Used to locate this view in end-to-end tests. On web: it is stored
            as data attribute "data-testid". On native: it uses the testID prop.
          </AppText>
        }
      />

      <DocItem
        name="checked?"
        typeInfo="boolean"
        description={
          <AppText>
            The value of the checkbox. If true the checkbox will be checked.
            Default value is false.
          </AppText>
        }
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="Minimal"
        example={{
          code: `
<Checkbox onValueChange={check} checked={value} testID="test-checkbox-1"/>`,
          render: () => <Minimal />,
        }}
      />
      <DocItem
        description="Disabled"
        example={{
          code: `
<Checkbox disabled />`,
          render: () => <Disabled />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Primitives', module).add('Checkbox', CheckboxScreen);
