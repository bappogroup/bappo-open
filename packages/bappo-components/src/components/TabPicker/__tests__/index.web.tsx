import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import userEvent from '@testing-library/user-event';
import React from 'react';
import { act, render } from 'react-testing-library';

import TabPicker from '..';

const options = [
  { label: 'Mon', value: 'mon' },
  { label: 'Tue', value: 'tue' },
  { label: 'Wed', value: 'wed' },
  { label: 'Thu', value: 'thu' },
  { label: 'Fri', value: 'fri' },
  { label: 'Sat', value: 'sat' },
  { label: 'Sun', value: 'sun' },
];

test('should render a tab picker with two options selected', () => {
  let selected;

  const { getByTestId } = render(
    <TabPicker
      options={options}
      multi
      selected={selected}
      optionToString={(option) => `${option.label}`}
      onChange={(value) => (selected = value)}
      testID="test"
    />,
  );

  //Simulate mouse click to select options
  act(() => {
    userEvent.click(
      getByTestId('test').querySelector('[data-text-as-pseudo-element="Mon"]')!,
    );
    userEvent.click(
      getByTestId('test').querySelector('[data-text-as-pseudo-element="Fri"]')!,
    );
  });

  expect(getByTestId('test')).toMatchInlineSnapshot(`
    .c5 {
      box-sizing: border-box;
      color: #191E26;
      display: inline;
      -webkit-box-flex: 0;
      -webkit-flex-grow: 0;
      -ms-flex-positive: 0;
      flex-grow: 0;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
      font-size: 14px;
      position: relative;
      white-space: pre-wrap;
      word-wrap: break-word;
      -ms-hyphens: auto;
      cursor: inherit;
    }

    .c0 {
      -webkit-align-items: stretch;
      -webkit-box-align: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;
      border-color: #191E26;
      border-style: solid;
      border-width: 0;
      box-sizing: border-box;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-flex: 0;
      -webkit-flex-grow: 0;
      -ms-flex-positive: 0;
      flex-grow: 0;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      position: relative;
      min-height: 0;
      min-width: 0;
    }

    .c2 {
      -webkit-align-items: stretch;
      -webkit-box-align: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;
      border-color: #191E26;
      border-style: solid;
      border-width: 0;
      box-sizing: border-box;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-flex: 0;
      -webkit-flex-grow: 0;
      -ms-flex-positive: 0;
      flex-grow: 0;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      position: relative;
      min-height: 0;
      min-width: 0;
    }

    .c3 {
      -webkit-align-items: stretch;
      -webkit-box-align: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;
      border-color: #191E26;
      border-style: solid;
      border-width: 0;
      box-sizing: border-box;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-flex: 0;
      -webkit-flex-grow: 0;
      -ms-flex-positive: 0;
      flex-grow: 0;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      position: relative;
      min-height: 0;
      min-width: 0;
      background-color: transparent;
      border-color: transparent;
      border-width: 0;
      padding: 0;
      text-align: left;
      outline: none;
      cursor: pointer;
    }

    .c3 * {
      cursor: pointer;
    }

    .c1 {
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      max-width: 400px;
    }

    .c4 {
      min-width: 50px;
      height: 40px;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #f8f8f8;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      margin-bottom: 1px;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
    }

    .c4:hover {
      background-color: #eee;
    }

    .c6 {
      min-width: 50px;
      height: 40px;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #f8f8f8;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
      margin-bottom: 1px;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
    }

    .c6:hover {
      background-color: #eee;
    }

    .c7 {
      min-width: 50px;
      height: 40px;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #f8f8f8;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      margin-bottom: 1px;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
    }

    .c7:hover {
      background-color: #eee;
    }

    <div
      class="c0 c1"
      data-testid="test"
    >
      <div
        class="c2 c3 c4"
        role="button"
        style="transition-duration: 0.25s; opacity: 1;"
        tabindex="0"
      >
        <div
          class="c5"
          data-text-as-pseudo-element="Mon"
        />
      </div>
      <div
        class="c2 c3 c6"
        role="button"
        tabindex="0"
      >
        <div
          class="c5"
          data-text-as-pseudo-element="Tue"
        />
      </div>
      <div
        class="c2 c3 c6"
        role="button"
        tabindex="0"
      >
        <div
          class="c5"
          data-text-as-pseudo-element="Wed"
        />
      </div>
      <div
        class="c2 c3 c6"
        role="button"
        tabindex="0"
      >
        <div
          class="c5"
          data-text-as-pseudo-element="Thu"
        />
      </div>
      <div
        class="c2 c3 c6"
        role="button"
        style="transition-duration: 0.25s; opacity: 1;"
        tabindex="0"
      >
        <div
          class="c5"
          data-text-as-pseudo-element="Fri"
        />
      </div>
      <div
        class="c2 c3 c6"
        role="button"
        tabindex="0"
      >
        <div
          class="c5"
          data-text-as-pseudo-element="Sat"
        />
      </div>
      <div
        class="c2 c3 c7"
        role="button"
        tabindex="0"
      >
        <div
          class="c5"
          data-text-as-pseudo-element="Sun"
        />
      </div>
    </div>
  `);
});
