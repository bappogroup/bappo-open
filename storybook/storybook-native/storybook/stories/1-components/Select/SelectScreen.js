import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../ui-explorer';
import GithubUsers from './examples/GithubUsers';
import Multiselect from './examples/Multiselect';
import States from './examples/States';

const SelectScreen = () => (
  <UIExplorer title="Select" url="1-components/Select">
    <Description>
      <AppText>
        Select is an input that let you pick value(s) from a dropdown.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="accessibilityLabel?"
        typeInfo="string"
        description={
          <AppText>
            Overrides the text that's read by the screen reader when the user interacts with the
            element.
            On web: it is stored as attribute "aria-label".
            On native: it uses the accessibilityLabel prop.
          </AppText>
        }
      />

      <DocItem
        name="autoFocus?"
        typeInfo="boolean = false"
        description={
          <AppText>
            If <Code>true</Code>, focuses the input on <Code>componentDidMount</Code>.
          </AppText>
        }
      />

      <DocItem
        name="clearable?"
        typeInfo="boolean = true"
        description={
          <AppText>
            If <Code>true</Code>, the input value can be cleared by pressing a button.
          </AppText>
        }
      />

      <DocItem
        name="isLoading?"
        typeInfo="boolean = false"
        description={
          <AppText>
            If <Code>true</Code>, a spinner is displayed.
          </AppText>
        }
      />

      <DocItem
        name="multi?"
        typeInfo="boolean = false"
        description="If true, the input becomes a multi-select."
        example={{
          render: () => <Multiselect />,
        }}
      />

      <DocItem
        name="noResultsText?"
        typeInfo="string"
        description="Text to show when there are no search results."
      />

      <DocItem
        name="onBlur?"
        typeInfo="() => void"
        description="Callback that is called when the input is blurred."
      />

      <DocItem
        name="onFocus?"
        typeInfo="() => void"
        description="Callback that is called when the input is focused."
      />

      <DocItem
        name="onInputChange?"
        typeInfo="(text: string) => void"
        description="Callback that is called when the search input's text changes."
      />

      <DocItem
        name="onValueChange?"
        typeInfo="(value: Value) => void"
        description="Callback that is called when the input value changes."
      />

      <DocItem
        name="options?"
        typeInfo="Array<Option>"
        description="An array of options."
      />

      <DocItem
        name="placeholder?"
        typeInfo="string"
        description="The string that will be rendered when there is no value."
      />

      <DocItem
        name="readOnly?"
        typeInfo="boolean = false"
        description={
          <AppText>
            If <Code>true</Code>, the input is not editable.
          </AppText>
        }
      />

      <DocItem
        name="renderDropdownIcon?"
        typeInfo="() => ?React.Element<any>"
        description="Function to render the dropdown icon."
      />

      <DocItem
        name="renderOption?"
        typeInfo="(info: { index: number, option: Option }) => ?React.Element<any>"
        description="Function to render an option."
      />

      <DocItem
        name="searchable?"
        typeInfo="boolean = true"
        description={
          <AppText>
            If <Code>true</Code>, user can use the text input to filter options.
          </AppText>
        }
      />

      <DocItem
        name="style?"
        typeInfo="style"
        description="Same as View"
      />

      <DocItem
        name="testID?"
        typeInfo="string"
        description={
          <AppText>
            Used to locate this view in end-to-end tests.
            On web: it is stored as data attribute "data-testid".
            On native: it uses the testID prop.
          </AppText>
        }
      />

      <DocItem
        name="value?"
        typeInfo="Value"
        description="The value of the select input."
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="States"
        example={{
          render: () => <States />,
        }}
      />

      <DocItem
        description="AsyncSelect"
        example={{
          render: () => <GithubUsers />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Select', SelectScreen);
