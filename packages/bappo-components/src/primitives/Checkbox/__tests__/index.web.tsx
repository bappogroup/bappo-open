import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';

import Checkbox from '..';

test('should render a checkbox with value set to true', () => {
  const { getByTestId } = render(<Checkbox testID="test" checked />);
  expect(getByTestId('test')).toMatchInlineSnapshot(`
    .c3 {
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

    .c4 {
      font-family: Material Icons;
      font-size: 16px;
      text-align: center;
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
      vertical-align: middle;
      outline: none;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      cursor: pointer;
      width: 24px;
      height: 24px;
      border-radius: 3px;
    }

    .c5 {
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      color: #FF7800;
      height: 24px;
      line-height: 24px;
      width: 24px;
      font-size: 24px;
      -webkit-transition: box-shadow 0.2s;
      transition: box-shadow 0.2s;
      border-radius: 3px;
    }

    .c1:hover .c5,
    .c1:focus .c5 {
      box-shadow: inset 0 0 0 3px #00000029;
    }

    <div
      aria-checked="true"
      class="c0 c1 c2"
      data-testid="test"
      role="checkbox"
      tabindex="0"
    >
      <div
        class="c3 c4 sc-AxhCb c5"
        data-text-as-pseudo-element=""
      />
    </div>
  `);
});

test('should render a checkbox with value set to false', () => {
  const { getByTestId } = render(<Checkbox testID="test" checked={false} />);
  expect(getByTestId('test')).toMatchInlineSnapshot(`
    .c3 {
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

    .c4 {
      font-family: Material Icons;
      font-size: 16px;
      text-align: center;
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
      vertical-align: middle;
      outline: none;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      cursor: pointer;
      width: 24px;
      height: 24px;
      border-radius: 3px;
    }

    .c5 {
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      color: #B0ADAB;
      height: 24px;
      line-height: 24px;
      width: 24px;
      font-size: 24px;
      -webkit-transition: box-shadow 0.2s;
      transition: box-shadow 0.2s;
      border-radius: 3px;
    }

    .c1:hover .c5,
    .c1:focus .c5 {
      box-shadow: inset 0 0 0 3px #00000029;
    }

    <div
      aria-checked="false"
      class="c0 c1 c2"
      data-testid="test"
      role="checkbox"
      tabindex="0"
    >
      <div
        class="c3 c4 sc-AxhCb c5"
        data-text-as-pseudo-element=""
      />
    </div>
  `);
});

test('should render a checkbox that is disabled', () => {
  const { getByTestId } = render(<Checkbox testID="test" disabled />);
  expect(getByTestId('test')).toMatchInlineSnapshot(`
    .c2 {
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

    .c3 {
      font-family: Material Icons;
      font-size: 16px;
      text-align: center;
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

    .c1 {
      vertical-align: middle;
      outline: none;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      cursor: not-allowed;
      width: 24px;
      height: 24px;
      border-radius: 3px;
    }

    .c4 {
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      color: gray;
      height: 24px;
      line-height: 24px;
      width: 24px;
      font-size: 24px;
      -webkit-transition: box-shadow 0.2s;
      transition: box-shadow 0.2s;
      border-radius: 3px;
      background-color: #00000029;
    }

    <div
      aria-checked="false"
      class="c0 c1"
      data-testid="test"
      role="checkbox"
      tabindex="0"
    >
      <div
        class="c2 c3 sc-AxhCb c4"
        data-text-as-pseudo-element=""
      />
    </div>
  `);
});
