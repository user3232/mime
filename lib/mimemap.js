// src/mimemap.ts
import { Postfixes, PrefixesPostfixes } from "@user3232/pattern";
import { MIMEType } from "node:util";
var mimemapExample = {
  name: "@user3232/some-app",
  version: "1.0.1",
  mimes: {
    ".ts": {
      mime: "text/typescript",
      charset: "utf8"
    },
    ".js": {
      mime: "text/javascript",
      charset: "utf8"
    },
    ".json": {
      mime: "application/json",
      charset: "utf8"
    },
    ".html": {
      mime: "text/html",
      charset: "utf8"
    },
    ".svg": {
      mime: "image/svg+xml",
      charset: "utf8"
    },
    ".jpeg": {
      mime: "image/jpeg"
    }
  },
  scopes: {
    "./dist/": {
      ".js": {
        mime: "application/javascript",
        charset: "utf8"
      },
      ".ts": {
        mime: "application/typescript",
        charset: "utf8"
      }
    }
  },
  files: {
    "./manifest/manifest.json": {
      mime: "application/manifest+json",
      charset: "utf8"
    }
  }
};
var Mimemap = class {
  #scopeToExtensions;
  #mimes;
  #files;
  #mimemap;
  /**
   * Creates {@link Mime}'s container.
   */
  constructor(mimemap) {
    this.#mimemap = mimemap ?? {};
    this.#scopeToExtensions = new PrefixesPostfixes();
    this.#mimes = new Postfixes();
    this.#files = /* @__PURE__ */ new Set();
    for (const [path, _] of Object.entries(this.#mimemap.files ?? {})) {
      this.#files.add(path);
    }
    for (const [extension, _] of Object.entries(this.#mimemap.mimes ?? {})) {
      this.#mimes.add(extension);
    }
    for (const [scope, extensionToMime] of Object.entries(this.#mimemap.scopes ?? {})) {
      for (const [extension, _] of Object.entries(extensionToMime ?? {})) {
        this.#scopeToExtensions.add({
          prefix: scope,
          postfix: extension
        });
      }
    }
  }
  /**
   * Sets name of internal {@link MimeMap}.
   */
  set name(mimemapName) {
    this.#mimemap.name = mimemapName;
  }
  /**
   * Gets name of internal {@link MimeMap}.
   */
  get name() {
    return this.#mimemap.name;
  }
  /**
   * Sets version of internal {@link MimeMap}.
   */
  set version(mimemapVersion) {
    this.#mimemap.version = mimemapVersion;
  }
  /**
   * Gets version of internal {@link MimeMap}.
   */
  get version() {
    return this.#mimemap.version;
  }
  /**
   * Adds extension scoped {@link Mime} to this container.
   */
  setScopedMime(scope, extension, mime) {
    if (!this.#mimemap.scopes) {
      this.#mimemap.scopes = {};
    }
    if (!this.#mimemap.scopes[scope]) {
      this.#mimemap.scopes[scope] = {};
    }
    this.#mimemap.scopes[scope][extension] = mime;
    this.#scopeToExtensions.add({
      prefix: scope,
      postfix: extension
    });
  }
  /**
   * Adds extension default {@link Mime} to this container.
   */
  setDefaultMime(extension, mime) {
    if (!this.#mimemap.mimes) {
      this.#mimemap.mimes = {};
    }
    this.#mimemap.mimes[extension] = mime;
    this.#mimes.add(extension);
  }
  /**
   * Adds file {@link Mime} to this container.
   */
  setFileMime(path, mime) {
    if (!this.#mimemap.files) {
      this.#mimemap.files = {};
    }
    this.#mimemap.files[path] = mime;
    this.#files.add(path);
  }
  /**
   * Returns matched best {@link Mime} for given path,
   * or `undefined` if no match.
   */
  matchBestTo(path) {
    const fileMatch = this.#mimemap.files?.[path];
    if (fileMatch !== void 0) {
      return fileMatch;
    }
    const scopeMatchPattern = this.#scopeToExtensions.matchBestTo(path);
    if (scopeMatchPattern !== void 0) {
      const scopeMatch = this.#mimemap.scopes[scopeMatchPattern.prefix][scopeMatchPattern.postfix];
      return scopeMatch;
    }
    const mimeMatchPattern = this.#mimes.matchBestTo(path);
    if (mimeMatchPattern !== void 0) {
      const mimeMatch = this.#mimemap.mimes[mimeMatchPattern];
      return mimeMatch;
    }
    return void 0;
  }
  /**
   * Sorts and serialize underlying {@link MimeMap} object to JSON.
   */
  toJSON(space) {
    return JSON.stringify(
      toSortedMimeMap(this.#mimemap),
      void 0,
      space
    );
  }
  /**
   * Returns serialized deep copy of underlying {@link MimeMap} object.
   */
  toObject() {
    return toSortedMimeMap(this.#mimemap);
  }
};
function parseMime(string) {
  const mime = new MIMEType(string);
  return {
    mime: mime.essence,
    ...Object.fromEntries(mime.params.entries())
  };
}
function serializeMime(mime) {
  const mimeSerializer = new MIMEType(mime.mime);
  for (const [key, value] of Object.entries(mime)) {
    if (key !== "mime") {
      mimeSerializer.params.set(key, value);
    }
  }
  return mimeSerializer.toString();
}
function toSortedMimeMap(mimemap) {
  const name = mimemap.name;
  const version = mimemap.version;
  const mimes = sortObject(
    mimemap.mimes,
    (mime) => sortMime(mime)
  );
  const scopes = sortObject(
    mimemap.scopes,
    (mimes2) => sortObject(
      mimes2,
      (mime) => sortMime(mime)
    )
  );
  const files = sortObject(
    mimemap.files,
    (mime) => sortMime(mime)
  );
  return {
    name,
    version,
    files,
    mimes,
    scopes
  };
}
function sortMime(mime) {
  if (!mime) {
    return void 0;
  }
  const sorted = { mime: mime.mime };
  const keys = Object.keys(mime).sort();
  for (const key of keys) {
    if (key !== "mime") {
      sorted[key] = mime[key];
    }
  }
  return sorted;
}
function sortObject(object, map) {
  if (!object) {
    return object;
  }
  const sortedKeys = Object.keys(object).sort();
  const sortedObject = {};
  for (const key of sortedKeys) {
    if (map) {
      sortedObject[key] = map(object[key]);
    } else {
      sortedObject[key] = object[key];
    }
  }
  return sortedObject;
}
export {
  Mimemap,
  mimemapExample,
  parseMime,
  serializeMime,
  sortMime,
  toSortedMimeMap
};
