import React from 'react';
import { PdfDefinitionSource, PdfUriSource } from '../types';
import { createDataUrlFromDefinition } from './pdfmake';

export function useUri(
  source: PdfUriSource | PdfDefinitionSource,
): string | undefined {
  const [uriFromDefinition, setUriFromDefinition] = React.useState<
    string | undefined
  >();
  React.useEffect(() => {
    let cancelled = false;
    if (!(source as PdfUriSource).uri) {
      createDataUrlFromDefinition(
        (source as PdfDefinitionSource).definition,
      ).then(uri => {
        if (cancelled) return;
        setUriFromDefinition(uri);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [
    (source as PdfUriSource).uri,
    (source as PdfDefinitionSource).definition,
  ]);

  return (source as PdfUriSource).uri
    ? (source as PdfUriSource).uri
    : uriFromDefinition;
}
