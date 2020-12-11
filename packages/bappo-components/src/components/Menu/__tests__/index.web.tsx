import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from 'react-testing-library';

import Menu from '..';

test('should render a menu with two menu items', () => {
  const { getByTestId } = render(
    <Menu icon="cloud" testID="test">
      <Menu.Item icon="home" onPress={() => console.log('menu1 pressed')}>
        menu1
      </Menu.Item>
      <Menu.Item onPress={() => console.log('menu2 pressed')}>menu2</Menu.Item>
    </Menu>,
  );

  //Simulate mouse click to expand menu
  userEvent.click(getByTestId('test').querySelector('div')!);

  expect(getByTestId('overlay-container')).toMatchInlineSnapshot(`
    .c9 {
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

    .c10 {
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

    .c6 {
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

    .c7 {
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

    .c7 * {
      cursor: pointer;
    }

    .c1 {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,0.5);
    }

    .c2 {
      position: absolute;
      background-color: white;
      border-top: 1px solid #ccc;
      box-shadow: 0 -1px 0 rgba(0,0,0,0.06);
      bottom: 0;
      left: 0;
      right: 0;
    }

    .c3 {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
    }

    .c5 {
      min-height: 100%;
    }

    .c8 {
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      border-bottom: 1px solid #ddd;
      height: 40px;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }

    .c8:hover {
      background-color: #fafafa;
    }

    .c4 {
      max-height: 50vh;
    }

    .c11 {
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 24px;
      line-height: 24px;
      width: 24px;
      font-size: 16px;
      margin-left: 8px;
    }

    .c12 {
      padding-right: 8px;
    }

    .c13 {
      padding-right: 8px;
      padding-left: 8px;
    }

    <div
      aria-modal="true"
      class="c0 c1"
      data-testid="overlay-container"
    >
      <div
        class="c0 c2"
      >
        <div
          class="c0 c3 c4"
        >
          <div
            class="c0 c5"
          >
            <div
              class="c6 c7 c8"
              role="button"
              tabindex="0"
            >
              <div
                class="c9 c10 c11"
                data-text-as-pseudo-element=""
              />
              <div
                class="c9 c12"
                data-text-as-pseudo-element="menu1"
              />
            </div>
            <div
              class="c6 c7 c8"
              role="button"
              tabindex="0"
            >
              <div
                class="c9 c13"
                data-text-as-pseudo-element="menu2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `);
});
