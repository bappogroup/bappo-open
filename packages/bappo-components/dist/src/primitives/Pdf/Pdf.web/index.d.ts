/// <reference types="react" />
import { Props } from './types';
declare function Pdf(props: Props): JSX.Element;
declare namespace Pdf {
    var createDataUrlFromDefinition: typeof import("../helpers/pdfmake").createDataUrlFromDefinition;
}
export default Pdf;
