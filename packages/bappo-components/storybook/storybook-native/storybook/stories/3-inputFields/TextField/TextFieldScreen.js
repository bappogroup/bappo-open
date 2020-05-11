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
import PropMultiline from './examples/PropMultiline';
import PropPlaceholder from './examples/PropPlaceholder';
import PropReadOnly from './examples/PropReadOnly';
import PropType from './examples/PropType';
import PropValidate from './examples/PropValidate';
import TextInputRewrite from './examples/Rewrite';
import TextInputEvents from './examples/TextInputEvents';

const TextFieldScreen = () => (
  <UIExplorer title="TextField" url="3-inputFields/TextField">
    <WebLink
      href={`${url}/src/components/input-fields/TextField.js`}
      text="Source Code"
    />
    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/3-inputFields/TextField/examples`}
      text="Examples Code"
    />

    <Description>
      <AppText>
        Accessible single- and multi-line text input via a keyboard. Supports
        features such as auto-focus, placeholder text, and event callbacks.
        Note: some props are exclusive to or excluded from{' '}
        <Code>multiline</Code>.
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
        name="autoFocus?"
        typeInfo="boolean = false"
        description={
          <AppText>
            If <Code>true</Code>, focuses the input on{' '}
            <Code>componentDidMount</Code>. Only the first form element in a
            document with <Code>autofocus</Code> is focused.
          </AppText>
        }
      />

      <DocItem
        name="defaultValue?"
        typeInfo="string"
        description={
          <AppText>
            Provides an initial value that will change when the user starts
            typing. Useful for simple use-cases where you don't want to deal
            with listening to events and updating the <Code>value</Code> prop to
            keep the controlled state in sync.
          </AppText>
        }
      />

      <DocItem
        name="multiline?"
        typeInfo="boolean = false"
        description={
          <AppText>
            If <Code>true</Code>, the text input can be multiple lines.
          </AppText>
        }
        example={{
          render: () => <PropMultiline />,
        }}
      />

      <DocItem
        name="reserveErrorSpace?"
        typeInfo="boolean = true"
        description="Space reserved for error message under the Textfield"
      />

      <DocItem
        name="onBlur?"
        typeInfo="(event: BlurEvent) => void"
        description="Callback that is called when the text input is blurred."
      />

      <DocItem
        name="onFocus?"
        typeInfo="(event: FocusEvent) => void"
        description="Callback that is called when the text input is focused."
      />

      <DocItem
        name="onValueChange?"
        typeInfo="(value: string) => void"
        description={
          <AppText>
            Callback that is called when the text input's text changes. The text
            is passed as an argument to the callback handler.
          </AppText>
        }
      />

      <DocItem
        name="placeholder?"
        typeInfo="string"
        description={
          <AppText>
            The string that will be rendered in an empty <Code>TextField</Code>{' '}
            before text has been entered.
          </AppText>
        }
        example={{
          render: () => <PropPlaceholder />,
        }}
      />

      <DocItem
        name="readOnly?"
        typeInfo="boolean = false"
        description={
          <AppText>
            If <Code>true</Code>, text is not editable (i.e., read-only).
          </AppText>
        }
        example={{
          render: () => <PropReadOnly />,
        }}
      />

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
        name="type?"
        typeInfo="'email' | 'number' | 'password' | 'tel' | 'text' = 'text'"
        description={
          <AppText>
            Input type. Only works with <Code>{'multiline={false}'}</Code>.
          </AppText>
        }
        example={{
          render: () => <PropType />,
        }}
      />

      <DocItem
        name="validate?"
        typeInfo="((value: V) => string | undefined) | ((value: V) => string | undefined)[]"
        description={
          <AppText>
            Field validator function or a list of field validator functions.
            Return an error string or undefined if no error. Only works outside
            a form. When inside a form, use{' '}
            <Code>{'<Form.Field component={TextField} validate={} />'}</Code>
          </AppText>
        }
        example={{
          render: () => <PropValidate />,
        }}
      />

      <DocItem
        name="value?"
        typeInfo="string"
        description={
          <AppText>
            The value to show for the text input. <Code>TextField</Code> is a
            controlled component, which means the native <Code>value</Code> will
            be forced to match this prop if provided. Read about how{' '}
            <AppText
              href="https://facebook.github.io/react/docs/forms.html"
              target="_blank"
            >
              React form components
            </AppText>{' '}
            work. To prevent user edits to the value set{' '}
            <Code>{'readOnly={true}'}</Code>.
          </AppText>
        }
      />
    </Section>

    <Section title="Instance methods">
      <DocItem
        name="blur"
        typeInfo="() => void"
        description="Blur the input."
      />

      <DocItem
        name="focus"
        typeInfo="() => void"
        description="Focus the input."
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="TextField events"
        example={{
          render: () => <TextInputEvents />,
        }}
      />

      <DocItem
        description="Rewrite spaces to '_' with a maxLength restrict"
        example={{
          render: () => <TextInputRewrite />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Input Fields', module).add('TextField', TextFieldScreen);
