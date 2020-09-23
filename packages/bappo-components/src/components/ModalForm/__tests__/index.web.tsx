import 'jest-styled-components';
import 'react-testing-library/cleanup-after-each';

import React from 'react';
import { fireEvent, render } from 'react-testing-library';

import SubmitButton from '../../SubmitButton';
import ModalForm from '..';

test('should not trigger submit of the outer form when inner form is submitted', () => {
  const handleOuterSubmit = jest.fn();
  const handleInnerSubmit = jest.fn();
  const { getByTestId } = render(
    <ModalForm
      onRequestClose={() => {}}
      onSubmit={handleOuterSubmit}
      testID="outer"
      visible
    >
      <ModalForm
        onRequestClose={() => {}}
        onSubmit={handleInnerSubmit}
        testID="inner"
        visible
      >
        <SubmitButton testID="submit" text="Submit" />
      </ModalForm>
    </ModalForm>,
  );
  const submitButton = getByTestId('submit');
  expect(submitButton).toBeTruthy();
  fireEvent.click(submitButton);
  expect(handleInnerSubmit).toHaveBeenCalledTimes(1);
  expect(handleOuterSubmit).toHaveBeenCalledTimes(0);
});
