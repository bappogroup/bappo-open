import { get, set } from 'lodash/fp';
import pdfMake from 'pdfmake';
import { PdfAssetsLoader } from './pdfmake-utils/assetsloader';

let fontsLoaded = false;

const getUrl = (fileName: string) =>
  `https://raw.githubusercontent.com/bappogroup/pdfkit/master/lib/font/data/${fileName}.afm`;

const assetsLoader = new PdfAssetsLoader();

// all possible standard fonts
assetsLoader.registerFont({
  name: 'Courier',
  fileName: 'Courier',
  styles: ['normal'],
  URL: getUrl('Courier'),
});
assetsLoader.registerFont({
  name: 'Courier',
  fileName: 'Courier-Oblique',
  styles: ['italics'],
  URL: getUrl('Courier-Oblique'),
});
assetsLoader.registerFont({
  name: 'Courier',
  fileName: 'Courier-Bold',
  styles: ['bold'],
  URL: getUrl('Courier-Bold'),
});
assetsLoader.registerFont({
  name: 'Courier',
  fileName: 'Courier-BoldOblique',
  styles: ['bolditalics'],
  URL: getUrl('Courier-BoldOblique'),
});

assetsLoader.registerFont({
  name: 'Helvetica',
  fileName: 'Helvetica',
  styles: ['normal'],
  URL: getUrl('Helvetica'),
});
assetsLoader.registerFont({
  name: 'Helvetica',
  fileName: 'Helvetica-Oblique',
  styles: ['italics'],
  URL: getUrl('Helvetica-Oblique'),
});
assetsLoader.registerFont({
  name: 'Helvetica',
  fileName: 'Helvetica-Bold',
  styles: ['bold'],
  URL: getUrl('Helvetica-Bold'),
});
assetsLoader.registerFont({
  name: 'Helvetica',
  fileName: 'Helvetica-BoldOblique',
  styles: ['bolditalics'],
  URL: getUrl('Helvetica-BoldOblique'),
});

assetsLoader.registerFont({
  name: 'Times',
  fileName: 'Times-Roman',
  styles: ['normal'],
  URL: getUrl('Times-Roman'),
});
assetsLoader.registerFont({
  name: 'Times',
  fileName: 'Times-Italic',
  styles: ['italics'],
  URL: getUrl('Times-Italic'),
});
assetsLoader.registerFont({
  name: 'Times',
  fileName: 'Times-Bold',
  styles: ['bold'],
  URL: getUrl('Times-Bold'),
});
assetsLoader.registerFont({
  name: 'Times',
  fileName: 'Times-BoldItalic',
  styles: ['bolditalics'],
  URL: getUrl('Times-BoldItalic'),
});

assetsLoader.registerFont({
  name: 'Symbol',
  fileName: 'Symbol',
  URL: getUrl('Symbol'),
});

assetsLoader.registerFont({
  name: 'ZapfDingbats',
  fileName: 'ZapfDingbats',
  URL: getUrl('ZapfDingbats'),
});

assetsLoader
  .load()
  .then(() => {
    assetsLoader.configurePdfMake(pdfMake);
    fontsLoaded = true;
  })
  .catch(() => {
    // will fail if one of the files fails to load
    // configure pdfMake with the files that loaded correctly
    assetsLoader.configurePdfMake(pdfMake);
    fontsLoaded = true;
  });

async function waitForFonts() {
  while (true) {
    if (fontsLoaded) return;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

function sanitizeDefinition(definition: any) {
  if (typeof definition !== 'object' || definition === 'null') {
    throw new Error(`Pdf: Invalid pdf definition`);
  }
  const fontPropertyPath = 'defaultStyle.font';
  if (get(fontPropertyPath, definition)) {
    return definition;
  }
  return set(fontPropertyPath, 'Helvetica', definition);
}

export async function createDataUrlFromDefinition(
  definition: any,
): Promise<string> {
  const sanitizedDefinition = sanitizeDefinition(definition);
  const pdfDocGenerator = new pdfMake.createPdf(sanitizedDefinition);
  await waitForFonts();
  return new Promise(resolve => {
    pdfDocGenerator.getDataUrl(resolve);
  });
}
