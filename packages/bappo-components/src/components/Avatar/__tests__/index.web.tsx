import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { render } from 'react-testing-library';

import Colors from '../../../apis/Colors';
import Avatar from '..';

test('should render a face icon avatar with right padding and a badge', () => {
  const { getByTestId } = render(
    <Avatar
      backgroundColor={Colors.BLUE}
      icon="face"
      style={styles.rightPadding}
      badge={23}
      testID="test"
    />,
  );
  expect(getByTestId('test')).toMatchSnapshot();
});

const styles = {
  rightPadding: {
    marginRight: 10,
  },
};
