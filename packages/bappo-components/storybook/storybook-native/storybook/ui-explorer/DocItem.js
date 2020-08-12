/* eslint-disable react/prop-types */

import { Text, View, styled } from 'bappo-components';
import React from 'react';

import AppText from './AppText';
import insertBetween from './insertBetween';

const Divider = styled(View)`
  height: 16px;
`;

const createDescription = (description) => {
  const nodeList = React.Children.map(description, (child) => (
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

const Code = styled(Text).attrs({
  selectable: true,
})`
  font-size: 16px;
`;

const Example = styled(View)`
  margin-bottom: 31.5px;
`;

const Title = styled(AppText)`
  font-size: 16px;
`;

const DescriptionText = styled(Text).attrs({
  selectable: true,
})`
  font-size: 16px;
`;

const Label = styled(Text).attrs({
  selectable: true,
})`
  background-color: #ddd;
  border-radius: 16px;
  color: #555;
  margin-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 8px;
  padding-right: 8px;
`;

const PropName = styled(Text).attrs({
  selectable: true,
})`
  font-weight: bold;
`;

const Description = styled(View)`
  margin-top: 10.5px;
`;

const RenderBox = styled(View)`
  border: 1px solid #e6ecf0;
  padding: 21px;
  margin-top: 21px;
`;

const ExampleText = styled(AppText)`
  color: #aab8c2;
  font-size: 12.8px;
  font-weight: bold;
  margin-bottom: 10.5px;
`;

export default DocItem;
