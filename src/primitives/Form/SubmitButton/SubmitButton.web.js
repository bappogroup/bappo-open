// @flow

import * as React from 'react';
import FlexButton from '../../../internals/web/FlexButton';
import { FormStateConsumer } from '../FormState';
import type { SubmitButtonProps } from './types.js.flow';

type Props = SubmitButtonProps & {
  // Will be removed
  className?: string,
};

const SubmitButton = ({ children, className, style }: Props) => {
  return (
    <FormStateConsumer>
      {formState => {
        return (
          <FlexButton className={className} style={style} type="submit">
            {typeof children === 'function' ? children(formState) : children}
          </FlexButton>
        );
      }}
    </FormStateConsumer>
  );
};

export default SubmitButton;
