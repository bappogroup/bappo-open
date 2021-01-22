import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import userEvent from '@testing-library/user-event';
import React from 'react';
import { act, render } from 'react-testing-library';

import ColorPicker from '..';

test('should render a color picker with the default colors and #BBB as the current color.', () => {
  const { getByTestId, debug } = render(
    <ColorPicker testID="test" hex="#BBB" />,
  );

  //Simulate mouse click to expand the color picker
  userEvent.click(getByTestId('test').querySelector('div')!);

  expect(getByTestId('overlay-container')).toMatchInlineSnapshot(`
    .c44 {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-color: transparent;
      border-color: black;
      border-radius: 0;
      border-width: 0;
      box-sizing: border-box;
      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
      font-size: 14px;
      padding: 0;
      outline: none;
      resize: none;
    }

    .c45 {
      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
      font-size: 14px;
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
      background-color: #4D4D4D;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c7 {
      background-color: #999999;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c8 {
      background-color: #FFFFFF;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c9 {
      background-color: #F44E3B;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c10 {
      background-color: #FE9200;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c11 {
      background-color: #FCDC00;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c12 {
      background-color: #DBDF00;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c13 {
      background-color: #A4DD00;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c14 {
      background-color: #68CCCA;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c15 {
      background-color: #73D8FF;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c16 {
      background-color: #AEA1FF;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c17 {
      background-color: #FDA1FF;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c18 {
      background-color: #333333;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c19 {
      background-color: #808080;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c20 {
      background-color: #cccccc;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c21 {
      background-color: #D33115;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c22 {
      background-color: #E27300;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c23 {
      background-color: #FCC400;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c24 {
      background-color: #B0BC00;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c25 {
      background-color: #68BC00;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c26 {
      background-color: #16A5A5;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c27 {
      background-color: #009CE0;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c28 {
      background-color: #7B64FF;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c29 {
      background-color: #FA28FF;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c30 {
      background-color: #000000;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c31 {
      background-color: #666666;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c32 {
      background-color: #B3B3B3;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c33 {
      background-color: #9F0500;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c34 {
      background-color: #C45100;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c35 {
      background-color: #FB9E00;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c36 {
      background-color: #808900;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c37 {
      background-color: #194D33;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c38 {
      background-color: #0C797D;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c39 {
      background-color: #0062B1;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c40 {
      background-color: #653294;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c41 {
      background-color: #AB149E;
      outline: none;
      width: 15px;
      height: 15px;
      float: right;
      marginright: 4px;
      marginbottom: 4px;
      position: relative;
      cursor: pointer;
    }

    .c5 {
      width: 228px;
      clear: both;
    }

    .c4 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
    }

    .c42 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
    }

    .c3 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      padding: 8px 8px 4px 8px;
    }

    .c47 {
      width: 30px;
    }

    .c46 {
      width: 80px;
    }

    .c43 span {
      font-size: 10px;
      color: gray;
    }

    .c56 {
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

    .c52 {
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

    .c53 {
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

    .c53 * {
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

    .c57 {
      font-size: 14px;
      color: #0070D2;
    }

    .c59 {
      font-size: 14px;
      color: white;
    }

    .c54 {
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      border-radius: 4px;
      height: 32px;
      background-color: transparent;
      border-color: transparent;
      border-style: solid;
      border-width: 1px;
      padding-left: 16px;
      padding-right: 16px;
    }

    .c54:hover,
    .c54:focus {
      background-color: white;
      border-color: #DDDBDA;
    }

    .c54:hover *,
    .c54:focus * {
      color: #0070D2;
    }

    .c54:active {
      background-color: #0070D2;
      border-color: #0031AC;
    }

    .c54:active * {
      color: white;
    }

    .c58 {
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      border-radius: 4px;
      height: 32px;
      background-color: #FF7800;
      border-color: #FF7800;
      border-style: solid;
      border-width: 1px;
      padding-left: 16px;
      padding-right: 16px;
    }

    .c58:hover,
    .c58:focus {
      background-color: #FF9333;
      border-color: #FF9333;
    }

    .c58:hover *,
    .c58:focus * {
      color: white;
    }

    .c58:active {
      background-color: #E36A00;
      border-color: #E36A00;
    }

    .c58:active * {
      color: white;
    }

    .c48 {
      background-color: #fafafa;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-box-pack: end;
      -webkit-justify-content: flex-end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      padding: 4px 8px 8px 8px;
    }

    .c55 {
      margin-left: 8px;
    }

    .c49 {
      -webkit-box-flex: 1;
      -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      height: 30px;
    }

    .c51 {
      background-color: #BBB;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      -webkit-transition: background-color 0.2s;
      transition: background-color 0.2s;
      box-shadow: inset 0px 2px 1px -1px rgba(0,0,0,0.2), inset 0px 1px 1px 0px rgba(0,0,0,0.14), inset 0px 1px 3px 0px rgba(0,0,0,0.12);
    }

    .c50 {
      background-position: 0px 0px,10px 10px;
      background-size: 20px 20px;
      background-image: linear-gradient( 45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100% ), linear-gradient(45deg,#eee 25%,white 25%,white 75%,#eee 75%,#eee 100%);
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
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
            class="c0 c4"
          >
            <div
              class="c5"
            >
              <div
                class="c6"
                tabindex="0"
                title="#4D4D4D"
              />
              <div
                class="c7"
                tabindex="0"
                title="#999999"
              />
              <div
                class="c8"
                tabindex="0"
                title="#FFFFFF"
              />
              <div
                class="c9"
                tabindex="0"
                title="#F44E3B"
              />
              <div
                class="c10"
                tabindex="0"
                title="#FE9200"
              />
              <div
                class="c11"
                tabindex="0"
                title="#FCDC00"
              />
              <div
                class="c12"
                tabindex="0"
                title="#DBDF00"
              />
              <div
                class="c13"
                tabindex="0"
                title="#A4DD00"
              />
              <div
                class="c14"
                tabindex="0"
                title="#68CCCA"
              />
              <div
                class="c15"
                tabindex="0"
                title="#73D8FF"
              />
              <div
                class="c16"
                tabindex="0"
                title="#AEA1FF"
              />
              <div
                class="c17"
                tabindex="0"
                title="#FDA1FF"
              />
              <div
                class="c18"
                tabindex="0"
                title="#333333"
              />
              <div
                class="c19"
                tabindex="0"
                title="#808080"
              />
              <div
                class="c20"
                tabindex="0"
                title="#cccccc"
              />
              <div
                class="c21"
                tabindex="0"
                title="#D33115"
              />
              <div
                class="c22"
                tabindex="0"
                title="#E27300"
              />
              <div
                class="c23"
                tabindex="0"
                title="#FCC400"
              />
              <div
                class="c24"
                tabindex="0"
                title="#B0BC00"
              />
              <div
                class="c25"
                tabindex="0"
                title="#68BC00"
              />
              <div
                class="c26"
                tabindex="0"
                title="#16A5A5"
              />
              <div
                class="c27"
                tabindex="0"
                title="#009CE0"
              />
              <div
                class="c28"
                tabindex="0"
                title="#7B64FF"
              />
              <div
                class="c29"
                tabindex="0"
                title="#FA28FF"
              />
              <div
                class="c30"
                tabindex="0"
                title="#000000"
              />
              <div
                class="c31"
                tabindex="0"
                title="#666666"
              />
              <div
                class="c32"
                tabindex="0"
                title="#B3B3B3"
              />
              <div
                class="c33"
                tabindex="0"
                title="#9F0500"
              />
              <div
                class="c34"
                tabindex="0"
                title="#C45100"
              />
              <div
                class="c35"
                tabindex="0"
                title="#FB9E00"
              />
              <div
                class="c36"
                tabindex="0"
                title="#808900"
              />
              <div
                class="c37"
                tabindex="0"
                title="#194D33"
              />
              <div
                class="c38"
                tabindex="0"
                title="#0C797D"
              />
              <div
                class="c39"
                tabindex="0"
                title="#0062B1"
              />
              <div
                class="c40"
                tabindex="0"
                title="#653294"
              />
              <div
                class="c41"
                tabindex="0"
                title="#AB149E"
              />
            </div>
            <div
              class="c0 c42"
            >
              <span
                class="c43"
              >
                <span>
                  Hex
                </span>
                <br />
                <input
                  autocomplete="off"
                  class="c44 c45 c46"
                  dir="auto"
                  maxlength="9"
                  placeholder=""
                  type="text"
                  value="#BBB"
                />
              </span>
              <div
                class="c0 c42"
              >
                <span
                  class="c43"
                >
                  <span>
                    R
                  </span>
                  <br />
                  <input
                    autocomplete="off"
                    class="c44 c45 c47"
                    dir="auto"
                    maxlength="3"
                    placeholder=""
                    type="number"
                    value="187"
                  />
                </span>
                <span
                  class="c43"
                >
                  <span>
                    G
                  </span>
                  <br />
                  <input
                    autocomplete="off"
                    class="c44 c45 c47"
                    dir="auto"
                    maxlength="3"
                    placeholder=""
                    type="number"
                    value="187"
                  />
                </span>
                <span
                  class="c43"
                >
                  <span>
                    B
                  </span>
                  <br />
                  <input
                    autocomplete="off"
                    class="c44 c45 c47"
                    dir="auto"
                    maxlength="3"
                    placeholder=""
                    type="number"
                    value="187"
                  />
                </span>
                <span
                  class="c43"
                >
                  <span>
                    A
                  </span>
                  <br />
                  <input
                    autocomplete="off"
                    class="c44 c45 c47"
                    dir="auto"
                    maxlength="3"
                    placeholder=""
                    type="number"
                    value="255"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="c0 c48"
        >
          <div
            class="c0 c49"
          >
            <div
              class="c50"
            />
            <div
              class="c0 c51"
            />
          </div>
          <div
            class="c52 c53 c54 c55"
            role="button"
            tabindex="0"
          >
            <div
              class="c56 c57"
              data-text-as-pseudo-element="Cancel"
            />
          </div>
          <div
            class="c52 c53 c58 c55"
            role="button"
            tabindex="0"
          >
            <div
              class="c56 c59"
              data-text-as-pseudo-element="OK"
            />
          </div>
        </div>
      </div>
    </div>
  `);

  //Simulate mouse click to select a color
  act(() =>
    userEvent.click(
      getByTestId('overlay-container').querySelector('[title="#E27300"]')!,
    ),
  );

  expect(getByTestId('overlay-container')).toMatchInlineSnapshot(`
<div
  aria-modal="true"
  class="sc-AxhUy gJrMSC OverlayContainer-sc-19659zv-0 fmjhYE"
  data-testid="overlay-container"
>
  <div
    class="sc-AxhUy gJrMSC sc-fzoLag gUPiQ"
    style="top: 0px; left: 0px; opacity: 1;"
  >
    <div
      class="sc-AxhUy gJrMSC sc-AxgMl cxJYYh sc-fzpans cYLGem"
    >
      <div
        class="sc-AxhUy gJrMSC sc-AxgMl cxJYYh sc-fzozJi fuiiNa"
      >
        <div
          class="sc-AxmLO jOiHod"
        >
          <div
            class="sc-Axmtr eSCgBP"
            tabindex="0"
            title="#4D4D4D"
          />
          <div
            class="sc-Axmtr dmIKav"
            tabindex="0"
            title="#999999"
          />
          <div
            class="sc-Axmtr jJlzBP"
            tabindex="0"
            title="#FFFFFF"
          />
          <div
            class="sc-Axmtr kqFhXd"
            tabindex="0"
            title="#F44E3B"
          />
          <div
            class="sc-Axmtr gdzmGD"
            tabindex="0"
            title="#FE9200"
          />
          <div
            class="sc-Axmtr JTQCN"
            tabindex="0"
            title="#FCDC00"
          />
          <div
            class="sc-Axmtr gTrlxv"
            tabindex="0"
            title="#DBDF00"
          />
          <div
            class="sc-Axmtr dexcqa"
            tabindex="0"
            title="#A4DD00"
          />
          <div
            class="sc-Axmtr hTUoPf"
            tabindex="0"
            title="#68CCCA"
          />
          <div
            class="sc-Axmtr irOclr"
            tabindex="0"
            title="#73D8FF"
          />
          <div
            class="sc-Axmtr egvSDD"
            tabindex="0"
            title="#AEA1FF"
          />
          <div
            class="sc-Axmtr kBveLJ"
            tabindex="0"
            title="#FDA1FF"
          />
          <div
            class="sc-Axmtr lkItgT"
            tabindex="0"
            title="#333333"
          />
          <div
            class="sc-Axmtr jQcApr"
            tabindex="0"
            title="#808080"
          />
          <div
            class="sc-Axmtr bFgWpj"
            tabindex="0"
            title="#cccccc"
          />
          <div
            class="sc-Axmtr hPDkAC"
            tabindex="0"
            title="#D33115"
          />
          <div
            class="sc-Axmtr edrkuw"
            tabindex="0"
            title="#E27300"
          >
            .c0 {
  position: absolute;
  background-color: #000;
  border-radius: 50%;
  top: 4px;
  left: 4px;
  bottom: 4px;
  right: 4px;
}

<div
              class="c0"
            />
          </div>
          <div
            class="sc-Axmtr kPFXPd"
            tabindex="0"
            title="#FCC400"
          />
          <div
            class="sc-Axmtr kmrFHI"
            tabindex="0"
            title="#B0BC00"
          />
          <div
            class="sc-Axmtr hfeXjw"
            tabindex="0"
            title="#68BC00"
          />
          <div
            class="sc-Axmtr eqaLNw"
            tabindex="0"
            title="#16A5A5"
          />
          <div
            class="sc-Axmtr Nbgzg"
            tabindex="0"
            title="#009CE0"
          />
          <div
            class="sc-Axmtr dUJosA"
            tabindex="0"
            title="#7B64FF"
          />
          <div
            class="sc-Axmtr dcGCwa"
            tabindex="0"
            title="#FA28FF"
          />
          <div
            class="sc-Axmtr dMSJwn"
            tabindex="0"
            title="#000000"
          />
          <div
            class="sc-Axmtr cEhJaf"
            tabindex="0"
            title="#666666"
          />
          <div
            class="sc-Axmtr bGzsPq"
            tabindex="0"
            title="#B3B3B3"
          />
          <div
            class="sc-Axmtr gwuQgx"
            tabindex="0"
            title="#9F0500"
          />
          <div
            class="sc-Axmtr huvUDc"
            tabindex="0"
            title="#C45100"
          />
          <div
            class="sc-Axmtr ezupdH"
            tabindex="0"
            title="#FB9E00"
          />
          <div
            class="sc-Axmtr hygZZW"
            tabindex="0"
            title="#808900"
          />
          <div
            class="sc-Axmtr czOzHj"
            tabindex="0"
            title="#194D33"
          />
          <div
            class="sc-Axmtr dlyeVV"
            tabindex="0"
            title="#0C797D"
          />
          <div
            class="sc-Axmtr iVnelg"
            tabindex="0"
            title="#0062B1"
          />
          <div
            class="sc-Axmtr eQQyxo"
            tabindex="0"
            title="#653294"
          />
          <div
            class="sc-Axmtr leidXl"
            tabindex="0"
            title="#AB149E"
          />
        </div>
        <div
          class="sc-AxhUy gJrMSC sc-AxgMl cxJYYh sc-fzoLsD jODock"
        >
          <span
            class="sc-fznKkj iTIdLa"
          >
            <span>
              Hex
            </span>
            <br />
            <input
              autocomplete="off"
              class="sc-AxjAm idPQwB sc-AxiKw lcXyJb sc-fznyAO kOnQRo"
              dir="auto"
              maxlength="9"
              placeholder=""
              type="text"
              value="#E27300"
            />
          </span>
          <div
            class="sc-AxhUy gJrMSC sc-AxgMl cxJYYh sc-fzoLsD jODock"
          >
            <span
              class="sc-fznKkj iTIdLa"
            >
              <span>
                R
              </span>
              <br />
              <input
                autocomplete="off"
                class="sc-AxjAm idPQwB sc-AxiKw lcXyJb sc-fzplWN evqxXz"
                dir="auto"
                maxlength="3"
                placeholder=""
                type="number"
                value="226"
              />
            </span>
            <span
              class="sc-fznKkj iTIdLa"
            >
              <span>
                G
              </span>
              <br />
              <input
                autocomplete="off"
                class="sc-AxjAm idPQwB sc-AxiKw lcXyJb sc-fzplWN evqxXz"
                dir="auto"
                maxlength="3"
                placeholder=""
                type="number"
                value="115"
              />
            </span>
            <span
              class="sc-fznKkj iTIdLa"
            >
              <span>
                B
              </span>
              <br />
              <input
                autocomplete="off"
                class="sc-AxjAm idPQwB sc-AxiKw lcXyJb sc-fzplWN evqxXz"
                dir="auto"
                maxlength="3"
                placeholder=""
                type="number"
                value="0"
              />
            </span>
            <span
              class="sc-fznKkj iTIdLa"
            >
              <span>
                A
              </span>
              <br />
              <input
                autocomplete="off"
                class="sc-AxjAm idPQwB sc-AxiKw lcXyJb sc-fzplWN evqxXz"
                dir="auto"
                maxlength="3"
                placeholder=""
                type="number"
                value="255"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="sc-AxhUy gJrMSC sc-AxgMl cxJYYh sc-fzoNJl hZcLpw"
    >
      <div
        class="sc-AxhUy gJrMSC sc-AxgMl cxJYYh sc-fzpmMD iGERAG"
      >
        <div
          class="sc-fznMAR hNQGLJ"
        />
        <div
          class="sc-AxhUy gJrMSC sc-AxgMl cxJYYh sc-fznxKY kihiPR"
        />
      </div>
      <div
        class="sc-fzoyAV cOWgtW TouchableViewBase__StyledViewBase-cz83lq-0 kgslKY sc-fzqNqU gEzwXe sc-fzoXWK bhIavI"
        role="button"
        tabindex="0"
      >
        <div
          class="sc-fzokOt fAFgnU sc-fznWqX hAeupC"
          data-text-as-pseudo-element="Cancel"
        />
      </div>
      <div
        class="sc-fzoyAV cOWgtW TouchableViewBase__StyledViewBase-cz83lq-0 kgslKY sc-fzqNqU bxOHuB sc-fzoXWK bhIavI"
        role="button"
        tabindex="0"
      >
        <div
          class="sc-fzokOt fAFgnU sc-fznWqX bhXBvj"
          data-text-as-pseudo-element="OK"
        />
      </div>
    </div>
  </div>
</div>
`);

  //Simulate mouse click to close the color picker
  act(() =>
    userEvent.click(
      getByTestId('overlay-container').querySelector(
        '[data-text-as-pseudo-element="OK"]',
      )!,
    ),
  );

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

.c4 {
  -webkit-flex: none;
  -ms-flex: none;
  flex: none;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #E27300;
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

<div
  class="c0 c1 "
  data-testid="test"
>
  <div
    class="c2 c3 c4"
    data-text-as-pseudo-element=""
  />
</div>
`);
});
