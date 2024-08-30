import { Mime, MimeToInfo } from './db.js';
export declare const extToMime: ExtToMimeMap;
export type ExtToMimeMap = {
    [key in string]?: Mime[];
};
export declare function mapExtensionToMime(mimeDb: MimeToInfo): ExtToMimeMap;
export declare function getMimeHeavingExtension(ext: string, extToMime: ExtToMimeMap): Mime | undefined;
export declare function listMimesByExtension(ext: string, extToMime: ExtToMimeMap): Mime[];
export declare function findMimeForFile(filePathLike: string, extToMime: ExtToMimeMap): Mime | undefined;
export declare function findMimesForFile(filePathLike: string, extToMime: ExtToMimeMap): Mime[] | undefined;
