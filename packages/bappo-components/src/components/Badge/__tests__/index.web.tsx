import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';

import Badge from '..';

test('should render badge with number 46', () => {
  const { getByTestId } = render(<Badge testID="test" number={46}></Badge>);
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
  
  .c3 {
    color: white;
    font-size: 12px;
  }
  
  <div
    class="c0 c1"
    data-testid="test"
  >
    <div
      class="c2 c3"
      data-text-as-pseudo-element="46"
    />
  </div>
  `);
});
