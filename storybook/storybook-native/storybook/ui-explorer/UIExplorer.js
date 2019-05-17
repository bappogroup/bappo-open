/* eslint-disable react/prop-types */

import React from 'react';
import { styled, ScrollView, View } from 'bappo-components';
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

const UIExplorer = ({ children, description, title }) => (
  <Root>
    <Title>{title}</Title>
    {description}
    {children}
  </Root>
);

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
