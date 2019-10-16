import React from 'react';
import { url } from '../../../url';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
  WebLink,
} from '../../../ui-explorer';
import Minimal from './examples/Minimal';

const DateFieldScreen = () => (
  <UIExplorer title="DateField" url="3-inputFields/DateField">
    <WebLink
      href={`${url}/src/components/input-fields/DateField`}
      text="Source Code"
    />

    <Description>
      <AppText>DateField is an input field that lets you pick a date.</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="accessibilityLabel?"
        typeInfo="string"
        description="Same as View"
      />

      <DocItem
        name="autoFocus?"
        typeInfo="boolean = false"
        description={
          <AppText>
            If <Code>true</Code>, focuses the input on{' '}
            <Code>componentDidMount</Code>.
          </AppText>
        }
      />

      <DocItem
        name="clearable?"
        typeInfo="boolean = true"
        description={
          <AppText>
            If <Code>true</Code>, the input value can be cleared by pressing a
            button.
          </AppText>
        }
      />

      <DocItem
        name="displayFormat?"
        typeInfo="string = 'YYYY-MM-DD'"
        description={<AppText>Date format of the displayed value.</AppText>}
      />

      <DocItem
        name="onBlur?"
        typeInfo="() => void"
        description="Callback that is called when the input is blurred."
      />

      <DocItem
        name="onFocus?"
        typeInfo="() => void"
        description="Callback that is called when the input is focused."
      />

      <DocItem
        name="onValueChange?"
        typeInfo="(value: Value) => void"
        description="Callback that is called when the input value changes."
      />

      <DocItem
        name="placeholder?"
        typeInfo="string"
        description="The string that will be rendered when there is no value."
      />

      <DocItem
        name="readOnly?"
        typeInfo="boolean = false"
        description={
          <AppText>
            If <Code>true</Code>, the input is not editable.
          </AppText>
        }
      />

      <DocItem
        name="renderDropdownIcon?"
        typeInfo="() => ?React.Element<any>"
        description="Function to render the dropdown icon."
      />

      <DocItem name="style?" typeInfo="style" description="Same as View" />

      <DocItem name="testID?" typeInfo="string" description="Same as View" />

      <DocItem
        name="value?"
        typeInfo="Value"
        description="The value of the date input."
      />

      <DocItem
        name="valueFormat?"
        typeInfo="string = 'YYYY-MM-DD'"
        description={<AppText>Date format of the input value.</AppText>}
      />
    </Section>

    <Section title="Examples">
      <WebLink
        href={`${url}/storybook/storybook-native/storybook/stories/3-inputFields/DateField/examples`}
        text="Examples Code"
      />

      <DocItem
        description="Minimal"
        example={{
          render: () => <Minimal />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Input Fields', module).add('DateField', DateFieldScreen);
