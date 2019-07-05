import React from 'react';
import { PdfDefinitionSource, PdfUriSource } from './types';
import { createDataUrlFromDefinition } from './definition';

export function validateSource(source: any) {
  if (!source || (!source.uri && !source.definition)) {
    throw new Error(
      'Pdf: `source` must be an object with either `uri` or `definition`',
    );
  }

  if (source.uri && source.definition) {
    console.warn(
      'Pdf: You supplied both `uri` and `definition`. `definition` was ignored.',
    );
  }
}

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
