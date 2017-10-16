/* eslint-disable react/prop-types */

import React from 'react';
import { styled, View } from 'bappo-components';
import AppText from './AppText';
import insertBetween from './insertBetween';

export const Description = ({ children }) => {
  const wrappedChildren = React.Children.map(children, child => (
    <DescriptionText>{child}</DescriptionText>
  ));
  return (
    <DescriptionContainer>
      {insertBetween(() => <Divider key={Math.random()} />, wrappedChildren)}
    </DescriptionContainer>
  );
};

const UIExplorer = ({ children, description, title }) => (
  <Root>
    <Title>{title}</Title>
    {description}
    {children}
  </Root>
);

const Root = styled(View)`
  padding: 1rem;
  flex: 1;
`;

const Divider = styled(View)`
  height: 1.3125rem;
`;

const Title = styled(AppText)`
  font-size: 2rem;
`;

const DescriptionContainer = styled(View)`
  margin-top: calc(0.5 * 1.3125rem);
  margin-bottom: calc(1.5 * 1.3125rem);
`;

const DescriptionText = styled(AppText)`
  color: #666;
  font-size: 1.25rem;
`;

export default UIExplorer;
