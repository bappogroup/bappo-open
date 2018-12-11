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
import PropPointerEvents from './examples/PropPointerEvents';

const ViewScreen = () => (
  <UIExplorer title="View" url="1-primitives/View">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/primitives/View"
      text="Source Code"
    />

    <Description>
      <AppText>
        View is the fundamental UI building block. It is a component that
        supports style, layout with flexbox, and accessibility controls. It can
        be nested inside another View and has 0-to-many children of any type.
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
        name="children?"
        typeInfo="React.Node"
        description="Child content"
      />

      <DocItem
        name="pointerEvents?"
        typeInfo="enum('auto', 'box-only', 'box-none', 'none') = 'auto'"
        description={
          <AppText>
            Controls whether the <Code>View</Code> can be the target of touch
            events. The enhanced <Code>pointerEvents</Code> modes provided are
            not part of the CSS spec, therefore, <Code>pointerEvents</Code> is
            excluded from <Code>style</Code>. <Code>box-none</Code> preserves
            pointer events on the element's children; <Code>box-only</Code>{' '}
            disables pointer events on the element's children.
          </AppText>
        }
        example={{
          render: () => <PropPointerEvents />,
        }}
      />

      <DocItem
        name="style?"
        typeInfo="style"
        description={'<StyleList stylePropTypes={stylePropTypes} />'}
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
    </Section>
  </UIExplorer>
);

storiesOf('Primitives', module).add('View', ViewScreen);
