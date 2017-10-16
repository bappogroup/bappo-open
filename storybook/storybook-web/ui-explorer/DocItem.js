/* eslint-disable react/prop-types */

import React from 'react';
import { styled, Text, View } from 'bappo-components';
import AppText from './AppText';
import insertBetween from './insertBetween';

const Divider = styled(View)`
  height: 1rem;
`;

const createDescription = (description) => {
  const nodeList = React.Children.map(description, child => (
    <DescriptionText>{child}</DescriptionText>
  ));
  let content;
  if (nodeList.length === 1) {
    content = nodeList;
  } else {
    content = insertBetween(() => <Divider key={Math.random()} />, nodeList);
  }
  return <View>{content}</View>;
};

const DocItem = ({ description, example = {}, name, typeInfo, label }) => (
  <Example>
    {name && (
      <Title>
        <PropText label={label} name={name} typeInfo={typeInfo} />
      </Title>
    )}
    {description && <Description>{createDescription(description)}</Description>}
    {(example.render || example.code) && (
      <RenderBox>
        <ExampleText>Example</ExampleText>
        {example.render && <View>{example.render()}</View>}
        {example.render && example.code && <Divider />}
        {example.code && <Code>{example.code}</Code>}
      </RenderBox>
    )}
  </Example>
);

const PropText = ({ label, name, typeInfo }) => (
  <AppText>
    {label && <Label>{label}</Label>}
    <PropName>{name}</PropName>
    {typeInfo && (
      <Text>
        {': '}
        <Code>{typeInfo}</Code>
      </Text>
    )}
  </AppText>
);

const Code = styled(Text)`
  font-family: monospace, monospace;
  font-size: 1rem;
  line-height: 1.3125em;
`;

const Example = styled(View)`
  margin-bottom: calc(1.5 * 1.3125rem);
`;

const Title = styled(AppText)`
  font-size: 1rem;
`;

const DescriptionText = styled(Text)`
  font-size: 1rem;
  line-height: 1.3125em;
`;

const Label = styled(Text)`
  background-color: #ddd;
  border-radius: 1rem;
  color: #555;
  margin-right: 0.5rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const PropName = styled(Text)`
  font-weight: bold;
`;

const Description = styled(View)`
  margin-top: calc(0.5 * 1.3125rem);
`;

const RenderBox = styled(View)`
  border: 1px solid #E6ECF0;
  padding: 1.3125rem;
  margin-top: 1.3125rem;
`;

const ExampleText = styled(AppText)`
  color: #AAB8C2;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: calc(0.5 * 1.3125rem);
  text-transform: uppercase;
`;

export default DocItem;
