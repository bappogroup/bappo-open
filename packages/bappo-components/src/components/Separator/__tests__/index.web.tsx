import React from 'react';
import { render } from 'react-testing-library';

import Separator from '..';

test('should render a separator', () => {
  const { getByTestId } = render(<Separator testID="test"></Separator>);

  expect(getByTestId('test')).toMatchInlineSnapshot(`
    <div
      class="sc-AxjAm hwdivQ sc-AxirZ feQoIa sc-AxiKw jeqquu"
      data-testid="test"
    />
  `);
});
