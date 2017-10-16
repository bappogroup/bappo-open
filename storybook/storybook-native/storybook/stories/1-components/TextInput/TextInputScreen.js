import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../ui-explorer';
import PropMultiline from './examples/PropMultiline';
// import PropNumberOfLines from './examples/PropNumberOfLines';
import PropPlaceholder from './examples/PropPlaceholder';
import PropReadOnly from './examples/PropReadOnly';
import TextInputEvents from './examples/TextInputEvents';
import TextInputRewrite, { TextInputRewriteInvalidCharacters } from './examples/Rewrite';
import TouchableWrapper from './examples/TouchableWrapper';

const TextInputScreen = () => (
  <UIExplorer title="TextInput" url="1-components/TextInput">
    <Description>
      <AppText>
        Accessible single- and multi-line text input via a keyboard. Supports features such as
        auto-focus, placeholder text, and event callbacks. Note: some props are exclusive to or
        excluded from <Code>multiline</Code>.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="autoFocus?"
        typeInfo="boolean = false"
        description="If `true`, focuses the input on `componentDidMount`. Only the first form element in a document with `autofocus` is focused."
      />

      <DocItem
        name="defaultValue?"
        typeInfo="string"
        description={
          <AppText>
            Provides an initial value that will change when the user starts typing. Useful for
            simple use-cases where you don't want to deal with listening to events and updating the{' '}
            <Code>value</Code> prop to keep the controlled state in sync.
          </AppText>
        }
      />

      <DocItem
        name="multiline?"
        typeInfo="boolean = false"
        description="If `true`, the text input can be multiple lines."
        example={{
          render: () => <PropMultiline />,
        }}
      />

      {/*<DocItem
        name="numberOfLines?"
        typeInfo="number"
        description="Sets the number of lines for a multiline `TextInput`. (Requires `multiline` to be `true`.)"
        example={{
          render: () => <PropNumberOfLines />,
        }}
      />*/}

      <DocItem
        name="onBlur?"
        typeInfo="(event: Event) => void"
        description="Callback that is called when the text input is blurred."
      />

      <DocItem
        name="onFocus?"
        typeInfo="(event: Event) => void"
        description="Callback that is called when the text input is focused."
      />

      <DocItem
        name="onValueChange?"
        typeInfo="(value: string) => void"
        description="Callback that is called when the text input's text changes. The text is passed as an argument to the callback handler."
      />

      <DocItem
        name="placeholder?"
        typeInfo="string"
        description="The string that will be rendered in an empty `TextInput` before text has been entered."
        example={{
          render: () => <PropPlaceholder />,
        }}
      />

      <DocItem
        name="readOnly?"
        typeInfo="boolean = false"
        description="If `true`, text is not editable (i.e., read-only).  "
        example={{
          render: () => <PropReadOnly />,
        }}
      />

      <DocItem
        name="style?"
        typeInfo="style"
        description={
          `<StyleList
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
          />`
        }
      />

      <DocItem
        name="value?"
        typeInfo="string"
        description={
          <AppText>
            The value to show for the text input. <Code>TextInput</Code> is a controlled component,
            which means the native <Code>value</Code> will be forced to match this prop if provided.
            Read about how{' '}
            <AppText
              href="https://facebook.github.io/react/docs/forms.html"
              target="_blank"
            >
              React form components
            </AppText>{' '}
            work. To prevent user edits to the value set <Code>{'readOnly={true}'}</Code>.
          </AppText>
        }
      />
    </Section>

    <Section title="Instance methods">
      <DocItem name="blur" typeInfo="() => void" description="Blur the input." />

      <DocItem
        name="clear"
        typeInfo="() => void"
        description="Clear the text from the input."
      />

      <DocItem name="focus" typeInfo="() => void" description="Focus the input." />
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

storiesOf('Components', module).add('TextInput', TextInputScreen);
