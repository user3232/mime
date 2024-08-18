import mimeDb from 'mime-db/db.json' with { type: 'json' };
export const mimeToInfo = mimeDb;
export function getMimeInfo(mime, mimeToInfo) {
    return mimeToInfo[mime];
}
export function tryGetMimeInfo(mime, mimeToInfo) {
    if (mime === undefined || mime === null) {
        return undefined;
    }
    return mimeToInfo[mime];
}
export function listMimesHeavingString(string, mimeDb) {
    const matchingMimes = [];
    let mime;
    for (mime in mimeDb) {
        if (mime.includes(string)) {
            matchingMimes.push(mime);
        }
    }
    return matchingMimes.length > 0 ? matchingMimes : undefined;
}
export function firstMimeHeavingString(string, mimeDb) {
    let mime;
    for (mime in mimeDb) {
        if (mime.includes(string)) {
            return mime;
        }
    }
    return;
}
//# sourceMappingURL=db.js.map