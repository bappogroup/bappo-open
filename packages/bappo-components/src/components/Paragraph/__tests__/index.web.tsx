import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';

import Paragraph from '..';

test('should render a paragraph of type small', () => {
  const { getByTestId } = render(
    <Paragraph testID="test" type="small">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    </Paragraph>,
  );

  expect(getByTestId('test')).toMatchInlineSnapshot(`
    .c0 {
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

    .c1 {
      margin-bottom: 8px;
      line-height: 22px;
      font-size: 12px;
      color: #2B2826;
      min-height: 15px;
      line-height: 15px;
    }

    <div
      class="c0 c1"
      data-testid="test"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    </div>
  `);
});
