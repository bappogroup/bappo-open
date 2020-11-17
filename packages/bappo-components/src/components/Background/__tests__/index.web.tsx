import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';

import Background from '..';

test('should render empty background', () => {
  const { getByTestId } = render(<Background testID="test"></Background>);
  expect(getByTestId('test')).toMatchSnapshot();
});
