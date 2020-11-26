import React from 'react';
import { render } from 'react-testing-library';

import Colors from '../../../apis/Colors';
import IconCard from '..';

test('should render an IconCard', () => {
  const { getByTestId } = render(
    <IconCard
      icon="airport-shuttle"
      color={Colors.BLUE}
      badge={46}
      size="large"
      text="Riders"
      onPress={() => console.log('test click')}
      testID="test"
    />,
  );
  expect(getByTestId('test')).toMatchInlineSnapshot(`
    <div
      class="sc-AxirZ fUDkQH TouchableViewBase__StyledViewBase-cz83lq-0 kgslKY sc-fzozJi dVClKc"
      data-testid="test"
      role="button"
      tabindex="0"
    >
      <div
        class="sc-AxjAm hwdivQ Viewweb__StyledViewBase-io1hre-0 gXDTWH sc-fzpans gGGqKl"
      >
        <div
          class="sc-AxjAm hwdivQ Viewweb__StyledViewBase-io1hre-0 gXDTWH sc-AxhUy hSHeih"
        >
          <div
            class="sc-AxhCb gXTyxi sc-AxgMl bgGdbt"
            data-text-as-pseudo-element="46"
          />
        </div>
        <div
          class="sc-AxhCb gXTyxi sc-AxheI ioXmAg sc-Axmtr sc-fzplWN ewbThp"
          data-text-as-pseudo-element=""
        />
      </div>
      <div
        class="sc-AxhCb eIjymE sc-AxmLO hOwDtD sc-fzoLsD fqEnxe"
      >
        Riders
      </div>
    </div>
  `);
});
