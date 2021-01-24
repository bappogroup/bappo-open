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

    .c2 {
      outline: none;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      cursor: pointer;
      height: 38px;
      width: 56px;
      padding: 9px;
    }

    .c5 {
      background-color: white;
      border-radius: 50%;
      height: 20px;
      width: 20px;
      box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
    }

    .c4 {
      background-color: transparent;
      border-radius: 50%;
      padding: 9px;
      position: absolute;
      top: 0px;
      left: 18px;
      -webkit-transition: left 0.2s,background-color 0.2s;
      transition: left 0.2s,background-color 0.2s;
    }

    .c1:hover .c4,
    .c1:focus .c4 {
      background-color: #00000029;
    }

    .c3 {
      background-color: #FF7800;
      border-radius: 12px;
      width: 100%;
      height: 100%;
    }

    <div
      aria-checked="true"
      class="c0 c1 c2"
      data-testid="test"
      role="checkbox"
      tabindex="0"
    >
      <div
        class="c0 c3"
      />
      <div
        class="c0 c4"
      >
        <div
          class="c0 c5"
        />
      </div>
    </div>
  `);
});
