// https://github.com/exif-js/exif-js/blob/master/exif.js
const debug = false;

const ExifTags = {
  0xa002: 'PixelXDimension', // Valid width of meaningful image
  0xa003: 'PixelYDimension', // Valid height of meaningful image
};

const TiffTags = {
  0x8769: 'ExifIFDPointer',
  0x0112: 'Orientation',
};

function base64ToArrayBuffer(base64, contentType) {
  contentType = contentType || base64.match(/^data:([^;]+);base64,/im)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
  base64 = base64.replace(/^data:([^;]+);base64,/gim, '');
  const binary = atob(base64);
  const len = binary.length;
  const buffer = new ArrayBuffer(len);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    view[i] = binary.charCodeAt(i);
  }
  return buffer;
}

function objectURLToBlob(url, callback) {
  const http = new XMLHttpRequest();
  http.open('GET', url, true);
  http.responseType = 'blob';
  http.onload = function(e) {
    if (this.status === 200 || this.status === 0) {
      callback(this.response);
    }
  };
  http.send();
}

export async function getImageMeta(img) {
  if (img.src) {
    if (/^data:/i.test(img.src)) {
      // Data URI
      const arrayBuffer = base64ToArrayBuffer(img.src);
      return findEXIFinJPEG(arrayBuffer);
    } else if (/^blob:/i.test(img.src)) {
      // Object URL
      const fileReader = new FileReader();
      return new Promise((resolve, reject) => {
        fileReader.onload = (e) => {
          resolve(findEXIFinJPEG(e.target.result));
        };
        fileReader.onerror = (err) => {
          reject(err);
        };
        objectURLToBlob(img.src, (blob) => {
          fileReader.readAsArrayBuffer(blob);
        });
      });
    } else {
      let http = new XMLHttpRequest();
      return new Promise((resolve, reject) => {
        http.onload = function() {
          if (this.status === 200 || this.status === 0) {
            resolve(findEXIFinJPEG(http.response));
          } else {
            reject(new Error('Could not load image'));
          }
          http = null;
        };
        http.onerror = (err) => {
          reject(err);
        };
        http.open('GET', img.src, true);
        http.responseType = 'arraybuffer';
        http.send(null);
      });
    }
  } else if (
    window.FileReader &&
    (img instanceof window.Blob || img instanceof window.File)
  ) {
    const fileReader = new FileReader();
    return new Promise((resolve) => {
      fileReader.onload = (e) => {
        if (debug)
          console.log('Got file of length ' + e.target.result.byteLength);
        resolve(findEXIFinJPEG(e.target.result));
      };

      fileReader.readAsArrayBuffer(img);
    });
  }
}

function findEXIFinJPEG(file) {
  const dataView = new DataView(file);

  if (debug) console.log('Got file of length ' + file.byteLength);
  if (dataView.getUint8(0) !== 0xff || dataView.getUint8(1) !== 0xd8) {
    if (debug) console.log('Not a valid JPEG');
    return undefined; // not a valid jpeg
  }

  let offset = 2;
  const length = file.byteLength;

  while (offset < length) {
    if (dataView.getUint8(offset) !== 0xff) {
      if (debug)
        console.log(
          'Not a valid marker at offset ' +
            offset +
            ', found: ' +
            dataView.getUint8(offset),
        );
      return undefined; // not a valid marker, something is wrong
    }

    const marker = dataView.getUint8(offset + 1);
    if (debug) console.log(marker);

    // we could implement handling for other markers here,
    // but we're only looking for 0xFFE1 for EXIF data

    if (marker === 225) {
      if (debug) console.log('Found 0xFFE1 marker');

      return readEXIFData(
        dataView,
        offset + 4,
        dataView.getUint16(offset + 2) - 2,
      );

      // offset += 2 + file.getShortAt(offset+2, true);
    } else {
      offset += 2 + dataView.getUint16(offset + 2);
    }
  }
}

function readTags(file, tiffStart, dirStart, strings, bigEnd) {
  const entries = file.getUint16(dirStart, !bigEnd);
  const tags = {};

  for (let i = 0; i < entries; i++) {
    const entryOffset = dirStart + i * 12 + 2;
    const tag = strings[file.getUint16(entryOffset, !bigEnd)];
    if (tag) {
      tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
    }
  }
  return tags;
}

function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
  const type = file.getUint16(entryOffset + 2, !bigEnd);
  const numValues = file.getUint32(entryOffset + 4, !bigEnd);
  const valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart;

  switch (type) {
    case 1: // byte, 8-bit unsigned int
    case 7: // undefined, 8-bit byte, value depending on field
      if (numValues === 1) {
        return file.getUint8(entryOffset + 8, !bigEnd);
      } else {
        const offset = numValues > 4 ? valueOffset : entryOffset + 8;
        const vals = [];
        for (let n = 0; n < numValues; n++) {
          vals[n] = file.getUint8(offset + n);
        }
        return vals;
      }

    case 2: // ascii, 8-bit byte
      const offset = numValues > 4 ? valueOffset : entryOffset + 8;
      return getStringFromDB(file, offset, numValues - 1);

    case 3: // short, 16 bit int
      if (numValues === 1) {
        return file.getUint16(entryOffset + 8, !bigEnd);
      } else {
        const offset = numValues > 2 ? valueOffset : entryOffset + 8;
        const vals = [];
        for (let n = 0; n < numValues; n++) {
          vals[n] = file.getUint16(offset + 2 * n, !bigEnd);
        }
        return vals;
      }

    case 4: // long, 32 bit int
      if (numValues === 1) {
        return file.getUint32(entryOffset + 8, !bigEnd);
      } else {
        const vals = [];
        for (let n = 0; n < numValues; n++) {
          vals[n] = file.getUint32(valueOffset + 4 * n, !bigEnd);
        }
        return vals;
      }

    case 5: // rational = two long values, first is numerator, second is denominator
      if (numValues === 1) {
        const numerator = file.getUint32(valueOffset, !bigEnd);
        const denominator = file.getUint32(valueOffset + 4, !bigEnd);
        const val = new Number(numerator / denominator); // eslint-disable-line no-new-wrappers
        val.numerator = numerator;
        val.denominator = denominator;
        return val;
      } else {
        const vals = [];
        for (let n = 0; n < numValues; n++) {
          const numerator = file.getUint32(valueOffset + 8 * n, !bigEnd);
          const denominator = file.getUint32(valueOffset + 4 + 8 * n, !bigEnd);
          vals[n] = new Number(numerator / denominator); // eslint-disable-line no-new-wrappers
          vals[n].numerator = numerator;
          vals[n].denominator = denominator;
        }
        return vals;
      }

    case 9: // slong, 32 bit signed int
      if (numValues === 1) {
        return file.getInt32(entryOffset + 8, !bigEnd);
      } else {
        const vals = [];
        for (let n = 0; n < numValues; n++) {
          vals[n] = file.getInt32(valueOffset + 4 * n, !bigEnd);
        }
        return vals;
      }

    case 10: // signed rational, two slongs, first is numerator, second is denominator
      if (numValues === 1) {
        return (
          file.getInt32(valueOffset, !bigEnd) /
          file.getInt32(valueOffset + 4, !bigEnd)
        );
      } else {
        const vals = [];
        for (let n = 0; n < numValues; n++) {
          vals[n] =
            file.getInt32(valueOffset + 8 * n, !bigEnd) /
            file.getInt32(valueOffset + 4 + 8 * n, !bigEnd);
        }
        return vals;
      }
    default:
      throw new Error();
  }
}

function getStringFromDB(buffer, start, length) {
  let outstr = '';
  for (let n = start; n < start + length; n++) {
    outstr += String.fromCharCode(buffer.getUint8(n));
  }
  return outstr;
}

function readEXIFData(file, start) {
  if (getStringFromDB(file, start, 4) !== 'Exif') {
    if (debug)
      console.log('Not valid EXIF data! ' + getStringFromDB(file, start, 4));
    return undefined;
  }

  let bigEnd;
  const tiffOffset = start + 6;

  // test for TIFF validity and endianness
  if (file.getUint16(tiffOffset) === 0x4949) {
    bigEnd = false;
  } else if (file.getUint16(tiffOffset) === 0x4d4d) {
    bigEnd = true;
  } else {
    if (debug) console.log('Not valid TIFF data! (no 0x4949 or 0x4D4D)');
    return undefined;
  }

  if (file.getUint16(tiffOffset + 2, !bigEnd) !== 0x002a) {
    if (debug) console.log('Not valid TIFF data! (no 0x002A)');
    return undefined;
  }

  const firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);

  if (firstIFDOffset < 0x00000008) {
    if (debug)
      console.log(
        'Not valid TIFF data! (First offset less than 8)',
        file.getUint32(tiffOffset + 4, !bigEnd),
      );
    return undefined;
  }

  const tags = readTags(
    file,
    tiffOffset,
    tiffOffset + firstIFDOffset,
    TiffTags,
    bigEnd,
  );

  if (tags.ExifIFDPointer) {
    const exifData = readTags(
      file,
      tiffOffset,
      tiffOffset + tags.ExifIFDPointer,
      ExifTags,
      bigEnd,
    );
    for (const tag in exifData) {
      tags[tag] = exifData[tag];
    }
    delete tags.ExifIFDPointer;
  }

  return tags;
}

export function isPortrait(orientation) {
  return orientation >= 5 && orientation <= 8;
}
