import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import userEvent from '@testing-library/user-event';
import React from 'react';
import { getByText, render } from 'react-testing-library';

import Menu from '..';

const actions = [
  {
    icon: 'home',
    label: 'menu1',
    onPress: () => console.log('menu1 pressed'),
  },
  {
    label: 'menu2',
    onPress: () => console.log('menu2 pressed'),
  },
];

test('should render a menu with two menu items', () => {
  const { getByTestId, debug, container } = render(
    <Menu icon="cloud" testID="test">
      <Menu.Item
        icon="home"
        label="menu1"
        onPress={() => console.log('menu1 pressed')}
      />
      <Menu.Item label="menu2" onPress={() => console.log('menu2 pressed')} />
    </Menu>,
  );

  //Simulate mouse click to expand menu
  userEvent.click(getByTestId('test').querySelector('div')!);

  expect(getByTestId('overlay-container')).toMatchInlineSnapshot(`
    .c7 {
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
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      white-space: nowrap;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .c8 {
      font-family: Material Icons;
      font-size: 16px;
      text-align: center;
    }

    .c9 {
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

    .c4 {
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

    .c5 {
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

    .c5 * {
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

    .c6 {
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      border-bottom: 1px solid #ddd;
      height: 40px;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding-left: 8px;
    }

    .c6:hover {
      background-color: #fafafa;
    }

    .c3 {
      max-height: 50vh;
      overflow-y: scroll;
      overflow-x: scroll;
    }

    .c11 {
      padding-left: 4px;
      -webkit-box-flex: 1;
      -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      -webkit-flex-shrink: 1;
      -ms-flex-negative: 1;
      flex-shrink: 1;
      max-width: initial;
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
          class="c0 c3"
        >
          <div
            class="c4 c5 c6"
            role="button"
            tabindex="0"
          >
            <div
              class="c7 c8 c9"
              data-text-as-pseudo-element=""
            />
            <div
              class="c10 sc-AxmLO c11"
              data-text-as-pseudo-element="menu1"
            />
          </div>
          <div
            class="c4 c5 c6"
            role="button"
            tabindex="0"
          >
            <div
              class="c10 sc-AxmLO c11"
              data-text-as-pseudo-element="menu2"
            />
          </div>
        </div>
      </div>
    </div>
  `);
});
