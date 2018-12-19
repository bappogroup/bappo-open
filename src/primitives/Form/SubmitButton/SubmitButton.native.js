// @flow

import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { FormStateConsumer } from '../FormState';
import { FormConfigConsumer } from '../Form.native/FormConfigContext';
import type { SubmitButtonProps } from './types.js.flow';

type Props = SubmitButtonProps;

const SubmitButton = ({ children, style, testID }: Props) => {
  return (
    <FormStateConsumer>
      {formState => {
        const { fieldErrors, values, actions } = formState;
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
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={style}
                  testID={testID}
                >
                  {typeof children === 'function'
                    ? children(formState)
                    : children}
                </TouchableOpacity>
              );
            }}
          </FormConfigConsumer>
        );
      }}
    </FormStateConsumer>
  );
};

export default SubmitButton;
