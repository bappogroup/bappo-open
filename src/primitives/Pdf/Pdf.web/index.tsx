import React from 'react';
import FlexIframe from '../../../internals/web/FlexIframe';
import { PdfProps } from '../types';
import { validateSource, useUri } from '../helpers';

interface Props extends PdfProps {
  className: string;
}

export default function Pdf({
  accessibilityLabel,
  className,
  source,
  style,
  testID,
}: Props) {
  validateSource(source);

  const uri = useUri(source);
  if (!uri) {
    return null;
  }

  const props = {
    'aria-label': accessibilityLabel,
    'data-testid': testID,
    className,
    src: uri,
    style,
  };
  return <FlexIframe {...props} />;
}
