import React from 'react';
import FlexIframe from '../../../internals/web/FlexIframe';
import { initializePdfFonts } from '../helpers/pdfmake';
import { useUri } from '../helpers/useUri';
import { validateSource } from '../helpers/validateSource';
import { Props } from './types';
import Loading from './Loading';

// start loading fonts as soon as this module gets imported
initializePdfFonts();

export default function Pdf(props: Props) {
  const { accessibilityLabel, className, source, style, testID } = props;

  validateSource(source);

  const uri = useUri(source);
  if (!uri) {
    return <Loading {...props} />;
  }

  const iframeProps = {
    'aria-label': accessibilityLabel,
    'data-testid': testID,
    className,
    src: uri,
    style,
  };
  return <FlexIframe {...iframeProps} />;
}
