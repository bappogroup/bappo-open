import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import userEvent from '@testing-library/user-event';
import React from 'react';
import { act, render } from 'react-testing-library';

import ModalWizardTest from './ModalWizardTest';

test('should render a modal wizard', () => {
  const { getByTestId, container } = render(<ModalWizardTest />);

  //Simulate mouse click to open wizard
  act(() =>
    userEvent.click(
      container.querySelector('[data-text-as-pseudo-element="Open Wizard"]')!,
    ),
  );

  //Set Name field to 'Test'
  act(() => {
    userEvent.type(
      getByTestId('name-field-control').querySelector('input')!,
      'Test',
    );

    userEvent.click(
      getByTestId('requireAge-field-control').querySelector('input')!,
    );
  });

  //Set Age Required field to 'Yes'
  act(() => {
    userEvent.click(
      getByTestId('undefined-list').querySelector(
        '[data-text-as-pseudo-element="Yes"]',
      )!,
    );
  });

  //Set Age field to '55' and click Next
  act(() => {
    userEvent.type(
      getByTestId('age-field-control').querySelector('input')!,
      '55',
    );

    userEvent.click(
      getByTestId('overlay-container').querySelector(
        '[data-text-as-pseudo-element="Next"]',
      )!,
    );
  });

  //TODO: Test Submit
  // act(() =>
  //    userEvent.click(getByTestId("overlay-container").querySelector('[data-text-as-pseudo-element="Submit"]')!));

  expect(getByTestId('overlay-container')).toMatchInlineSnapshot(`
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

    .c9 {
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

    .c10 {
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

    .c10 * {
      cursor: pointer;
    }

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
      font-size: px;
      position: relative;
      white-space: pre-wrap;
      word-wrap: break-word;
      -ms-hyphens: auto;
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      white-space: inherit;
      cursor: inherit;
    }

    .c4 {
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

    .c15 {
      font-size: 14px;
      color: white;
    }

    .c13 {
      font-size: 14px;
      color: #0070D2;
    }

    .c14 {
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

    .c14:hover,
    .c14:focus {
      background-color: #FF9333;
      border-color: #FF9333;
    }

    .c14:hover *,
    .c14:focus * {
      color: white;
    }

    .c14:active {
      background-color: #E36A00;
      border-color: #E36A00;
    }

    .c14:active * {
      color: white;
    }

    .c11 {
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

    .c11:hover,
    .c11:focus {
      background-color: white;
      border-color: #DDDBDA;
    }

    .c11:hover *,
    .c11:focus * {
      color: #0070D2;
    }

    .c11:active {
      background-color: #0070D2;
      border-color: #0031AC;
    }

    .c11:active * {
      color: white;
    }

    .c1 {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0,0,0,0.2);
    }

    .c2 {
      background-color: white;
      position: absolute;
      border-radius: 4px;
      overflow: hidden;
      left: 0;
      right: 0;
      margin: auto;
      max-height: 768px;
      min-height: 200px;
      width: 576px;
      opacity: 0;
    }

    .c2:focus {
      outline: none;
    }

    .c6 {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      background-color: #fff;
      padding: 16px 32px;
      border-top-width: 1px;
      border-top-color: #dddbda;
      border-bottom-width: 1px;
      border-bottom-color: #dddbda;
      border-left-width: 0;
      border-right-width: 0;
      border-style: solid;
    }

    .c3 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      padding: 16px;
    }

    .c5 {
      font-size: 18px;
    }

    .c8 {
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
      background-color: #fafafa;
      padding: 16px;
    }

    .c12 {
      margin-left: 16px;
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
            class="c4 c5"
            data-text-as-pseudo-element="Second Step"
          />
        </div>
        <div
          class="c0 c6"
        >
          <div
            class="c0 "
          >
            <div
              class="c4"
              data-text-as-pseudo-element="Summary"
            />
            <div
              class="c4"
              data-text-as-pseudo-element="Selected values are:"
            />
            <div
              class="c4"
            >
              <div
                class="c7"
                data-text-as-pseudo-element="Name: "
              />
              <div
                class="c7"
                data-text-as-pseudo-element="Test"
              />
            </div>
            <div
              class="c4"
            >
              <div
                class="c7"
                data-text-as-pseudo-element="Age: "
              />
              <div
                class="c7"
                data-text-as-pseudo-element="55"
              />
            </div>
          </div>
        </div>
        <div
          class="c0 c8"
        >
          <div
            class="c9 c10 c11 c12"
            role="button"
            tabindex="0"
          >
            <div
              class="c4 c13"
              data-text-as-pseudo-element="Back"
            />
          </div>
          <div
            class="c9 c10 c11 c12"
            role="button"
            tabindex="0"
          >
            <div
              class="c4 c13"
              data-text-as-pseudo-element="Cancel"
            />
          </div>
          <div
            class="c9 c10 c14 c12"
            role="button"
            tabindex="0"
          >
            <div
              class="c4 c15"
              data-text-as-pseudo-element="Submit"
            />
          </div>
        </div>
      </div>
    </div>
  `);
});
