import { Paragraph, View } from 'bappo-components';
import React from 'react';

const ParagraphTypeExample = () => [
  <Paragraph>Example content with no type given.</Paragraph>,
  <Paragraph type="bold">Example content with bold type.</Paragraph>,
  <Paragraph type="small">Example content with small type.</Paragraph>,
  <Paragraph type="success">Example content with success type.</Paragraph>,
  <Paragraph type="error">Example content with error type.</Paragraph>,

  <View style={{ backgroundColor: 'gray' }}>
    <Paragraph type="white">Example content with white type.</Paragraph>
  </View>,
];

export default ParagraphTypeExample;
