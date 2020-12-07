import "jest-styled-components";
import "react-testing-library/cleanup-after-each";

import React from "react";
import { render } from "react-testing-library";

import ScrollViewTest from "./ScrollViewTest";

test("should render a scroll view", () => {
  const { getByTestId } = render(<ScrollViewTest />);

  expect(getByTestId("test")).toMatchInlineSnapshot(`
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

    .c2 {
      min-height: 100%;
    }

    <div
      class="c0 c1"
      data-testid="test"
      style="border-width: 1px; border-style: solid; margin-bottom: 21px; background-color: rgb(238, 238, 238); padding: 10px;"
    >
      <div
        class="c0 c2"
      >
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="0"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="1"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="2"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="3"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="4"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="5"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="6"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="7"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="8"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="9"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="10"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="11"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="12"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="13"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="14"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="15"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="16"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="17"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="18"
          />
        </div>
        <div
          class="c0 "
          style="flex-basis: 20px; flex-grow: 1; flex-shrink: 0; align-items: center; justify-content: center; border-width: 1px; border-style: solid; border-color: black;"
        >
          <div
            class="c3"
            data-text-as-pseudo-element="19"
          />
        </div>
      </div>
    </div>
  `);
});
