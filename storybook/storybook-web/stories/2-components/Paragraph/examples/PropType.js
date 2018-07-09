import React from 'react';
import { Paragraph } from 'bappo-components';

const ParagraphTypeExample = () => [
  <Paragraph>Example content with no type given.</Paragraph>,
  <Paragraph type="bold">Example content with bold type.</Paragraph>,
  <Paragraph type="small">Example content with small type.</Paragraph>,
  <Paragraph type="success">Example content with success type.</Paragraph>,
  <Paragraph type="error">Example content with error type.</Paragraph>,
];

export default ParagraphTypeExample;
