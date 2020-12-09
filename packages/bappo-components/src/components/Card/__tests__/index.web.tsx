import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import userEvent from '@testing-library/user-event';
import React from 'react';
import { getByText, render } from 'react-testing-library';

import Background from '../../Background';
import Paragraph from '../../Paragraph';
import Card from '..';

test('should render a card on a standard background with text', () => {
  const { getByTestId } = render(
    <Background>
      <Card testID="test">
        Example card with a paragraph on the standard background.
      </Card>
    </Background>,
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
      padding: 8px;
      border-radius: 3px;
      background: #fff;
      box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.16);
    }

    <div
      class="c0 c1"
      data-testid="test"
    >
      Example card with a paragraph on the standard background.
    </div>
  `);
});
