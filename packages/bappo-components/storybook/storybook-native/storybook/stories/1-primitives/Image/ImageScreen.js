import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer';
import Orientation from './examples/Orientation';
import PropSource from './examples/PropSource';

const ImageScreen = () => (
  <UIExplorer title="Image" url="1-primitives/Image">
    <Description>
      An accessibile image component with support for image resizing, default
      image, and child content.
    </Description>

    <Section title="Props">
      <DocItem
        name="source"
        typeInfo="{ uri: string }"
        description={
          <AppText>
            <Code>uri</Code> is a string representing the resource identifier
            for the image, which could be an http address or a base64 encoded
            image.
          </AppText>
        }
        example={{
          render: () => <PropSource />,
        }}
      />

      <DocItem 
      name="style" 
      typeInfo="?style" 
      description={
          <AppText>
            If no style is applied, the height defaults to 0 and the image will remain invisible.
          </AppText>

      />
    </Section>

    <Section title="Example">
      <DocItem
        description="Automatically detects orientation"
        example={{
          render: () => <Orientation />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Primitives', module).add('Image', ImageScreen);
