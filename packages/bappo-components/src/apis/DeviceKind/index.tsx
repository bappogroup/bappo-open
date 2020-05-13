import React from 'react';

export type DeviceKind =
  | 'desktop' // 992+ pixels
  | 'tablet' // 768-991 pixels
  | 'large-phone' // 480-767 pixels
  | 'phone'; // 240-479 pixels

export function getDeviceKindByWidth(width: number): DeviceKind {
  if (width >= 992) return 'desktop';
  if (width >= 768) return 'tablet';
  if (width >= 480) return 'large-phone';
  return 'phone';
}

const DeviceKindContext = React.createContext<DeviceKind | undefined>(
  undefined,
);

export function DeviceKindProvider({
  children,
  value,
}: {
  children?: React.ReactNode;
  value: DeviceKind;
}) {
  return (
    <DeviceKindContext.Provider value={value}>
      {children}
    </DeviceKindContext.Provider>
  );
}

export function useDeviceKind() {
  const deviceKind = React.useContext(DeviceKindContext)!;
  return deviceKind;
}
