import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render } from 'react-testing-library';
import { styled } from '../../../apis/Style';
import Text from '../../Text';
import Font from '..';

test('texts without a parent Font should use default font', () => {
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
      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
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

test('texts rendered inside Font should inherit font', () => {
  const { getByTestId } = render(
    <Font fontFamily="Times" fontSize={10}>
      <Text testID="test">hello</Text>
    </Font>,
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
      font-family: Times;
      font-size: 10px;
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

test('texts can override inherited font', () => {
  const StyledText = styled(Text)`
    font-size: 20px;
  `;
  const { getByTestId } = render(
    <Font fontFamily="Times" fontSize={10}>
      <StyledText testID="test">hello</StyledText>
    </Font>,
  );
  expect(getByTestId('test')).toMatchInlineSnapshot(`
    .c1 {
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
      font-family: Times;
      font-size: 10px;
      position: relative;
      white-space: pre-wrap;
      word-wrap: break-word;
      -ms-hyphens: auto;
      cursor: inherit;
    }

    .c0 {
      font-size: 20px;
    }

    <div
      class="c0 c1"
      data-testid="test"
      data-text-as-pseudo-element="hello"
    />
  `);
});
