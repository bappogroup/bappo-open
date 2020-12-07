import * as React from 'react';

import { MenuContext } from './types';

export const Context = React.createContext<MenuContext | undefined>(undefined);

export const useMenuContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error(
      `Menu components cannot be rendered outside the Menu component`,
    );
  }
  return context;
};
