import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer';

const FormScreen = () => (
  <UIExplorer title="Form" url="1-primitives/Form">
    <Description>
      <AppText>Form.</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="?React.Node | ((formState: FormStateAndHelpersAndActions) => React.Node)"
        description="Body of the form. Can be a React node or a render function which will receive the form state as argument."
      />

      <DocItem
        name="initialValues?"
        typeInfo="mixed"
        description={
          <AppText>
            Initial values of the form. It should be in the format of{' '}
            <Code>
              {JSON.stringify({ field1: 'value1', field2: 'value2' })}
            </Code>
          </AppText>
        }
      />

      <DocItem
        name="onSubmit?"
        typeInfo="(values: mixed) => void"
        description="Function to be called when form is submitted."
      />
    </Section>

    <Section title="Form.Field Props">
      <DocItem
        name="component"
        typeInfo="Class<InputComponent>"
        description={
          <AppText>
            A React class component that renders input. It must accept props{' '}
            <Code>onBlur</Code>, <Code>onFocus</Code>,{' '}
            <Code>onValueChange</Code> and <Code>value</Code>. It must also have
            instance methods <Code>blur()</Code> and <Code>focus()</Code>.
          </AppText>
        }
      />

      <DocItem name="label" typeInfo="string" description="Field label." />

      <DocItem name="name" typeInfo="string" description="Field name." />

      <DocItem
        name="props?"
        typeInfo="?{}"
        description="Additional props to pass to the input component."
      />

      <DocItem
        name="validate?"
        typeInfo="FieldValidator | FieldValidator[]"
        description="Function or an array of functions to validate the field."
      />
    </Section>

    <Section title="Form.SubmitButton Props">
      <DocItem
        name="children?"
        typeInfo="?React.Node | ((formState: FormStateAndHelpersAndActions) => React.Node)"
        description="Button children."
      />
    </Section>
  </UIExplorer>
);

storiesOf('Primitives', module).add('Form', FormScreen);
