import { compareMimeEntriesBySource, mimeSourceImportance } from './compare.js';
import { mimeToInfo } from './db.js';
import path from 'node:path';
export const extToMime = mapExtensionToMime(mimeToInfo);
export function mapExtensionToMime(mimeDb) {
    const extToMime = {};
    let mime;
    for (mime in mimeDb) {
        for (const ext of mimeDb[mime].extensions ?? []) {
            const exts = extToMime[ext] ?? [];
            exts.push(mime);
            extToMime[ext] = exts;
        }
    }
    for (const ext in extToMime) {
        const mimes = extToMime[ext];
        mimes.sort((a, b) => compareMimeEntriesBySource(mimeDb[a], mimeDb[b], mimeSourceImportance));
    }
    return extToMime;
}
export function getMimeHeavingExtension(ext, extToMime) {
    return extToMime[ext]?.[0];
}
export function listMimesByExtension(ext, extToMime) {
    return extToMime[ext] ?? [];
}
export function findMimeForFile(filePathLike, extToMime) {
    const ext = path.extname(filePathLike);
    if (ext === '') {
        return undefined;
    }
    return extToMime[ext.substring(1)]?.[0];
}
export function findMimesForFile(filePathLike, extToMime) {
    const ext = path.extname(filePathLike);
    if (ext === '') {
        return undefined;
    }
    const mimes = extToMime[ext.substring(1)];
    return mimes !== undefined && mimes.length > 0 ? mimes : undefined;
}
//# sourceMappingURL=ext.js.map