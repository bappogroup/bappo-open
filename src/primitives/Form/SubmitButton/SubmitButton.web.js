// @flow

import * as React from 'react';
import styled from 'styled-components';
import TouchableViewBase from '../../../internals/web/TouchableViewBase';
import { FormStateConsumer } from '../FormState';
import type { SubmitButtonProps } from './types.js.flow';

type Props = SubmitButtonProps & {
  // Will be removed
  className?: string,
};

const SubmitButton = ({ children, className, style, testID }: Props) => {
  return (
    <FormStateConsumer>
      {formState => {
        return (
          <TouchableViewBase
            className={className}
            component="button"
            style={style}
            type="submit"
            testID={testID}
          >
            {typeof children === 'function' ? children(formState) : children}
          </TouchableViewBase>
        );
      }}
    </FormStateConsumer>
  );
};

export default SubmitButton;
