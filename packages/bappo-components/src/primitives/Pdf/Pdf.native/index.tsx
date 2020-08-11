import React from 'react';
import NativePdf from 'react-native-pdf';

import {
  createDataUrlFromDefinition,
  initializePdfFonts,
} from '../helpers/pdfmake';
import { useUri } from '../helpers/useUri';
import { validateSource } from '../helpers/validateSource';
import { PdfProps } from '../types';
import Loading from './Loading';

// start loading fonts as soon as this module gets imported
initializePdfFonts();

// TODO: add controls
export default function Pdf(props: PdfProps) {
  const { accessibilityLabel, source, style, testID } = props;

  validateSource(source);

  const uri = useUri(source);
  if (!uri) {
    return <Loading {...props} />;
  }

  const nativePdfProps = {
    accessibilityLabel,
    source: {
      uri,
    },
    style,
    testID,
  };
  return <NativePdf {...nativePdfProps} />;
}

Pdf.createDataUrlFromDefinition = createDataUrlFromDefinition;
