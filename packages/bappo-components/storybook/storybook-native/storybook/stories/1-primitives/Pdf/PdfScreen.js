import React from 'react';
import { url } from '../../../url';
import { View } from 'bappo-components';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
  WebLink,
} from '../../../ui-explorer';
import PropSource from './examples/PropSource';

const TextScreen = () => (
  <UIExplorer title="Pdf" url="1-primitives/Pdf">
    <WebLink href={`${url}/src/primitives/Pdf`} text="Source Code" />
    <WebLink
      href={`${url}/storybook/storybook-native/storybook/stories/1-primitives/Pdf/examples`}
      text="Examples Code"
    />
    <Description>
      <AppText>Pdf is component for displaying PDF documents.</AppText>
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
        name="source"
        typeInfo="{ uri: string } | { definition: PdfDefinition }"
        description={
          <AppText>
            <Code>uri</Code> is a string representing the resource identifier
            for the PDF file, which could be an http address or a base64 encoded
            file.
            <Code>definition</Code> is an object describing a PDF document.
            Please refer to{' '}
            <WebLink
              href="https://pdfmake.github.io/docs/document-definition-object/"
              text="pdfmake.org"
            />
            .
          </AppText>
        }
        example={{
          render: () => <PropSource />,
        }}
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
    </Section>
  </UIExplorer>
);

storiesOf('Primitives', module).add('Pdf', TextScreen);
