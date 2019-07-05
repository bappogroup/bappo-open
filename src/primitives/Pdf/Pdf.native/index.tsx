import React from 'react';
import NativePdf from 'react-native-pdf';
import { PdfProps } from '../types';
import { validateSource, useUri } from '../helpers';

// TODO: add controls
export default function Pdf({
  accessibilityLabel,
  source,
  style,
  testID,
}: PdfProps) {
  validateSource(source);

  const uri = useUri(source);
  if (!uri) {
    return null;
  }

  const props = {
    accessibilityLabel,
    source: {
      uri,
    },
    style,
    testID,
  };
  return <NativePdf {...props} />;
}
