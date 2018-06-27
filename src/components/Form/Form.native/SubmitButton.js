// @flow

import * as React from 'react';
import Button from '../../Button';
import { FormStateConsumer } from '../FormState';
import { FormConfigConsumer } from './FormConfigContext';

type Props = {
  text?: string,
};

const SubmitButton = ({ text }: Props) => {
  return (
    <FormStateConsumer>
      {({ fieldErrors, submitting, values, actions }) => {
        return (
          <FormConfigConsumer>
            {({ onSubmit }) => {
              const handleSubmit = () => {
                actions.touchAll();
                if (Object.keys(fieldErrors).length === 0) {
                  actions.submit(() => onSubmit && onSubmit(values));
                }
              };
              return (
                <Button
                  loading={submitting}
                  onPress={handleSubmit}
                  text={text}
                  type="primary"
                />
              );
            }}
          </FormConfigConsumer>
        );
      }}
    </FormStateConsumer>
  );
};

SubmitButton.defaultProps = {
  text: 'Submit',
};

export default SubmitButton;
