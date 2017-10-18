import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../ui-explorer';
import PropChildren from './examples/PropChildren';
import PropNumberOfLines from './examples/PropNumberOfLines';

const TextScreen = () => (
  <UIExplorer title="Text" url="1-components/Text">
    <Description>
      <AppText>
        Text is component for displaying text. It supports style and inherits typographic styles
        from ancestor elements.
      </AppText>
      <AppText>
        Text is unique relative to layout: child elements use text layout ("inline") rather than
        flexbox layout. This means that elements inside of a Text are not rectangles, as they wrap
        when reaching the edge of their container.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="React.Node"
        description={
          <AppText>
            Child content. Nested text components will inherit the styles of their parents (only
            backgroundColor is inherited from non-<Code>Text</Code> parents).
          </AppText>
        }
        example={{
          render: () => <PropChildren />,
        }}
      />

      <DocItem
        name="numberOfLines?"
        typeInfo="number"
        description="Truncates the text with an ellipsis after this many lines."
        example={{
          render: () => <PropNumberOfLines />,
        }}
      />

      <DocItem
        name="selectable?"
        typeInfo="boolean"
        description="When false, the text is not selectable. The default value is false."
      />

      <DocItem
        name="style?"
        typeInfo="style"
        description="Styles"
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Text', TextScreen);
