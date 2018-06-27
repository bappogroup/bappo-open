import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer';
import Minimal from './examples/Minimal';

const DatePickerScreen = () => (
  <UIExplorer title="DatePicker" url="2-components/DatePicker">
    <Description>
      <AppText>
        DatePicker is an input that lets you pick a date.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="accessibilityLabel?"
        typeInfo="string"
        description="Same as View"
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
        name="displayFormat?"
        typeInfo="string = 'YYYY-MM-DD'"
        description={
          <AppText>
            Date format of the displayed value. Refer to{' '}
            <a
              href="http://momentjs.com/docs/#/displaying/format/"
              rel="noopener noreferrer"
              target="_blank"
            >
              this
            </a>{' '}
            for more details.
          </AppText>
        }
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
        name="onValueChange?"
        typeInfo="(value: Value) => void"
        description="Callback that is called when the input value changes."
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
        name="style?"
        typeInfo="style"
        description="Same as View"
      />

      <DocItem
        name="testID?"
        typeInfo="string"
        description="Same as View"
      />

      <DocItem
        name="value?"
        typeInfo="Value"
        description="The value of the date input."
      />

      <DocItem
        name="valueFormat?"
        typeInfo="string = 'YYYY-MM-DD'"
        description={
          <AppText>
            Date format of the input value. Refer to{' '}
            <a
              href="http://momentjs.com/docs/#/displaying/format/"
              rel="noopener noreferrer"
              target="_blank"
            >
              this
            </a>{' '}
            for more details.
          </AppText>
        }
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="Minimal"
        example={{
          render: () => <Minimal />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('DatePicker', DatePickerScreen);
