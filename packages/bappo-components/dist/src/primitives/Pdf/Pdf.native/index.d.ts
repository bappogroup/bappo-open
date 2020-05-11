/// <reference types="react" />
import { PdfProps } from '../types';
declare function Pdf(props: PdfProps): JSX.Element;
declare namespace Pdf {
    var createDataUrlFromDefinition: typeof import("../helpers/pdfmake").createDataUrlFromDefinition;
}
export default Pdf;
