import React from 'react';

import { FormProps } from '../types';

export const FormConfigContext = React.createContext<FormProps | undefined>(
  undefined,
);
