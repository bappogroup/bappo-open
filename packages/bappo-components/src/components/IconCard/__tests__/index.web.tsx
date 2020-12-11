import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';

import Colors from '../../../apis/Colors';
import IconCard from '..';

test('should render an IconCard', () => {
  const { getByTestId } = render(
    <IconCard
      icon="airport-shuttle"
      color={Colors.BLUE}
      badge={46}
      size="large"
      text="Riders"
      onPress={() => console.log('test click')}
      testID="test"
    />,
  );
  expect(getByTestId('test')).toMatchInlineSnapshot(`
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

    .c1 * {
      cursor: pointer;
    }

    .c6 {
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
      cursor: text;
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }

    .c5 {
      padding: 2px;
      border-radius: 20px;
      background: #c23934;
      position: absolute;
      top: -5px;
      right: -5px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
    }

    .c7 {
      color: white;
      font-size: 12px;
    }

    .c8 {
      font-family: Material Icons;
      font-size: 16px;
      text-align: center;
    }

    .c11 {
      height: 24px;
      line-height: 24px;
      font-size: 16px;
    }

    .c2 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 120px;
      margin: 12px;
    }

    .c4 {
      padding: 8px;
      border-radius: 3px;
      width: 100%;
      height: 120px;
      background: #0070D2;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin: 8px;
    }

    .c9 {
      -webkit-flex: none;
      -ms-flex: none;
      flex: none;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      color: white;
      height: 24px;
      line-height: 24px;
      width: 24px;
      font-size: 16px;
      width: 48px;
      font-size: 40px;
    }

    <div
      class="c0 c1 c2"
      data-testid="test"
      role="button"
      tabindex="0"
    >
      <div
        class="c3 c4"
      >
        <div
          class="c3 c5"
        >
          <div
            class="c6 c7"
            data-text-as-pseudo-element="46"
          />
        </div>
        <div
          class="c6 c8 sc-AxmLO c9"
          data-text-as-pseudo-element=""
        />
      </div>
      <div
        class="c10 c11 "
      >
        Riders
      </div>
    </div>
  `);
});
