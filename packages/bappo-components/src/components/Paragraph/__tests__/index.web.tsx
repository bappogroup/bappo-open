import React from 'react';
import { render } from 'react-testing-library';

import Paragraph from '..';

test('should render a paragraph of type small', () => {
  const { getByTestId } = render(
    <Paragraph testID="test" type="small">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    </Paragraph>,
  );

  expect(getByTestId('test')).toMatchInlineSnapshot(`
    <div
      class="sc-AxirZ hSMBAU sc-AxiKw fwtBRe"
      data-testid="test"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    </div>
  `);
});
