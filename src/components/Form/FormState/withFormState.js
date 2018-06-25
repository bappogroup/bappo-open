// @flow

import * as React from 'react';
import { FormStateConsumer } from './Context';

const withFormState = (WrappedComponent: React.ComponentType<any>) => {
  // $FlowFixMe: forwardRef not supported yet
  return React.forwardRef((props, ref) => (
    <FormStateConsumer>
      {formState => (
        <WrappedComponent {...props} ref={ref} formState={formState} />
      )}
    </FormStateConsumer>
  ));
};

export default withFormState;
