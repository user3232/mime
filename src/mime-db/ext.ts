import { compareMimeEntriesBySource, mimeSourceImportance } from './compare.js'
import { Mime, MimeToInfo, mimeToInfo } from './db.js'
import path from 'node:path'


export const extToMime: ExtToMimeMap = mapExtensionToMime(mimeToInfo)


export type ExtToMimeMap = {[key in string]?: Mime[]}


export function mapExtensionToMime(mimeDb: MimeToInfo): ExtToMimeMap {
    
    const extToMime: ExtToMimeMap = {}

    let mime: Mime
    for(mime in mimeDb) {
        for(const ext of mimeDb[mime].extensions ?? []) {
            const exts = extToMime[ext] ?? []
            exts.push(mime)
            extToMime[ext] = exts
        }
    }

    for(const ext in extToMime) {
        const mimes = extToMime[ext]!
        mimes.sort((a, b) => compareMimeEntriesBySource(
            mimeDb[a], 
            mimeDb[b],
            mimeSourceImportance,
        )) 
    }

    return extToMime
}



export function getMimeHeavingExtension(
    ext: string, 
    extToMime: ExtToMimeMap
): Mime | undefined {
    return extToMime[ext]?.[0]
}



export function listMimesByExtension(
    ext: string, 
    extToMime: ExtToMimeMap
): Mime[] {
    return extToMime[ext] ?? []
}



export function findMimeForFile(
    filePathLike: string,
    extToMime: ExtToMimeMap,
): Mime | undefined {
    const ext = path.extname(filePathLike)
    if(ext === '') {
        return undefined
    }

    return extToMime[ext.substring(1)]?.[0]
}


export function findMimesForFile(
    filePathLike: string,
    extToMime: ExtToMimeMap,
): Mime[] | undefined {
    const ext = path.extname(filePathLike)
    if(ext === '') {
        return undefined
    }
    const mimes = extToMime[ext.substring(1)]

    return mimes !== undefined && mimes.length > 0 ? mimes : undefined
}


