/* eslint-disable react/jsx-sort-props */

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
import Example from './examples/tabPickerExample';
import Example2 from './examples/tabPickerExample2';

const TabPickerScreen = () => (
  <UIExplorer title="TabPicker" url="2-components/TabPicker">
    <WebLink
      href="https://github.com/bappogroup/bappo-components/tree/master/src/primitives/TabPicker"
      text="Source Code"
    />
    <Description>
      <AppText>TabPicker</AppText>
    </Description>

    <DocItem
      name="options"
      typeInfo="$ReadOnlyArray<Option>"
      description={
        <AppText>
          An array of arbitrary objects. E.g.
          <Code>
            {`[{ value: 'one', label: 'one' }, { value: 'two', label: 'Two'}]`}
          </Code>
        </AppText>
      }
    />

    <DocItem
      name="selected"
      typeInfo="Object or Array of Objects"
      description={
        <AppText>
          <Section>An Object (if multi is off) </Section>
          <Section>
            An array of objects (if multi is on), where each array item is a
            pointer to an item in the options array. eg{' '}
            <Code>
              {`options = [{ ... }, { ... }, { ... }]; selected = [options[0], options[2]];`}
            </Code>
          </Section>
        </AppText>
      }
    />

    <DocItem
      name="optionToString"
      typeInfo="(option) => {}"
      description={
        <AppText>
          Convert an option to string for Label display, e.g.
          {` (option) => option.label `}
        </AppText>
      }
    />

    <DocItem
      name="multi"
      typeInfo="Boolean"
      description={<AppText>Enables multiple selections</AppText>}
    />

    <DocItem
      name="onChange"
      typeInfo="(selected}) => {}"
      description={
        <AppText>
          <Section>
            If Multi if off, this function returns the selected option.
          </Section>
          <Section>
            {' '}
            If Multi is on, it returns an array of the selected options.{' '}
          </Section>
        </AppText>
      }
    />

    <DocItem
      description="Multi Picker"
      example={{
        render: () => <Example />,
      }}
    />

    <DocItem
      description="Single Picker"
      example={{
        render: () => <Example2 />,
      }}
    />

    <DocItem
      description={`
        import React from 'react';
        import { TabPicker } from 'bappo-components';
        
        const options = [
          { label: 'Mon', value: 'mon' },
          { label: 'Tue', value: 'tue' },
          { label: 'Wed', value: 'wed' },
          { label: 'Thu', value: 'thu' },
          { label: 'Fri', value: 'fri' },
          { label: 'Sat', value: 'sat' },
          { label: 'Sun', value: 'sun' },
        ];
        
        class TabPickerExample extends React.Component {
          state = {
            selected: [options[0], options[1], options[2], options[3], options[4]],
          };
        
          render() {
            return (
              <TabPicker
                options={options}
                multi
                selected={this.state.selected}
                optionToString={option => option.label}
                onChange={selected => this.setState({ selected })}
              />
            );
          }
        }
        
        export default TabPickerExample;      
      `}
    />
  </UIExplorer>
);

storiesOf('Components', module).add('TabPicker', TabPickerScreen);
