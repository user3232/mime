import { MimeEntry } from 'mime-db'
import * as db from './db.js'
import * as ext from './ext.js'



export type MimeToInfo = db.MimeToInfo
export type Mime = db.Mime
export const mimeToInfo: db.MimeToInfo = db.mimeToInfo


export function getMimeInfo(string: string | undefined | null): MimeEntry | undefined {
    if(!string) {
        return undefined
    }
    return db.tryGetMimeInfo(string, db.mimeToInfo)
}
export function listMimesHeavingString(string?: string): db.Mime[] | undefined {
    if(!string) {
        return undefined
    }
    return db.listMimesHeavingString(string, db.mimeToInfo)
}
export function firstMimeHeavingString(string?: string): db.Mime | undefined {
    if(!string) {
        return undefined
    }
    return db.firstMimeHeavingString(string, db.mimeToInfo)
}



export type ExtToMimeMap = ext.ExtToMimeMap
export const extToMime: ext.ExtToMimeMap = ext.extToMime
export function findMimeForFile(file?: string): db.Mime | undefined {
    if(!file) {
        return undefined
    }
    return ext.findMimeForFile(file, ext.extToMime)
}
export function findMimesForFile(file?: string): db.Mime[] | undefined {
    if(!file) {
        return undefined
    }
    return ext.findMimesForFile(file, ext.extToMime)
}
export function getMimeHeavingExtension(extension?: string): db.Mime | undefined {
    if(!extension) {
        return undefined
    }
    return ext.getMimeHeavingExtension(extension, ext.extToMime)
}
export function listMimesByExtension(extension?: string): db.Mime[] | undefined {
    if(!extension) {
        return undefined
    }
    return ext.listMimesByExtension(extension, ext.extToMime)
}



export function mimeToContentEncoding(
    mime: db.Mime
): string {
    const mimeInfo = db.getMimeInfo(mime, db.mimeToInfo)
    if(!mimeInfo.charset) {
        return mime
    }

    return `${mime}; charset= ${mimeInfo.charset.toLowerCase()}`
}