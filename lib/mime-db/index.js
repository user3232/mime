var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/mime-db/internal.ts
var internal_exports = {};
__export(internal_exports, {
  extToMime: () => extToMime,
  findMimeForFile: () => findMimeForFile,
  findMimesForFile: () => findMimesForFile,
  firstMimeHeavingString: () => firstMimeHeavingString,
  getMimeHeavingExtension: () => getMimeHeavingExtension,
  getMimeInfo: () => getMimeInfo,
  listMimesByExtension: () => listMimesByExtension,
  listMimesHeavingString: () => listMimesHeavingString,
  mapExtensionToMime: () => mapExtensionToMime,
  mimeToInfo: () => mimeToInfo,
  tryGetMimeInfo: () => tryGetMimeInfo
});

// src/mime-db/db.ts
import mimeDb from "mime-db/db.json" with { type: "json" };
var mimeToInfo = mimeDb;
function getMimeInfo(mime, mimeToInfo2) {
  return mimeToInfo2[mime];
}
function tryGetMimeInfo(mime, mimeToInfo2) {
  if (mime === void 0 || mime === null) {
    return void 0;
  }
  return mimeToInfo2[mime];
}
function listMimesHeavingString(string, mimeDb2) {
  const matchingMimes = [];
  let mime;
  for (mime in mimeDb2) {
    if (mime.includes(string)) {
      matchingMimes.push(mime);
    }
  }
  return matchingMimes.length > 0 ? matchingMimes : void 0;
}
function firstMimeHeavingString(string, mimeDb2) {
  let mime;
  for (mime in mimeDb2) {
    if (mime.includes(string)) {
      return mime;
    }
  }
  return;
}

// src/mime-db/compare.ts
var mimeSourceImportance = {
  "iana": 3,
  "apache": 2,
  "nginx": 1
};
function compareMimeEntriesBySource(a, b, sourceImportance) {
  sourceImportance ??= mimeSourceImportance;
  const aRank = a.source === void 0 ? 0 : mimeSourceImportance[a.source];
  const bRank = b.source === void 0 ? 0 : mimeSourceImportance[b.source];
  return aRank - bRank;
}

// src/mime-db/ext.ts
import path from "node:path";
var extToMime = mapExtensionToMime(mimeToInfo);
function mapExtensionToMime(mimeDb2) {
  const extToMime2 = {};
  let mime;
  for (mime in mimeDb2) {
    for (const ext of mimeDb2[mime].extensions ?? []) {
      const exts = extToMime2[ext] ?? [];
      exts.push(mime);
      extToMime2[ext] = exts;
    }
  }
  for (const ext in extToMime2) {
    const mimes = extToMime2[ext];
    mimes.sort((a, b) => compareMimeEntriesBySource(
      mimeDb2[a],
      mimeDb2[b],
      mimeSourceImportance
    ));
  }
  return extToMime2;
}
function getMimeHeavingExtension(ext, extToMime2) {
  return extToMime2[ext]?.[0];
}
function listMimesByExtension(ext, extToMime2) {
  return extToMime2[ext] ?? [];
}
function findMimeForFile(filePathLike, extToMime2) {
  const ext = path.extname(filePathLike);
  if (ext === "") {
    return void 0;
  }
  return extToMime2[ext.substring(1)]?.[0];
}
function findMimesForFile(filePathLike, extToMime2) {
  const ext = path.extname(filePathLike);
  if (ext === "") {
    return void 0;
  }
  const mimes = extToMime2[ext.substring(1)];
  return mimes !== void 0 && mimes.length > 0 ? mimes : void 0;
}

// src/mime-db/mime-db.ts
function getMimeInfo2(string) {
  if (!string) {
    return void 0;
  }
  return tryGetMimeInfo(string, mimeToInfo);
}
function listMimesHeavingString2(string) {
  if (!string) {
    return void 0;
  }
  return listMimesHeavingString(string, mimeToInfo);
}
function firstMimeHeavingString2(string) {
  if (!string) {
    return void 0;
  }
  return firstMimeHeavingString(string, mimeToInfo);
}
function findMimeForFile2(file) {
  if (!file) {
    return void 0;
  }
  return findMimeForFile(file, extToMime);
}
function findMimesForFile2(file) {
  if (!file) {
    return void 0;
  }
  return findMimesForFile(file, extToMime);
}
function getMimeHeavingExtension2(extension) {
  if (!extension) {
    return void 0;
  }
  return getMimeHeavingExtension(extension, extToMime);
}
function listMimesByExtension2(extension) {
  if (!extension) {
    return void 0;
  }
  return listMimesByExtension(extension, extToMime);
}
function mimeToContentEncoding(mime) {
  const mimeInfo = getMimeInfo(mime, mimeToInfo);
  if (!mimeInfo.charset) {
    return mime;
  }
  return `${mime}; charset= ${mimeInfo.charset.toLowerCase()}`;
}
export {
  extToMime,
  findMimeForFile2 as findMimeForFile,
  findMimesForFile2 as findMimesForFile,
  firstMimeHeavingString2 as firstMimeHeavingString,
  getMimeHeavingExtension2 as getMimeHeavingExtension,
  getMimeInfo2 as getMimeInfo,
  internal_exports as internal,
  listMimesByExtension2 as listMimesByExtension,
  listMimesHeavingString2 as listMimesHeavingString,
  mimeToContentEncoding,
  mimeToInfo
};
