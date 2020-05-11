import { PdfDefinitionSource } from '../types';
export declare function initializePdfFonts(): void;
export declare function createDataUrlFromDefinition({ definition, fonts, tableLayouts, }: PdfDefinitionSource): Promise<string>;
