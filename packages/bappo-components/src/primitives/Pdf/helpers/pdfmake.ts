import { get, set } from 'lodash/fp';
import pdfMake from 'pdfmake';

import InteractionManager from '../../../internals/InteractionManager';
import { PdfDefinitionSource } from '../types';

const filePathSymbol = Symbol('pdfFilePath');

interface FontFileDefinition {
  fileName: string;
  url: string;
  [filePathSymbol]?: string;
}

const getStandardFontFileDefinition = (
  fileName: string,
): FontFileDefinition => {
  return {
    fileName,
    url: `https://unpkg.com/pdfkit@0.10.0/js/data/${fileName}.afm`,
    [filePathSymbol]: `data/${fileName}.afm`,
  };
};

const fontDefinitions: {
  [fontName: string]: {
    [fontStyle: string]: FontFileDefinition;
  };
} = {
  Courier: {
    normal: getStandardFontFileDefinition('Courier'),
    bold: getStandardFontFileDefinition('Courier-Bold'),
    italics: getStandardFontFileDefinition('Courier-Oblique'),
    bolditalics: getStandardFontFileDefinition('Courier-BoldOblique'),
  },
  Helvetica: {
    normal: getStandardFontFileDefinition('Helvetica'),
    bold: getStandardFontFileDefinition('Helvetica-Bold'),
    italics: getStandardFontFileDefinition('Helvetica-Oblique'),
    bolditalics: getStandardFontFileDefinition('Helvetica-BoldOblique'),
  },
  Times: {
    normal: getStandardFontFileDefinition('Times-Roman'),
    bold: getStandardFontFileDefinition('Times-Bold'),
    italics: getStandardFontFileDefinition('Times-Italic'),
    bolditalics: getStandardFontFileDefinition('Times-BoldItalic'),
  },
  Symbol: {
    normal: getStandardFontFileDefinition('Symbol'),
  },
  ZapfDingbats: {
    normal: getStandardFontFileDefinition('ZapfDingbats'),
  },
};

const defaultFont = {
  name: 'Helvetica',
  style: 'normal',
};

/**
 * Save font data to pdfMake's virtual file system
 */
function saveFontFile(filePath: string, data: string | ArrayBuffer) {
  if (!pdfMake.vfs) {
    pdfMake.vfs = {};
  }
  pdfMake.vfs[filePath] = data;
}

/**
 * Fetch font file and register with pdfmake
 */
async function fetchFontFile(
  fontName: string,
  fontStyle: string,
  fontFileDefinition: FontFileDefinition,
) {
  const data = await new Promise<string | ArrayBuffer>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', fontFileDefinition.url, true);
    // get afm files for standard fonts as text and custom fonts as arraybuffer
    const isStandard = !!fontFileDefinition[filePathSymbol];
    request.responseType = isStandard ? 'text' : 'arraybuffer';

    request.onload = function(e) {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject(
          new Error(
            `Fetching "${fontFileDefinition.url}" failed: ${request.statusText}`,
          ),
        );
      }
    };

    request.onerror = (error) =>
      new Error(`Fetching "${fontFileDefinition.url}" failed: ${error}`);

    request.send();
  });

  const fontPath =
    fontFileDefinition[filePathSymbol] || fontFileDefinition.fileName;
  saveFontFile(fontPath, data);

  // register font with pdfmake
  pdfMake.fonts[fontName][fontStyle] = fontFileDefinition.fileName;
}

const MAX_RETRIES = 3;
async function fetchFontFileWithRetry(
  fontName: string,
  fontStyle: string,
  fontFileDefinition: FontFileDefinition,
) {
  let numOfAttempts = 0;
  while (true) {
    try {
      await fetchFontFile(fontName, fontStyle, fontFileDefinition);
      return;
    } catch (err) {
      numOfAttempts += 1;
      if (numOfAttempts >= MAX_RETRIES) {
        if (fontName === defaultFont.name && fontStyle === defaultFont.style) {
          // throw err if failed to load default font
          throw err;
        } else {
          // not throwing error and just use the default font as a fallback
          console.warn(
            `Failed to fetch font ${fontName} (${fontStyle}). Falling back to ${defaultFont.name} (${defaultFont.style}).`,
          );
          return;
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

const createFileManager = () => {
  const fileStatusMap: {
    [fileName: string]: 'pending' | 'fulfilled' | 'rejected';
  } = {};
  let allFontFilesSettled = false;
  let resolveAllFilesSettled: () => void;
  let allFontFilesSettledPromise = new Promise((resolve) => {
    resolveAllFilesSettled = () => {
      allFontFilesSettled = true;
      resolve();
    };
  });
  const tryResolveAllFilesSettled = () => {
    if (
      Object.values(fileStatusMap).every(
        (status) => status === 'fulfilled' || status === 'rejected',
      )
    ) {
      resolveAllFilesSettled();
    }
  };

  return {
    add(fileName: string, fetchFile: () => Promise<any>) {
      if (fileStatusMap[fileName]) {
        // file already loaded
        return;
      }

      // reset promise if it's already settled
      if (allFontFilesSettled) {
        allFontFilesSettledPromise = new Promise((resolve) => {
          resolveAllFilesSettled = () => {
            allFontFilesSettled = true;
            resolve();
          };
        });
      }

      fileStatusMap[fileName] = 'pending';
      fetchFile()
        .then(() => {
          fileStatusMap[fileName] = 'fulfilled';
          tryResolveAllFilesSettled();
        })
        .catch((err) => {
          console.error(err);
          fileStatusMap[fileName] = 'rejected';
          tryResolveAllFilesSettled();
        });
    },
    async waitForAll() {
      await allFontFilesSettledPromise;
    },
  };
};
const fileManager = createFileManager();

function loadFontIfNecessary(
  fontName: string,
  fontStyle: string,
  fontFileDefinition: FontFileDefinition,
) {
  const { fileName } = fontFileDefinition;
  if (!pdfMake.fonts[fontName]) {
    // point to the default font so that if the font failed to load we can still
    // show something instead of crashing
    pdfMake.fonts[fontName] = {
      normal: fontDefinitions[defaultFont.name][defaultFont.style].fileName,
    };
  }

  fileManager.add(fileName, () =>
    fetchFontFileWithRetry(fontName, fontStyle, fontFileDefinition),
  );
}

export function initializePdfFonts() {
  if (!pdfMake.fonts) {
    pdfMake.fonts = {};
  }

  // load all font files if not loaded yet
  InteractionManager.runAfterInteractions(async () => {
    Object.entries(fontDefinitions).forEach(([fontName, fontDefinition]) => {
      Object.entries(fontDefinition).forEach(
        ([fontStyle, fontFileDefinition]) => {
          loadFontIfNecessary(fontName, fontStyle, fontFileDefinition);
        },
      );
    });
  });
}

function sanitizeDefinition(definition: any) {
  if (typeof definition !== 'object' || definition === 'null') {
    throw new Error(`Pdf: Invalid pdf definition`);
  }
  const fontPropertyPath = 'defaultStyle.font';
  if (get(fontPropertyPath, definition)) {
    return definition;
  }
  return set(fontPropertyPath, defaultFont.name, definition);
}

function sanitizeTableLayouts(tableLayouts: any) {
  if (tableLayouts === undefined) return tableLayouts;
  if (typeof tableLayouts !== 'object' || tableLayouts === 'null') {
    throw new Error(`Pdf: Invalid table layouts`);
  }
  return tableLayouts;
}

export async function createDataUrlFromDefinition({
  definition,
  fonts,
  tableLayouts,
}: PdfDefinitionSource): Promise<string> {
  const sanitizedDefinition = sanitizeDefinition(definition);
  const sanitizedTableLayouts = sanitizeTableLayouts(tableLayouts);

  // load custom fonts
  if (fonts) {
    Object.entries(fonts).forEach(([fontName, fontDefinition]) => {
      Object.entries(fontDefinition).forEach(([fontStyle, url]) => {
        if (url) {
          loadFontIfNecessary(fontName, fontStyle, {
            fileName: `${fontName}-${fontStyle}`,
            url,
          });
        }
      });
    });
  }

  // TODO: only wait for fonts used by the definition
  await fileManager.waitForAll();

  const pdfDocGenerator = pdfMake.createPdf(
    sanitizedDefinition,
    sanitizedTableLayouts,
  );
  return new Promise((resolve) => {
    pdfDocGenerator.getDataUrl(resolve);
  });
}
