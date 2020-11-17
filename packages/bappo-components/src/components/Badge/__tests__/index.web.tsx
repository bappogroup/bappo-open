import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';

import Badge from '..';

test('should render badge with number 46', () => {
  const { getByTestId } = render(<Badge testID="test" number={46}></Badge>);
  expect(getByTestId('test')).toMatchSnapshot();
});
