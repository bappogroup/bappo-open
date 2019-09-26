import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  storiesOf,
  WebLink,
} from '../../../ui-explorer';
import Example from './examples/Example';

const ModalWizardScreen = () => (
  <UIExplorer title="ModalWizard" url="2-components/ModalWizard">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/components/ModalWizard"
      text="Source Code"
    />

    <Description>
      <AppText>
        Multi-step wizard inside a modal. The body of each screen is scrollable.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="onRequestClose"
        typeInfo="() => void"
        description="Callback function that closes the modal. This is required because some devices have hardware to request closing the modal (e.g. Android back button)"
      />

      <DocItem
        name="screens"
        typeInfo="array of 'screen' object"
        description="Specify screens for all steps. See below for screen object's props."
      />

      <DocItem
        name="screen.title?"
        typeInfo="string"
        description="Title of the current screen. Defaults to 'Wizard'"
      />

      <DocItem
        name="screen.render"
        typeInfo="() => ReactElement"
        description="Renders the body for current screen. If it's a form, the top-level element must be Form imported from bappo-components."
      />

      <DocItem
        name="screen.isForm?"
        typeInfo="boolean"
        description="Whether the current screen is a form. Defaults to false"
      />

      <DocItem
        name="visible?"
        typeInfo="boolean"
        description="Determines whether the modal is visible."
      />

      <DocItem
        name="onFinish?"
        typeInfo="(values: mixed) => void"
        description="Function to be called when the wizard is finished, i.e. user clicking on 'Submit' button in the last step."
      />

      <DocItem
        name="submitButtonText?"
        typeInfo="string"
        description="Submit button text in the last step. Default is 'Submit'"
      />

      <DocItem
        name="startFromStep?"
        typeInfo="number"
        description="Which step to start from. Default is 0"
      />
    </Section>

    <Section title="Examples">
      <WebLink
        href="https://github.com/bappogroup/bappo-components/tree/master/storybook/storybook-native/storybook/stories/2-components/ModalWizard/examples"
        text="Examples Code"
      />
      <DocItem
        description="Example of 2 steps: a form and a summary screen"
        example={{
          render: () => <Example />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('ModalWizard', ModalWizardScreen);
