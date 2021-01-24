import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';

import View from '..';
import Text from '..';

test('should render a view with a gray background color and a Text child component', () => {
  const { getByTestId } = render(
    <View testID="test" style={{ backgroundColor: 'gray' }}>
      <Text>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio magni
        labore, ipsum deserunt quidem perspiciatis neque magnam eos officiis
        vero accusantium quisquam, nesciunt cupiditate animi pariatur quaerat
        odio quos nihil?
      </Text>
    </View>,
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

    <div
      class="c0 "
      data-testid="test"
      style="background-color: gray;"
    >
      <div
        class="c0 "
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio magni labore, ipsum deserunt quidem perspiciatis neque magnam eos officiis vero accusantium quisquam, nesciunt cupiditate animi pariatur quaerat odio quos nihil?
      </div>
    </div>
  `);
});
