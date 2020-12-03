import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';

import Switch from '..';

test('should render a switch with value set to true', () => {
  const { getByTestId } = render(<Switch testID="test" value />);
  expect(getByTestId('test')).toMatchInlineSnapshot(`
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
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      outline: none;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      background-color: #FF7800;
      border-radius: 12px;
      cursor: pointer;
      height: 24px;
      width: 48px;
    }

    .c2 {
      background-color: white;
      border-radius: 50%;
      height: 20px;
      width: 20px;
      position: absolute;
      top: 2px;
      bottom: 2px;
      left: 26px;
      -webkit-transition: left 0.2s;
      transition: left 0.2s;
    }

    <div
      aria-checked="true"
      class="c0 c1"
      data-testid="test"
      role="checkbox"
      tabindex="0"
    >
      <div
        class="c0 c2"
        position="right"
      />
    </div>
  `);
});

test('should render a switch with value set to false', () => {
  const { getByTestId } = render(<Switch testID="test" value={false} />);
  expect(getByTestId('test')).toMatchInlineSnapshot(`
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
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      outline: none;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      background-color: #B0ADAB;
      border-radius: 12px;
      cursor: pointer;
      height: 24px;
      width: 48px;
    }

    .c2 {
      background-color: white;
      border-radius: 50%;
      height: 20px;
      width: 20px;
      position: absolute;
      top: 2px;
      bottom: 2px;
      left: 2px;
      -webkit-transition: left 0.2s;
      transition: left 0.2s;
    }

    <div
      aria-checked="false"
      class="c0 c1"
      data-testid="test"
      role="checkbox"
      tabindex="0"
    >
      <div
        class="c0 c2"
        position="left"
      />
    </div>
  `);
});
