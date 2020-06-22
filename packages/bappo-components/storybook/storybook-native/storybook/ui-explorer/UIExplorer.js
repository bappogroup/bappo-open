/* eslint-disable react/prop-types */

import {
  DeviceKindProvider,
  ScrollView,
  View,
  getDeviceKindByWidth,
  styled,
} from 'bappo-components';
import React from 'react';

import AppText from './AppText';
import insertBetween from './insertBetween';

export const Description = ({ children }) => {
  const wrappedChildren = React.Children.map(children, child => (
    <DescriptionText>{child}</DescriptionText>
  ));
  return (
    <DescriptionContainer>
      {insertBetween(
        () => (
          <Divider key={Math.random()} />
        ),
        wrappedChildren,
      )}
    </DescriptionContainer>
  );
};

const UIExplorer = ({ children, description, title }) => {
  const [deviceKind, setDeviceKind] = React.useState(
    getDeviceKindByWidth(window.innerWidth),
  );
  React.useEffect(() => {
    const listener = () => {
      const newDeviceKind = getDeviceKindByWidth(window.innerWidth);
      setDeviceKind(prevDeviceKind =>
        prevDeviceKind !== newDeviceKind ? newDeviceKind : prevDeviceKind,
      );
    };
    if (window && window.addEventListener)
      window.addEventListener('resize', listener);
    return () => {
      if (window && window.removeEventListener)
        window.removeEventListener('resize', listener);
    };
  }, []);

  return (
    <DeviceKindProvider value={deviceKind}>
      <Root>
        <Title>{title}</Title>
        {description}
        {children}
      </Root>
    </DeviceKindProvider>
  );
};

const Root = styled(ScrollView)`
  padding: 16px;
  flex: 1;
`;

const Divider = styled(View)`
  height: 21px;
`;

const Title = styled(AppText)`
  font-size: 32px;
`;

const DescriptionContainer = styled(View)`
  margin-top: 10.5px;
  margin-bottom: 31.5px;
`;

const DescriptionText = styled(AppText)`
  color: #666;
  font-size: 20px;
`;

export default UIExplorer;
