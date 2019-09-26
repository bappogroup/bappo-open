export type PdfUriSource = {
  uri: string;
};

export type PdfDefinitionSource = {
  definition: {};
  fonts?: {
    [fontFamily: string]: {
      normal?: string;
      bold?: string;
      italics?: string;
      bolditalics?: string;
    };
  };
  tableLayouts?: {};
};

export interface PdfProps {
  accessibilityLabel?: string;
  source: PdfUriSource | PdfDefinitionSource;
  style?: any;
  testID?: string;
}
