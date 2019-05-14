import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render } from 'react-testing-library';
import Text from '../';

test('should render a div with text as a data attribute by default', () => {
  const { getByTestId } = render(<Text testID="test">hello</Text>);
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
      font-family: 'Quicksand',sans-serif;
      font-size: 14px;
      position: relative;
      white-space: pre-wrap;
      word-wrap: break-word;
      -ms-hyphens: auto;
      cursor: inherit;
    }

    <div
      class="c0"
      data-testid="test"
      data-text-as-pseudo-element="hello"
    />
  `);
});

test('should render a div with text content if selectable', () => {
  const { getByTestId } = render(
    <Text selectable testID="test">
      hello
    </Text>,
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
      font-family: 'Quicksand',sans-serif;
      font-size: 14px;
      position: relative;
      white-space: pre-wrap;
      word-wrap: break-word;
      -ms-hyphens: auto;
      cursor: inherit;
    }

    <div
      class="c0"
      data-testid="test"
    >
      hello
    </div>
  `);
});

test('can render unicode characters', () => {
  // eslint-disable-next-line jsx-a11y/accessible-emoji
  const { getByTestId } = render(<Text testID="test">你好😀</Text>);
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
      font-family: 'Quicksand',sans-serif;
      font-size: 14px;
      position: relative;
      white-space: pre-wrap;
      word-wrap: break-word;
      -ms-hyphens: auto;
      cursor: inherit;
    }

    <div
      class="c0"
      data-testid="test"
      data-text-as-pseudo-element="你好😀"
    />
  `);
});
