import { A as AstroError, e as InvalidImageService, f as ExpectedImageOptions, E as ExpectedImage, F as FailedToFetchRemoteImageDimensions, c as createAstro, d as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, u as unescapeHTML, j as Fragment, k as renderSlot, l as renderHead } from '../astro_BcvtDIcF.mjs';
/* empty css                              */
import 'kleur/colors';
import { clsx } from 'clsx';
/* empty css                          */
import { i as isRemoteImage, a as isESMImportedImage, b as isLocalService, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_uGp07fQG.mjs';
import { getIconData, iconToSVG } from '@iconify/utils';
import { twMerge } from 'tailwind-merge';
import { jsx, jsxs } from 'preact/jsx-runtime';
import { useState } from 'preact/hooks';
import { Lucia } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import { eq } from '@astrojs/db/dist/runtime/config.js';
import { GitHub } from 'arctic';

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4)
    return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize)
    return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box)
      break;
    if (box.name === boxName)
      return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0)
      return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1)
      return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0)
      return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength)
      return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1)
      return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox)
      return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  // eslint-disable-next-line regexp/prefer-d
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = toUTF8String(input).match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type) > -1) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done)
      break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_uGp07fQG.mjs'
    ).then(n => n.h).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$8 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "F:/Mis cosas/Programacion/msb-astro/node_modules/astro/components/Image.astro", void 0);

const $$Astro$7 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "F:/Mis cosas/Programacion/msb-astro/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const outDir = new URL("file:///F:/Mis%20cosas/Programacion/msb-astro/.vercel/output/static/");
					new URL("_astro", outDir);
					const getImage = async (options) => await getImage$1(options, imageConfig);

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN, {"PUBLIC_GOOGLE_MAPS_API_KEY": "AIzaSyC-ogGcelbNV0lstR2iFzBgdhXvRmzxvBI", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const User = asDrizzleTable("User", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true, "optional": false } }, "username": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "username", "collection": "User", "primaryKey": false, "optional": false } }, "password": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "password", "collection": "User", "primaryKey": false, "optional": true } }, "github_id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "github_id", "collection": "User", "primaryKey": false, "optional": true } } }, "deprecated": false }, false);
const Session = asDrizzleTable("Session", { "columns": { "id": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "Session", "primaryKey": false, "optional": false } }, "userId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "userId", "collection": "Session", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true, "optional": false } } } }, "expiresAt": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "expiresAt", "collection": "Session", "primaryKey": false, "optional": false } } }, "deprecated": false }, false);
const Favorites = asDrizzleTable("Favorites", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "Favorites", "primaryKey": true, "optional": false } }, "userId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "userId", "collection": "Favorites", "primaryKey": false, "optional": false, "references": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true, "optional": false } } } }, "publicationId": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "publicationId", "collection": "Favorites", "primaryKey": false, "optional": false } }, "publicationSuc": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "publicationSuc", "collection": "Favorites", "primaryKey": false, "optional": false } }, "isEntrepreneurshipPublic": { "type": "boolean", "schema": { "optional": false, "unique": false, "deprecated": false, "name": "isEntrepreneurshipPublic", "collection": "Favorites" } } }, "deprecated": false }, false);

const adapter = new DrizzleSQLiteAdapter(db, Session, User);
const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: true
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      githubId: attributes.github_id,
      username: attributes.username
    };
  }
});
const github = new GitHub({"PUBLIC_GOOGLE_MAPS_API_KEY": "AIzaSyC-ogGcelbNV0lstR2iFzBgdhXvRmzxvBI", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.GITHUB_CLIENT_ID, {"PUBLIC_GOOGLE_MAPS_API_KEY": "AIzaSyC-ogGcelbNV0lstR2iFzBgdhXvRmzxvBI", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}.GITHUB_CLIENT_SECRET);

const API_BASE_URL = "https://xintel.com.ar/api";
const cache$1 = {};
async function fetchData(endpoint, queryParams) {
  const {
    INM,
    APIK
  } = Object.assign({"PUBLIC_GOOGLE_MAPS_API_KEY": "AIzaSyC-ogGcelbNV0lstR2iFzBgdhXvRmzxvBI", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined}, { INM: "MSB", APIK: "DUDJETZ4CLD10ZQ0PIR3Y3R23" });
  if (!INM || !APIK) {
    throw new Error("Se requieren las claves INM y APIK en el archivo .env");
  }
  const cacheKey = `${endpoint}-${JSON.stringify(queryParams || {})}`;
  if (cache$1[cacheKey]) {
    return cache$1[cacheKey];
  }
  const url = new URL(`${API_BASE_URL}?json=${endpoint}`);
  const authParams = {
    inm: INM,
    apiK: APIK
  };
  Object.keys(authParams).forEach((key) => url.searchParams.set(key, String(authParams[key])));
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => url.searchParams.append(key, String(value)));
  }
  try {
    const controller = new AbortController();
    const signal = controller.signal;
    const response = await fetch(url.toString(), {
      signal
    });
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    const res = await response.json();
    cache$1[cacheKey] = res;
    return res;
  } catch (error) {
    console.error("Error de red:", error);
    throw error;
  }
}

const $$Astro$6 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "F:/Mis cosas/Programacion/msb-astro/node_modules/astro/components/ViewTransitions.astro", void 0);

const ourServicesNavItems = [{
  label: "Nuestros Servicios",
  href: "/servicios",
  icon: "note-check",
  dropdown: [{
    label: "Nuestros Servicios",
    category: "our-services",
    isTitle: true
  }, {
    label: "Tasaciones",
    category: "our-services",
    href: "/servicios/tasaciones"
  }, {
    label: "Administración",
    category: "our-services",
    href: "/servicios/administracion"
  }]
}];
const contactUsNavItems = [{
  label: "Contacto",
  href: "/contacto",
  icon: "mail"
}];
const joinUsNavItems = [{
  label: "Sumate a nuestro equipo",
  href: "/sumate",
  icon: "paper-user"
}];
const navItems = [
  ...contactUsNavItems,
  ...joinUsNavItems,
  ...ourServicesNavItems
  /*  ...gatedCommunities, */
];

const icons = {"local":{"prefix":"local","lastModified":1711548872,"icons":{"brand-linkedin":{"body":"<path fill=\"currentColor\" d=\"M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z\"/>"},"brand-wechat":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"><path stroke=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M16.5 10c3.038 0 5.5 2.015 5.5 4.5 0 1.397-.778 2.645-2 3.47V20l-1.964-1.178A6.649 6.649 0 0 1 16.5 19c-3.038 0-5.5-2.015-5.5-4.5s2.462-4.5 5.5-4.5z\"/><path d=\"M11.197 15.698c-.69.196-1.43.302-2.197.302a8.008 8.008 0 0 1-2.612-.432L4 17v-2.801C2.763 13.117 2 11.635 2 10c0-3.314 3.134-6 7-6 3.782 0 6.863 2.57 7 5.785v.233M10 8h.01M7 8h.01M15 14h.01M18 14h.01\"/></g>"},"chevron-down":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"m6 9 6 6 6-6\"/></g>"},"cross":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M18 6 6 18M6 6l12 12\"/></g>"},"heart-default":{"body":"<path fill=\"currentColor\" stroke=\"currentColor\" stroke-width=\"2\" d=\"m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z\"/>"},"heart-solid":{"body":"<path fill=\"#494949\" stroke=\"#494949\" stroke-width=\"2\" d=\"m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z\"/>"},"home-1":{"body":"<g fill=\"currentColor\"><path d=\"M12.254 5.069a.5.5 0 0 0-.508 0l-8.93 5.254.506.861L12 6.08l8.677 5.105.508-.862L18 8.45V6a.5.5 0 0 0-.5-.5H16a.5.5 0 0 0-.5.5v.979l-3.246-1.91ZM7 12.5h5.5v3H7v-3Z\"/><path fill-rule=\"evenodd\" d=\"m12 7-7 4v7H2.5a.5.5 0 0 0 0 1h18a.5.5 0 0 0 0-1H19v-7l-7-4Zm0 1.152L6 11.58V18h8v-5.5h3V18h1v-6.42l-6-3.428Z\" clip-rule=\"evenodd\"/></g>"},"home-2":{"body":"<path fill=\"currentColor\" d=\"M12 2.1 1 12h3v9h7v-6h2v6h7v-9h3L12 2.1zm0 2.691 6 5.4V19h-3v-6H9v6H6v-8.809l6-5.4z\"/>"},"logout":{"body":"<path fill=\"#494949\" d=\"M5 21c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 3 19V5c0-.55.196-1.02.588-1.412A1.93 1.93 0 0 1 5 3h7v2H5v14h7v2H5Zm11-4-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5-5 5Z\"/>"},"mail":{"body":"<path fill=\"currentColor\" d=\"M19.2 4.8c.821 0 1.609.316 2.19.879.58.562.907 1.325.907 2.121v9.6a2.95 2.95 0 0 1-.907 2.121 3.148 3.148 0 0 1-2.19.879H5.574a3.148 3.148 0 0 1-2.19-.879 2.953 2.953 0 0 1-.907-2.121V7.8c0-.796.327-1.559.907-2.121a3.148 3.148 0 0 1 2.19-.879H19.2Zm1.858 4.753-8.356 4.764a.633.633 0 0 1-.528.046l-.101-.046-8.357-4.761V17.4c0 .477.196.935.544 1.273.349.337.821.527 1.314.527H19.2c.493 0 .965-.19 1.314-.527.348-.338.544-.796.544-1.273V9.553ZM19.2 6H5.574c-.493 0-.965.19-1.314.527A1.772 1.772 0 0 0 3.716 7.8v.362l8.671 4.942 8.671-4.944V7.8c0-.477-.196-.935-.544-1.273A1.889 1.889 0 0 0 19.2 6Z\"/>"},"mail-green":{"body":"<path fill=\"#4E5A2B\" d=\"M18.6 5.3a3 3 0 0 1 3 3v9.6a3 3 0 0 1-3 3H5.4a3 3 0 0 1-3-3V8.3a3 3 0 0 1 3-3h13.2Zm1.8 4.753-8.095 4.764a.6.6 0 0 1-.511.046l-.099-.046L3.6 10.056V17.9a1.8 1.8 0 0 0 1.8 1.8h13.2a1.8 1.8 0 0 0 1.8-1.8v-7.847ZM18.6 6.5H5.4a1.8 1.8 0 0 0-1.8 1.8v.362l8.4 4.942 8.4-4.944V8.3a1.8 1.8 0 0 0-1.8-1.8Z\"/>","height":25},"map-pin":{"body":"<path fill=\"#f41922\" stroke=\"#5a0000\" stroke-width=\"5.7\" d=\"M-995.72 1225.8c-.273-.78-1.645-6.027-3.049-11.662-4.441-17.823-12.122-36.988-22.546-56.255-5.984-11.061-7.067-12.824-24.551-40-28.252-43.911-33.217-56.241-32.173-79.89.957-21.672 8.272-37.909 24.149-53.61 13.179-13.032 27.807-20.549 45.601-23.432 44.097-7.145 86.878 21.883 95.546 64.828 2.02 10.012 1.572 27.243-.953 36.604-2.77 10.269-13.883 31.045-29.589 55.315-28.348 43.807-39.082 65.687-47.119 96.05-3.111 11.755-4.398 14.673-5.316 12.052z\" transform=\"matrix(.18403 0 0 .17534 214.35 -157.87)\"/><path fill=\"#0e232e\" d=\"M37.699 26.917c0 3.183-2.837 5.763-6.336 5.763-3.5 0-6.337-2.58-6.337-5.763 0-3.182 2.837-5.762 6.337-5.762s6.336 2.58 6.336 5.762z\"/>","width":64,"height":64},"menu":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M4 6h16M4 12h16M4 18h16\"/></g>"},"note-check":{"body":"<path fill=\"currentColor\" d=\"m13.535 22.5 1.5 1.5H3V3h6c0-.414.078-.8.234-1.16.157-.36.371-.68.645-.961a2.81 2.81 0 0 1 .95-.645A3.195 3.195 0 0 1 12 0c.414 0 .8.078 1.16.234.36.157.68.371.961.645.281.273.496.59.645.95.148.359.226.75.234 1.171h6v12.035l-1.5 1.5V4.5H18v3H6v-3H4.5v18h9.035ZM7.5 4.5V6h9V4.5h-3V3c0-.21-.04-.406-.117-.586a1.503 1.503 0 0 0-.317-.469 1.634 1.634 0 0 0-.48-.328A1.27 1.27 0 0 0 12 1.5a1.477 1.477 0 0 0-1.055.434 1.634 1.634 0 0 0-.328.48A1.27 1.27 0 0 0 10.5 3v1.5h-3Zm16.277 12.527-6.527 6.54-3.152-3.165 1.054-1.054 2.098 2.086 5.473-5.461 1.054 1.054Z\"/>"},"paper-user":{"body":"<g fill=\"none\"><path fill=\"currentColor\" d=\"M7.8 15a.6.6 0 1 1 0-1.2h8.4a.6.6 0 0 1 0 1.2H7.8Zm0 3a.6.6 0 1 1 0-1.2h8.4a.6.6 0 0 1 0 1.2H7.8Z\"/><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M13.422 1.2H5.4A1.8 1.8 0 0 0 3.6 3v18a1.8 1.8 0 0 0 1.8 1.8h13.2a1.8 1.8 0 0 0 1.8-1.8V8.642a1.8 1.8 0 0 0-.474-1.216l-5.177-5.643a1.8 1.8 0 0 0-1.327-.583ZM4.8 3a.6.6 0 0 1 .6-.6h8.022a.6.6 0 0 1 .443.194l5.177 5.643a.6.6 0 0 1 .158.405V21a.6.6 0 0 1-.6.6H5.4a.6.6 0 0 1-.6-.6V3Z\" clip-rule=\"evenodd\"/><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.8 2.52v5.64h5.64\"/><path fill=\"currentColor\" d=\"M9.76 7.36a1.28 1.28 0 1 0 .08-2.56 1.28 1.28 0 0 0-.078 2.56Z\"/><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"M12.32 10.133c0-1.36-1.147-2.346-2.56-2.346-1.414 0-2.56.984-2.56 2.346v.64a.427.427 0 0 0 .427.427h4.266a.427.427 0 0 0 .426-.426v-.641Z\" clip-rule=\"evenodd\"/></g>"},"social-facebook":{"body":"<path fill=\"#4E5A2B\" d=\"M13.397 20.997V12.8h2.765l.411-3.21h-3.176V7.549c0-.926.258-1.56 1.587-1.56h1.684V3.127c-.82-.088-1.643-.13-2.467-.127-2.444 0-4.122 1.492-4.122 4.23v2.356H7.332v3.209h2.753v8.202h3.312Z\"/>"},"social-instagram":{"body":"<path fill=\"#4E5A2B\" d=\"M11.997 5.843A6.148 6.148 0 0 0 5.84 12a6.148 6.148 0 0 0 6.157 6.157A6.148 6.148 0 0 0 18.154 12a6.148 6.148 0 0 0-6.157-6.157Zm0 10.159A4.01 4.01 0 0 1 7.995 12a4.01 4.01 0 0 1 4.002-4.002A4.01 4.01 0 0 1 15.998 12a4.01 4.01 0 0 1-4.001 4.002Zm6.409-11.846c-.796 0-1.438.642-1.438 1.438 0 .795.642 1.438 1.438 1.438a1.434 1.434 0 0 0 1.329-1.989 1.436 1.436 0 0 0-1.329-.887ZM23.999 12c0-1.657.015-3.3-.078-4.953-.093-1.922-.532-3.627-1.937-5.032C20.576.607 18.874.172 16.953.08 15.296-.014 13.653 0 12 0c-1.657 0-3.3-.015-4.953.078C5.125.172 3.42.61 2.015 2.015.607 3.423.172 5.125.08 7.047-.014 8.704 0 10.346 0 12c0 1.654-.015 3.3.078 4.953.093 1.922.531 3.627 1.936 5.032 1.408 1.408 3.11 1.843 5.032 1.936 1.658.093 3.3.079 4.954.079 1.657 0 3.299.015 4.953-.078 1.921-.093 3.626-.531 5.031-1.936 1.408-1.408 1.843-3.11 1.937-5.032.096-1.654.078-3.296.078-4.953Zm-2.642 7.079c-.22.546-.483.954-.907 1.375a3.839 3.839 0 0 1-1.375.906c-1.579.628-5.328.487-7.078.487s-5.503.14-7.082-.484a3.814 3.814 0 0 1-1.375-.906 3.84 3.84 0 0 1-.906-1.375C2.009 17.5 2.15 13.75 2.15 12s-.14-5.503.484-7.082c.219-.546.483-.954.906-1.375a3.88 3.88 0 0 1 1.375-.906c1.58-.625 5.332-.484 7.082-.484s5.502-.14 7.081.484c.547.219.955.483 1.375.906.424.424.688.829.907 1.375.624 1.58.483 5.332.483 7.082s.141 5.5-.486 7.079Z\"/>"},"social-whatsapp":{"body":"<path fill=\"#4E5A2B\" d=\"M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01Zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.22-.16-.47-.28Z\"/>"},"social-youtube":{"body":"<path fill=\"#4E5A2B\" d=\"m10 15 5.19-3L10 9v6Zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73Z\"/>"},"userDefault":{"body":"<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path stroke=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M3 12a9 9 0 1 0 18 0 9 9 0 1 0-18 0\"/><path d=\"M9 10a3 3 0 1 0 6 0 3 3 0 1 0-6 0m-2.832 8.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855\"/></g>"}},"width":24,"height":24}};

const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$5 = createAstro();
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
    }
  }
  const req = Astro2.request;
  const { name = "", title, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "xlink:href")}></use> ` })}`} </svg>`;
}, "F:/Mis cosas/Programacion/msb-astro/node_modules/astro-icon/components/Icon.astro", void 0);

const HeartIcon = ({
  addStyles
}) => {
  twMerge(clsx("h-100 w-100 object-contain", addStyles));
  return jsx("svg", {
    className: addStyles,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: jsx("path", {
      d: "M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z",
      stroke: addStyles ?? "currentColor",
      strokeWidth: "2"
    })
  });
};

const LogOutIcon = ({
  addStyles
}) => {
  const styles = twMerge(clsx("h-100 w-100 icon icon-tabler icon-tabler-calendar-month", addStyles));
  return jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    fill: styles,
    className: styles,
    children: jsx("path", {
      fill: styles,
      stroke: styles,
      d: "M5 21c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 0 1 3 19V5c0-.55.196-1.02.588-1.412A1.93 1.93 0 0 1 5 3h7v2H5v14h7v2H5Zm11-4-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5-5 5Z"
    })
  });
};

const NavDropDown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return jsxs("div", {
    class: "relative z-10 transition-all",
    children: [jsx("button", {
      onClick: toggleDropdown,
      class: "flex flex-row items-center",
      children: jsx("span", {
        children: props.label
      })
    }), isOpen && jsx("div", {
      className: " animate-fade-down animate-duration-300",
      children: props.childrenDrop
    })]
  });
};

const $$Astro$4 = createAstro();
const $$Link = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Link;
  const { class: className, checkActive = true, ...anchorProps } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const isActive = checkActive && currentPath === anchorProps.href;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([
    className,
    "flex items-center justify-start  border border-transparent rounded-medium text-sm font-medium  ",
    isActive ? " text-primary-msb rounded-none border-b-4 border-b-primary-msb" : "border-none text-gray-600 "
  ], "class:list")}${spreadAttributes(anchorProps)}> ${renderSlot($$result, $$slots["before"])} ${renderSlot($$result, $$slots["default"])} ${renderSlot($$result, $$slots["after"])} </a>`;
}, "F:/Mis cosas/Programacion/msb-astro/src/components/ui/Link.astro", void 0);

const $$Astro$3 = createAstro();
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { user } = Astro2.props;
  const { pathname } = Astro2.url;
  let session = user ? true : false;
  return renderTemplate`<!-- Menú de navegación para pantallas grandes --><!-- Navbar para pantallas grandes -->${maybeRenderHead()}<nav class="relative hidden lg:block bg-secondary-msb shadow-lg border-t-8 border-primary-msb lg:px-10"> <div class="container mx-auto flex justify-between items-center py-4"> <!-- Logo y enlace principal --> ${renderComponent($$result, "Link", $$Link, { "href": "/", "checkActive": false, "class": "flex items-center space-x-3" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Image", $$Image, { "width": 180, "height": 70, "src": "/images/logo.png", "alt": "Logo" })} ` })} <!-- Menú de navegación para pantallas grandes --> <div class="flex gap-4"> <ul class="flex flex-col font-semibold p-4 lg:p-0 rtl:space-x-reverse lg:flex-row-reverse lg:mt-0 md:border-0 gap-4"> <!-- Elementos del menú aquí --> ${navItems.map((item) => {
    return renderTemplate`<li class="flex items-center "> ${renderComponent($$result, "Link", $$Link, { "class": "flex justify-between mt-1 items-start gap-5 font-gotham " }, { "default": ($$result2) => renderTemplate`${item.dropdown ? renderTemplate`${renderComponent($$result2, "Link", $$Link, { "class": "rounded-none hover:border-b-4 text-xs font-gotham hover:border-b-primary-msb items-center hover:border-primary-msb hover:transition-all font-primary-font-msb " }, { "after": ($$result3) => renderTemplate`${renderComponent($$result3, "Icon", $$Icon, { "slot": "after", "class": " ml-2 w-4 h-4", "name": "chevron-down" })}`, "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "NavDropDown", NavDropDown, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Mis cosas/Programacion/msb-astro/src/components/preact/NavDropDown", "client:component-export": "default" }, { "childrenDrop": ($$result4) => renderTemplate`<div> <div${addAttribute(`absolute right-0  mt-2 px-1 lg:top-4 left-0 py-2 w-max rounded-md bg-secondary-msb shadow-lg z-20 animate-fadeIn `, "class")}> ${item.dropdown && item.dropdown?.map(
      (item2) => item2.href ? renderTemplate`${renderComponent($$result4, "Link", $$Link, { "href": item2.href ?? "", "class": "block px-3 py-2  font-primary-font-msb text-sm border border-none " }, { "default": ($$result5) => renderTemplate` <span class="font-primary-font-msb text-gray-600 font-semibold text-xs  hover:text-primary-msb hover:border-b-primary-msb uppercase "> ${item2.label} </span> ` })}` : renderTemplate`<span class="block px-3 py-2  font-semibold font-primary-font-msb   text-xs  text-primary-msb   "> ${item2.label} </span>`
    )} </div> </div>`, "label": ($$result4) => renderTemplate`<span${addAttribute(`${item?.dropdown?.some((h) => h.href === pathname) ? "rounded-none hover:border-b-4 hover:border-b-primary-msb items-center hover:border-primary-msb hover:transition-all font-primary-font-msb border-b-4 border-b-primary-msb border-primary-msb transition-all font-primary-font-msb uppercase font-gotham hover:text-primary-msb text-primary-msb " : "rounded-none hover:border-b-4 hover:border-b-primary-msb items-center hover:border-primary-msb hover:transition-all font-primary-font-msb uppercase font-gotham hover:text-primary-msb  "}`, "class")}> ${item.label} </span>` })}  ` })}` : item.label === "Contacto" ? renderTemplate`${renderComponent($$result2, "Link", $$Link, { "checkActive": false, "href": item.dropdown ? "" : item.href, "class": "flex flex-row items-center rounded-none hover:border-b-4 px-0" }, { "default": ($$result3) => renderTemplate` <span class=" flex items-center justify-end h-10 font-gotham text-xs border border-tertiary-msb px-2 bg-white text-gray-600 uppercase font-bold hover:bg-tertiary-bg-msb hover:text-white cursor-pointer rounded-md hover:border-tertiary-msb transition hover:transition-all tracking-wide"> ${item.label} </span> ` })}` : renderTemplate`${renderComponent($$result2, "Link", $$Link, { "checkActive": item.href === pathname, "href": item.dropdown ? "" : item.href, "class": "rounded-none hover:border-b-4 font-gotham uppercase font-semibold text-xs hover:border-b-primary-msb items-center hover:border-primary-msb hover:transition-all font-primary-font-msb transition-all" }, { "default": ($$result3) => renderTemplate` <span${addAttribute(`${item.href !== pathname && "rounded-none font-gotham  hover:text-primary-msb uppercase hover:border-b-primary-msb hover:border-primary-msb hover:border-b-4 hover:transition-all"}`, "class")}> ${item.label} </span> ` })}`}` })} </li>`;
  })} </ul> <!-- Botón de iniciar sesión --> ${session ? renderTemplate`<div class="flex flex-row gap-1 items-center"> ${renderComponent($$result, "Link", $$Link, { "id": "ButtonFav", "href": "/favoritos", "checkActive": false, "class": "flex items-center justify-center h-10 px-4 border rounded bg-tertiary-msb hover:bg-[#696863] cursor-pointer font-medium font-primary-font-msb border-text-primary-msb transition" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeartIcon", HeartIcon, { "addStyles": "stroke-white hover:fill-white animate-duration-500 animate-fill-forwards transition-all" })} ` })} ${renderComponent($$result, "NavDropDown", NavDropDown, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Mis cosas/Programacion/msb-astro/src/components/preact/NavDropDown", "client:component-export": "default" }, { "childrenDrop": ($$result2) => renderTemplate`<div class="flex w-full"> <div${addAttribute(`absolute h-fit w-full top-0 left-0 bg-white shadow-lg z-20 animate-fadeIn rounded-b-md rounded-br-md rounded-bl-md`, "class")}> ${renderComponent($$result2, "Link", $$Link, { "class": "p-3 text-base gap-2 hover:bg-gray-200 cursor-pointer transition-all transition-duration-400", "href": "/" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon", $$Icon, { "size": 20, "class": "fill fill-black", "name": "userDefault" })}
Mi cuenta
` })} <hr class="divide divide-x-2"> <form method="POST" action="/api/signout"> ${renderComponent($$result2, "Link", $$Link, { "checkActive": false, "class": "p-3 text-base gap-2 hover:bg-gray-200 cursor-pointer transition-all transition-duration-400" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon", $$Icon, { "size": 20, "class": "fill fill-black", "name": "logout" })} <button class="underline"> Cerrar sesión</button> ` })} </form> </div> </div>`, "label": ($$result2) => renderTemplate`<div class="flex items-center py-2 justify-end h-10 gap-1 border-bg-2-msb px-2 bg-white text-bg-2-msb font-bold cursor-pointer rounded-md transition tracking-wide border "> ${renderComponent($$result2, "Icon", $$Icon, { "size": 20, "class": "fill  fill-black", "name": "userDefault" })} ${user.username} ${renderComponent($$result2, "Icon", $$Icon, { "size": 20, "class": "fill fill-black", "name": "chevron-down" })} </div>` })} </div>` : renderTemplate`${renderComponent($$result, "Link", $$Link, { "id": "ButtonLogin", "class": "flex items-center justify-end h-10 px-8 border rounded bg-primary-msb text-tertiary-text-msb hover:bg-primary-bg-hover-msb cursor-pointer font-medium font-primary-font-msb border-text-primary-msb transition" }, { "default": ($$result2) => renderTemplate`
Iniciar sesión
` })}`} </div> </div> </nav> <!-- Navbar para pantallas móviles --> <nav class="relative lg:hidden bg-secondary-msb shadow-md"> <div class="py-5 px-8 flex justify-between items-center"> <!-- Logo y enlace principal --> <div> ${renderComponent($$result, "Link", $$Link, { "href": "/", "checkActive": false, "class": "flex justify-center" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Image", $$Image, { "width": 150, "height": 20, "src": "/images/logo.png", "alt": "Logo", "class": "h-8 text-center items-center" })} ` })} </div> <!-- Botón de menú para pantallas pequeñas --> <button type="button" data-collapse-toggle="mobile-menu" class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm rounded-lg hover:bg-primary-bg-hover-msb focus:outline-none focus:ring" aria-controls="mobile-menu" aria-expanded="false"> ${renderComponent($$result, "Icon", $$Icon, { "name": "menu" })} </button> </div> <!-- Menú de navegación móvil para pantallas pequeñas --> <div class="hidden w-full absolute top-13 bg-secondary-msb z-10 shadow-sm animate-dropDown" id="mobile-menu"> <div class="shadow-md rounded-b-lg w-full"> ${session ? renderTemplate`${renderComponent($$result, "NavDropDown", NavDropDown, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Mis cosas/Programacion/msb-astro/src/components/preact/NavDropDown", "client:component-export": "default" }, { "childrenDrop": ($$result2) => renderTemplate`<div> <div${addAttribute(`absolute  h-fit w-full top-0 left-0  rounded-md bg-white shadow-lg z-9 animate-fadeIn`, "class")}> ${renderComponent($$result2, "Link", $$Link, { "class": "py-3  px-6  text-base gap-2 hover:bg-gray-200 hover:rouded-lg cursor-pointer transition-all transition-duration-400 ", "href": "/favoritos" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon", $$Icon, { "size": 28, "class": "fill fill-black", "name": "heart-default" })}
Favoritos
` })} ${renderComponent($$result2, "Link", $$Link, { "class": "py-3  px-6  text-base gap-2 hover:bg-gray-200 hover:rouded-lg cursor-pointer transition-all transition-duration-400 ", "href": "#" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Icon", $$Icon, { "size": 28, "class": "fill fill-black", "name": "userDefault" })}
Mi cuenta
` })} <hr class="divide divide-x-2"> ${renderComponent($$result2, "Link", $$Link, { "class": "py-3  px-6 text-base gap-2 hover:bg-gray-200  cursor-pointer transition-all transition-duration-400 ", "href": "/" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "LogOutIcon", LogOutIcon, { "addStyles": "fill-[#494949] stroke-[#494949]" })}
Cerrar sesión
` })} <hr class="divide divide-x-2 border-b-2 shadow-current"> </div> </div>`, "label": ($$result2) => renderTemplate`<div class="flex justify-start gap-5 items-end px-6 py-3 border-b w-screen"> ${renderComponent($$result2, "Icon", $$Icon, { "size": 40, "scale": 20, "name": "userDefault" })} <div> <h2 class="text-lg">Usuario</h2> <p class="text-gray-600">usuario@gmail.com</p> </div> ${renderComponent($$result2, "Icon", $$Icon, { "size": 20, "class": "fill fill-black", "name": "chevron-down" })} </div>` })}` : renderTemplate`<div class="flex justify-start gap-5 items-end px-6 py-3 border-b"> ${renderComponent($$result, "Link", $$Link, { "id": "ButtonLogin", "class": "flex items-center  px-6   w-fit justify-end h-10 border rounded bg-primary-msb text-tertiary-text-msb hover:bg-primary-bg-hover-msb cursor-pointer font-medium font-primary-font-msb border-text-primary-msb transition" }, { "default": ($$result2) => renderTemplate`
Iniciar sesión
` })} </div>`} <ul class="text-gray-700"> ${navItems.map((item) => renderTemplate`<li class="flex  items-center justify-between w-100 flex-row  px-6 py-3 border-b "> ${item.dropdown ? renderTemplate`<div class="relative flex justify-between place-items-start gap-2  z-0  hover:border-primary-msb"> ${item.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "size": 28, "scale": 1, "name": item?.icon })}`} ${renderComponent($$result, "Link", $$Link, { "class": "flex  justify-start" }, { "after": ($$result2) => renderTemplate`${renderComponent($$result2, "Icon", $$Icon, { "slot": "after", "class": " ml-2 w-4 h-4 flex self-start items-end", "name": "chevron-down" })}`, "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NavDropDown", NavDropDown, { "client:load": true, "client:component-hydration": "load", "client:component-path": "F:/Mis cosas/Programacion/msb-astro/src/components/preact/NavDropDown", "client:component-export": "default" }, { "childrenDrop": ($$result3) => renderTemplate`<div> <div${addAttribute(`relative w-100 right-0  mt-2 px-1 lg:top-8 left-0 py-2 w-max rounded-md bg-secondary-msb  animate-fadeIn`, "class")}> ${item.dropdown && item.dropdown?.map(
    (item2) => item2.href ? renderTemplate`${renderComponent($$result3, "Link", $$Link, { "href": item2.href ?? "", "class": "block px-3 py-2  font-primary-font-msb text-sm border border-none " }, { "default": ($$result4) => renderTemplate` <span class="font-primary-font-msb  font-semibold text-xs  hover:text-primary-msb hover:border-b-primary-msb uppercase text-gray-600 "> ${item2.label} </span> ` })}` : renderTemplate`<span class="block px-3 py-2  font-semibold   font-primary-font-msb text-xs text-primary-msb uppercase "> ${item2.label} </span>`
  )} </div> </div>`, "label": ($$result3) => renderTemplate`<span${addAttribute(`${item?.dropdown?.some((h) => h.href === pathname) ? "text-primary-msb font-primary-font-msb font-semibold text-xs border-b-4 border-b-primary-msb hover:text-primary-msb uppercase" : "font-primary-font-msb font-semibold text-xs  hover:text-primary-msb uppercase text-gray-600"}`, "class")}> ${item.label} </span>` })}  ` })} </div>` : renderTemplate`<div class="flex justify-between items-center gap-2 "> ${item.icon && renderTemplate`${renderComponent($$result, "Icon", $$Icon, { "size": 28, "scale": 1, "name": item?.icon })}`} ${renderComponent($$result, "Link", $$Link, { "href": item.dropdown ? "" : item.href, "class": "text-lg flex flex-row items-center hover:transition-all font-primary-font-msb px-0 " }, { "default": ($$result2) => renderTemplate` <span class=" font-primary-font-msb font-semibold text-xs hover:text-primary-msb uppercase "> ${item.label} </span> ` })} </div>`} </li>`)} </ul> </div> </div> </nav> `;
}, "F:/Mis cosas/Programacion/msb-astro/src/components/Navbar.astro", void 0);

const $$Astro$2 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="bg-secondary-msb text-black shadow-inner flex justify-between items-center"> <div class="mx-auto py-20 container grid grid-col lg:grid-col-2 gap-5 lg:gap-0 md:gap-5"> <div class="flex flex-col lg:col-starts-1 lg:col-ends-2"> <h2 class="text-3xl font-bold mb-4 flex justify-center md:justify-center lg:justify-start"> ${renderComponent($$result, "Link", $$Link, { "href": "/", "checkActive": false, "class": "flex flex-shrink items-center justify-center" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Image", $$Image, { "width": 300, "height": 82, "class": "object-contain px-1 aspect-auto flex flex-shrink items-center justify-center", "src": "/images/logo.png", "alt": "Logo" })} ` })} </h2> <div class="flex justify-center col-start-2 col-end-12 md:justify-center lg:justify-start align-middle mb-4"> <a href="https://www.facebook.com/matiasszpirabienesraices/" target="_blank" class="mr-2">${renderComponent($$result, "Icon", $$Icon, { "size": 24, "name": "social-facebook" })}</a> <a href="https://www.instagram.com/matiasszpira/" target="_blank" class="mr-2">${renderComponent($$result, "Icon", $$Icon, { "size": 24, "name": "social-instagram" })}</a> <a href="https://www.youtube.com/channel/UCZVVcBSiVjsJGdzUw_tAfEw" target="_blank" class="mr-2">${renderComponent($$result, "Icon", $$Icon, { "size": 24, "name": "social-youtube" })}</a> <a${addAttribute(`https://api.whatsapp.com/send/?phone=5491144161700&text=Hola%2C+me+contactaba+desde+https://msb-sh.vercel.app+para+consultarles&type=phone_number&app_absent=0`, "href")} target="_blank" class="mr-2">${renderComponent($$result, "Icon", $$Icon, { "size": 24, "name": "social-whatsapp" })}</a> <a href="https://www.linkedin.com/company/mat%C3%ADas-szpira-bienes-ra%C3%ADces/about/" target="_blank" class="mr-2 text-bg-2-msb">${renderComponent($$result, "Icon", $$Icon, { "size": 24, "name": "brand-linkedin" })}</a> </div> <div class="mb-4 flex align-center justify-center md:justify-center lg:justify-start gap-2"> ${renderComponent($$result, "Icon", $$Icon, { "size": 24, "class": "self-center", "name": "mail-green" })} <a href="mailto:info@matiasszpira.com.ar" class="self-center text-sm text-center font-semibold">info@matiasszpira.com.ar</a> </div> </div> <div class="lg:col-start-3 lg:col-end-4 mb-6 sm:mb-0"> <h3 class="text-sm text-center md:text-center lg:text-start font-semibold mb-4 text-[#4E5A2B]">
QUÉ QUIERO
</h3> <ul class="w-100 text-center md:text-center lg:text-start"> <li class="mb-1"> <button value="V" id="btnOp" class="text-sm">Venta</button> </li> <li class="mb-1"> <button${addAttribute("A", "value")} id="btnOp" class="text-sm">Alquiler</button> </li> <li class="mb-1"> <button${addAttribute("T", "value")} id="btnOp" class="text-sm">Alquiler Temporario</button> </li> </ul> </div> <div class="lg:col-start-5 lg:col-end-6 mb-6 sm:mb-0"> <h3 class="text-sm text-center md:text-center lg:text-start font-semibold mb-4 text-[#4E5A2B]">
EMPRENDIMIENTOS
</h3> <ul class="w-100 text-center md:text-center lg:text-start"> <li class="mb-1"> <a${addAttribute("/emprendimientos?&ed_est=En+Pozo", "href")} class="text-sm">En Pozo</a> </li> <li class="mb-1"> <a href="/emprendimientos?&ed_est=En+Construccion" class="text-sm">En Construcción</a> </li> <li class="mb-1"> <a href="/emprendimientos?&ed_est=Terminado" class="text-sm">Terminado</a> </li> </ul> </div> <div class="lg:col-start-6 lg:col-end-7 mb-6 sm:mb-0"> <h3 class="text-sm text-center md:text-center lg:text-start font-semibold mb-4 text-nowrap text-[#4E5A2B]">
NUESTROS SERVICIOS
</h3> <ul class="w-100 text-center md:text-center lg:text-start grid "> <li class="mb-1"><a href="#" class="text-sm">Tasaciones</a></li> <li class="mb-1"><a href="#" class="text-sm">Administración</a></li> </ul> </div> <div class="lg:col-start-7 lg:col-end-8 mb-6 sm:mb-0"> <h3 class="text-sm text-center md:text-center lg:text-start font-semibold mb-4 text-nowrap text-[#4E5A2B]">
SUCURSALES
</h3> <ul class="w-100 text-center md:text-center lg:text-start"> <li class="mb-1"> <a href="#" class="text-sm font-semibold mb-2 text-[#4E5A2B]">NOSOTROS</a> </li> <li class="mb-1"> <a href="#" class="text-sm font-semibold mb-2 text-[#4E5A2B]">CONTACTO</a> </li> </ul> </div> </div> </footer> `;
}, "F:/Mis cosas/Programacion/msb-astro/src/layouts/Footer.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const userAuthCookie = lucia.readSessionCookie(
    Astro2.request.headers.get("Cookie") ?? ""
  );
  const userSession = await db.select().from(Session).where(eq(Session.id, userAuthCookie));
  const user = userSession[0];
  const { title, description, img } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><!-- Img --><meta property="og:image"${addAttribute(img ?? "/images/logo.png", "content")}><meta property="og:image:url"${addAttribute(img ?? "/images/logo.png", "content")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="view-transition" content="same-origin"><link rel="image_src"${addAttribute(img ?? "/images/logo.png", "href")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body> <div id="app" class="relative h-screen"> <header class="[grid-area:header]"> ${renderComponent($$result, "Navbar", $$Navbar, { "user": user })} </header> <main class="[grid-area:main] font-gotham "> <!-- <ContainerLayout> --> ${renderSlot($$result, $$slots["default"])} <!--   </ContainerLayout> --> </main> <footer class="[grid-area:footer]"> ${renderComponent($$result, "Footer", $$Footer, {})} </footer> </div>  </body> </html>`;
}, "F:/Mis cosas/Programacion/msb-astro/src/layouts/Layout.astro", void 0);

const endpoint = "resultados.emprendimientos";
const getEntrepreneurshipById = async (id) => {
  const queryParams = {
    ed_idl: id.toString()
  };
  try {
    const res = await fetchData(endpoint, queryParams);
    return res.resultado;
  } catch (error) {
    console.error("Error fetching entrepreneurship data:", error);
    throw error;
  }
};

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let entrepreneurship;
  let response;
  entrepreneurship = await getEntrepreneurshipById(id);
  response = entrepreneurship?.emprendimiento[0];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Emprendimiento - ${response?.ed_nom}`, "description": `${response.amigable}` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> <div class="flex items-center justify-center md:order-2"> <img${addAttribute(`view-transition-name: entrepreneurship-${id}`, "style")} class="w-full h-48 object-cover transition duration-300"${addAttribute(response?.img_princ, "src")}${addAttribute(response?.ed_nom, "alt")}> </div> <div class="flex flex-col gap-4"> <h2 class="text-3xl md:text-4xl font-bold text-white"> ${response?.ed_nom} </h2> <p class="text-base md:text-lg text-white"> ${response?.ed_des} </p> </div> </div> </article> ` })}`;
}, "F:/Mis cosas/Programacion/msb-astro/src/pages/emprendimientos/[id].astro", void 0);

const $$file = "F:/Mis cosas/Programacion/msb-astro/src/pages/emprendimientos/[id].astro";
const $$url = "/emprendimientos/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Link as $, Favorites as F, HeartIcon as H, User as U, _id_ as _, $$Icon as a, $$Layout as b, getConfiguredImageService as c, db as d, github as e, fetchData as f, getEntrepreneurshipById as g, $$Image as h, imageConfig as i, lucia as l };
