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
  const fonts = (source as PdfDefinitionSource).fonts;
  const tableLayouts = (source as PdfDefinitionSource).tableLayouts;

  const [uriFromDefinition, setUriFromDefinition] = React.useState<
    string | undefined
  >();
  React.useEffect(() => {
    let cancelled = false;
    if (definition) {
      createDataUrlFromDefinition({
        definition,
        fonts,
        tableLayouts,
      }).then((dataUri) => {
        if (cancelled) return;
        setUriFromDefinition(dataUri);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [definition, fonts, tableLayouts, uri]);

  return uri || uriFromDefinition;
}
