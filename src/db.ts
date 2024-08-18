import mimeDb from 'mime-db/db.json' with {type: 'json'}
import { MimeEntry } from 'mime-db'



export type Mime = keyof typeof mimeDb
export type MimeToInfo = {
    [mime in Mime]: MimeEntry
}

export const mimeToInfo = mimeDb as MimeToInfo


export function getMimeInfo(
    mime: Mime,
    mimeToInfo: MimeToInfo,
): MimeEntry {
    return mimeToInfo[mime]
}


export function tryGetMimeInfo(
    mime: string | undefined | null,
    mimeToInfo: MimeToInfo,
): MimeEntry | undefined {
    if(mime === undefined || mime === null) {
        return undefined
    }
    return (mimeToInfo as Partial<Record<string, MimeEntry>>)[mime]
}



export function listMimesHeavingString(
    string: string, 
    mimeDb: MimeToInfo
): Mime[] | undefined {
    const matchingMimes: Mime[] = []
    let mime: Mime
    for(mime in mimeDb) {
        if(mime.includes(string)) {
            matchingMimes.push(mime)
        }
    }
    return matchingMimes.length > 0 ? matchingMimes : undefined
}


export function firstMimeHeavingString(
    string: string, 
    mimeDb: MimeToInfo
): Mime | undefined {
    let mime: Mime
    for(mime in mimeDb) {
        if(mime.includes(string)) {
            return mime
        }
    }
    return
}