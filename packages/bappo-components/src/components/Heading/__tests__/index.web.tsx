import React from 'react';
import { render } from 'react-testing-library';

import Heading from '..';

test('should render a heading', () => {
  const { getByTestId } = render(
    <Heading testID="test">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </Heading>,
  );
  expect(getByTestId('test')).toMatchInlineSnapshot(`
    <div
      class="sc-AxirZ hSMBAU sc-AxiKw SDvYe"
      data-testid="test"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
  `);
});
