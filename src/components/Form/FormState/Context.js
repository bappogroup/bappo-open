// @flow

import * as React from 'react';
import type { StateAndHelpersAndActions } from './types.js.flow';

const { Provider, Consumer } = React.createContext();

const FormStateProvider = ({ children, value }: {
  value: StateAndHelpersAndActions,
  children?: ?React.Node,
}) => (
  <Provider value={value}>{children}</Provider>
);

const FormStateConsumer = ({
  children,
}: {
  children: StateAndHelpersAndActions => React.Node,
}): React.Element<typeof Consumer> => (
  <Consumer>
    {(stateAndHelpersAndActions: ?StateAndHelpersAndActions) => {
      if (!stateAndHelpersAndActions) {
        throw new Error(
          `FormStateConsumer must be used inside a FormStateProvider`,
        );
      }
      return children(stateAndHelpersAndActions);
    }}
  </Consumer>
);

export { FormStateProvider, FormStateConsumer };
