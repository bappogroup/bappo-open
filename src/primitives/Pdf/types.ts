export type PdfUriSource = {
  uri: string;
};

export type PdfDefinitionSource = {
  definition: {};
  tableLayouts?: {};
};

export interface PdfProps {
  accessibilityLabel?: string;
  source: PdfUriSource | PdfDefinitionSource;
  style?: any;
  testID?: string;
}
