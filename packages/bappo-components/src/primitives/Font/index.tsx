import React from 'react';

import defaultFont from './defaultFont';
import FontContext from './FontContext';

interface FontProps {
  children?: React.ReactNode;
  fontFamily?: string;
  fontSize?: number;
}

export default function Font({
  children,
  fontFamily = defaultFont.fontFamily,
  fontSize = defaultFont.fontSize,
}: FontProps) {
  const value = React.useMemo(
    () => ({
      fontFamily,
      fontSize,
    }),
    [fontFamily, fontSize],
  );

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
}
