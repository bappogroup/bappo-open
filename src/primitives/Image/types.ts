export interface ImageSource {
  uri: string;
}

export interface ImageMeta {
  Orientation: number;
  PixelXDimension?: number;
  PixelYDimension?: number;
}

export interface ImageProps {
  accessibilityLabel?: string;
  source: ImageSource;
  style?: any;
  testID?: string;
}
