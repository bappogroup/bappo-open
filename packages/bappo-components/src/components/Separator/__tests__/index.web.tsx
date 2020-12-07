import React from 'react';
import { render } from 'react-testing-library';

import Separator from '..';

test('should render a separator', () => {
  const { getByTestId } = render(<Separator testID="test"></Separator>);

  expect(getByTestId('test')).toMatchInlineSnapshot(`
    <div
      class="sc-AxjAm hwdivQ Viewweb__StyledViewBase-io1hre-0 gXDTWH sc-AxirZ iSCPWa"
      data-testid="test"
    />
  `);
});
