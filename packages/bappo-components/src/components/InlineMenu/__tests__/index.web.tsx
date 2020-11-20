import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import InlineMenu from '..';

const actions = [
  {
    icon: 'home',
    label: 'menu1',
    onPress: () => console.log('menu1 pressed'),
  },
  {
    label: 'menu2',
    onPress: () => console.log('menu2 pressed'),
  },
];

test('should render an inline menu icon', () => {
  const { getByTestId } = render(
    <InlineMenu actions={actions} icon="cloud" testID="test" />,
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
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    position: relative;
    white-space: pre-wrap;
    word-wrap: break-word;
    -ms-hyphens: auto;
    cursor: inherit;
  }
  
  .c2 {
    font-family: Material Icons;
    font-size: 16px;
    text-align: center;
  }
  
  .c3 {
    -webkit-flex: none;
    -ms-flex: none;
    flex: none;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: black;
    height: 24px;
    line-height: 24px;
    width: 24px;
    font-size: 16px;
  }
  
  .c0 {
    display: inline-block;
  }
  
  .c0:hover {
    opacity: 0.8;
  }
  
  <div
    class="c0"
    data-testid="test"
  >
    <div
      style="display: inline-block; cursor: pointer; padding: 0px 5px;"
    >
      <div
        class="c1 c2 c3"
        data-text-as-pseudo-element=""
      />
    </div>
  </div>
  `);
});
