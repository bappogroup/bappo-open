/* eslint-disable react/prop-types */

import React from 'react';
import { styled, View } from 'bappo-components';
import AppText from './AppText';

const SectionTitle = styled(AppText)`
  font-size: 1.3125rem;
  margin-bottom: 1.3125rem;
  font-weight: bold;
`;

const Section = ({ children, title }) => (
  <View>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </View>
);

export default Section;
