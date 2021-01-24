import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';

import ActivityIndicator from '..';

test('should render a large, blue activity indicator', () => {
  const { getByTestId } = render(
    <ActivityIndicator color="blue" size="large" testID="test" />,
  );
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
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
    }

    .c2 {
      width: 36px;
      height: 36px;
    }

    .c3 {
      -webkit-animation: cqkDSr 2s infinite linear;
      animation: cqkDSr 2s infinite linear;
    }

    .c4 {
      -webkit-animation: klWXtM 1.5s infinite ease-in-out;
      animation: klWXtM 1.5s infinite ease-in-out;
      stroke: blue;
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
      -webkit-transform-origin: center;
      -ms-transform-origin: center;
      transform-origin: center;
    }

    <div
      class="c0 c1"
      data-testid="test"
    >
      <div
        class="c0 c2"
      >
        <svg
          class="c3"
          height="100%"
          viewBox="25 25 50 50"
          width="100%"
        >
          <circle
            class="c4"
            cx="50"
            cy="50"
            fill="none"
            r="20"
            stroke-miterlimit="10"
            stroke-width="4"
          />
        </svg>
      </div>
    </div>
  `);
});
