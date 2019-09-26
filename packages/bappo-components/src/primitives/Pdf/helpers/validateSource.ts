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
