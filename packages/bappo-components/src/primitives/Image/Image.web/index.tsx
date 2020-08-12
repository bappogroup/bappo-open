import React from 'react';
import styled from 'styled-components';

import { ViewLayout, ViewLayoutEvent } from '../../../events';
import { DivViewBase } from '../../../internals/web/ViewBase';
import { ImageMeta, ImageProps } from '../types';
// @ts-ignore
import { getImageMeta, isPortrait } from '../utils';
import ImageLoader from './ImageLoader';

interface Props extends ImageProps {
  className?: string;
}
type Status = 'LOADING' | 'LOADED' | 'ERROR';

const svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;

const useImage = (uri: string) => {
  const [status, setStatus] = React.useState<Status>('LOADING');
  const [imageMeta, setImageMeta] = React.useState<ImageMeta | undefined>(
    undefined,
  );

  React.useEffect(() => {
    let cancelled = false;
    const requestId = ImageLoader.load(
      uri,
      (img) => {
        getImageMeta(img).then(
          (meta: ImageMeta | undefined) => {
            if (!cancelled) {
              setStatus('LOADED');
              setImageMeta(meta);
            }
          },
          () => {
            if (!cancelled) {
              // ignore error, treat it as having no metadata
              setStatus('LOADED');
              setImageMeta(undefined);
            }
          },
        );
      },
      () => {
        setStatus('ERROR');
      },
    );
    return () => {
      cancelled = true;
      ImageLoader.abort(requestId);
    };
  }, [uri]);

  return {
    status,
    meta: imageMeta,
  };
};

export default function Image({
  accessibilityLabel,
  className,
  source,
  style,
  testID,
}: Props) {
  const [layout, setLayout] = React.useState<ViewLayout | undefined>(undefined);
  const handleLayout = (event: ViewLayoutEvent) => {
    setLayout(event.nativeEvent.layout);
  };

  let formattedUri = source.uri;
  const match = source.uri.match(svgDataUriPattern);
  // inline SVG markup may contain characters (e.g., #, ") that need to be escaped
  if (match) {
    const [, prefix, svg] = match;
    const encodedSvg = encodeURIComponent(svg);
    formattedUri = `${prefix}${encodedSvg}`;
  }

  const { status, meta } = useImage(formattedUri);

  return (
    <Container
      className={className}
      onLayout={handleLayout}
      testID={testID}
      style={style}
    >
      {layout && (
        <TransformContainer
          $layout={layout}
          $orientation={meta && meta.Orientation}
        >
          {status !== 'LOADING' && (
            <ImageContainer $status={status} $uri={formattedUri} />
          )}
        </TransformContainer>
      )}
      <AccessibilityImg alt={accessibilityLabel} src={formattedUri} />
    </Container>
  );
}

const Container = styled(DivViewBase)`
  overflow: hidden;
`;

const TransformContainer = styled.div<{
  $layout: {
    height: number;
    width: number;
  };
  $orientation: number | undefined;
}>`
  border-radius: inherit;
  max-height: 100%;
  max-width: 100%;
  position: relative;

  ${({ $layout, $orientation }) =>
    isPortrait($orientation)
      ? `
    height: ${$layout.width}px;
    width: ${$layout.height}px;
  `
      : `
    height: ${$layout.height}px;
    width: ${$layout.width}px;
  `};

  ${({ $orientation }) => {
    switch ($orientation) {
      case 2:
        return 'transform: scaleX(-1)';
      case 3:
        return 'transform: rotate(180deg)';
      case 4:
        return 'transform: scaleY(-1)';
      case 5:
        return 'transform: rotate(-90deg) scaleX(-1)';
      case 6:
        return 'transform: rotate(90deg)';
      case 7:
        return 'transform: rotate(90deg) scaleX(-1)';
      case 8:
        return 'transform: rotate(-90deg)';
      default:
        return '';
    }
  }};
`;

const ImageContainer = styled.div<{
  $status: Status;
  $uri: string;
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 100%;
  width: 100%;

  ${({ $status, $uri }) =>
    $status === 'ERROR'
      ? `
    background: #eee;
  `
      : `
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    background-image: url(${$uri});
  `}
`;

// invisible. Only used to allow right click and save
const AccessibilityImg = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  opacity: 0;
  width: 100%;
`;
