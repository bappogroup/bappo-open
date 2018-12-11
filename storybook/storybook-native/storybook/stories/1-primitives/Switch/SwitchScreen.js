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
import Minimal from './examples/Minimal';

const SwitchScreen = () => (
  <UIExplorer title="Switch" url="1-primitives/Switch">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/primitives/Switch"
      text="Source Code"
    />

    <Description>
      <AppText>Renders a boolean input.</AppText>
      <AppText>
        This is a controlled component that requires an{' '}
        <Code>onValueChange</Code> callback that updates the <Code>value</Code>{' '}
        prop in order for the component to reflect user actions. If the{' '}
        <Code>value</Code> prop is not updated, the component will continue to
        render the supplied <Code>value</Code> prop instead of the expected
        result of any user actions.
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
            If true the user won't be able to toggle the switch. Default value
            is false.
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
        name="value?"
        typeInfo="boolean"
        description={
          <AppText>
            The value of the switch. If true the switch will be turned on.
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
<Switch
  onValueChange={value => this.setState({ value })}
  value={this.state.value}
/>`,
          render: () => <Minimal />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Primitives', module).add('Switch', SwitchScreen);
