// @flow

import * as React from 'react';
import type { FormStateAndHelpersAndActions } from './types.js.flow';

const { Provider, Consumer } = React.createContext();

const FormStateProvider = ({ children, value }: {
  value: FormStateAndHelpersAndActions,
  children?: ?React.Node,
}) => (
  <Provider value={value}>{children}</Provider>
);

const FormStateConsumer = ({
  children,
}: {
  children: FormStateAndHelpersAndActions => React.Node,
}): React.Element<typeof Consumer> => (
  <Consumer>
    {(stateAndHelpersAndActions: ?FormStateAndHelpersAndActions) => {
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
