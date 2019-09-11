import React from 'react';
import { PdfDefinitionSource, PdfUriSource } from '../types';
import { createDataUrlFromDefinition } from './pdfmake';

export function useUri(
  source: PdfUriSource | PdfDefinitionSource,
): string | undefined {
  const uri = (source as PdfUriSource).uri as string | undefined;
  const definition = (source as PdfDefinitionSource).definition as
    | {}
    | undefined;
  const tableLayouts = (source as PdfDefinitionSource).tableLayouts;

  const [uriFromDefinition, setUriFromDefinition] = React.useState<
    string | undefined
  >();
  React.useEffect(() => {
    let cancelled = false;
    if (!uri) {
      createDataUrlFromDefinition(definition, tableLayouts).then(uri => {
        if (cancelled) return;
        setUriFromDefinition(uri);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [uri, definition, tableLayouts]);

  return uri || uriFromDefinition;
}
