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
import PropMultiline from './examples/PropMultiline';
import PropPlaceholder from './examples/PropPlaceholder';
import PropReadOnly from './examples/PropReadOnly';
import PropAutoFocus from './examples/PropAutoFocus';
import PropType from './examples/PropType';
import TextInputRewrite, {
  TextInputRewriteInvalidCharacters,
} from './examples/Rewrite';
import TextInputEvents from './examples/TextInputEvents';
import TouchableWrapper from './examples/TouchableWrapper';

const TextInputScreen = () => (
  <UIExplorer title="TextInput" url="1-primitives/TextInput">
    <WebLink href={`${url}/src/primitives/TextInput`} text="Source Code" />

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
        example={{
          render: () => <PropAutoFocus />,
        }}
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
            The string that will be rendered in an empty <Code>TextInput</Code>{' '}
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
        name="style?"
        typeInfo="style"
        description={`<StyleList
            stylePropTypes={[
              {
                name: '...Text#style'
              },
              {
                label: 'web',
                name: 'resize',
                typeInfo: 'string'
              }
            ]}
          />`}
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
        name="value?"
        typeInfo="string"
        description={
          <AppText>
            The value to show for the text input. <Code>TextInput</Code> is a
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
        name="clear"
        typeInfo="() => void"
        description="Clear the text from the input."
      />
      <DocItem
        name="focus"
        typeInfo="() => void"
        description="Focus the input."
      />
    </Section>
    <Section title="More examples">
      <DocItem
        description="TextInput events"
        example={{
          render: () => <TextInputEvents />,
        }}
      />
      <DocItem
        description="Rewrite (<sp> to '_' with maxLength)"
        example={{
          render: () => <TextInputRewrite />,
        }}
      />
      <DocItem
        description="Rewrite (no spaces allowed)"
        example={{
          render: () => <TextInputRewriteInvalidCharacters />,
        }}
      />
      <DocItem
        description="Wrapped in a Button"
        example={{
          render: () => <TouchableWrapper />,
        }}
      />
    </Section>
  </UIExplorer>
);
storiesOf('Primitives', module).add('TextInput', TextInputScreen);
