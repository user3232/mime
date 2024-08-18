import * as db from './db.js';
import * as ext from './ext.js';
export const mimeToInfo = db.mimeToInfo;
export function getMimeInfo(string) {
    if (!string) {
        return undefined;
    }
    return db.tryGetMimeInfo(string, db.mimeToInfo);
}
export function listMimesHeavingString(string) {
    if (!string) {
        return undefined;
    }
    return db.listMimesHeavingString(string, db.mimeToInfo);
}
export function firstMimeHeavingString(string) {
    if (!string) {
        return undefined;
    }
    return db.firstMimeHeavingString(string, db.mimeToInfo);
}
export const extToMime = ext.extToMime;
export function findMimeForFile(file) {
    if (!file) {
        return undefined;
    }
    return ext.findMimeForFile(file, ext.extToMime);
}
export function findMimesForFile(file) {
    if (!file) {
        return undefined;
    }
    return ext.findMimesForFile(file, ext.extToMime);
}
export function getMimeHeavingExtension(extension) {
    if (!extension) {
        return undefined;
    }
    return ext.getMimeHeavingExtension(extension, ext.extToMime);
}
export function listMimesByExtension(extension) {
    if (!extension) {
        return undefined;
    }
    return ext.listMimesByExtension(extension, ext.extToMime);
}
export function mimeToContentEncoding(mime) {
    const mimeInfo = db.getMimeInfo(mime, db.mimeToInfo);
    if (!mimeInfo.charset) {
        return mime;
    }
    return `${mime}; charset= ${mimeInfo.charset.toLowerCase()}`;
}
//# sourceMappingURL=main.js.map