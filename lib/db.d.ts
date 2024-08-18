import mimeDb from 'mime-db/db.json';
import { MimeEntry } from 'mime-db';
export type Mime = keyof typeof mimeDb;
export type MimeToInfo = {
    [mime in Mime]: MimeEntry;
};
export declare const mimeToInfo: MimeToInfo;
export declare function getMimeInfo(mime: Mime, mimeToInfo: MimeToInfo): MimeEntry;
export declare function tryGetMimeInfo(mime: string | undefined | null, mimeToInfo: MimeToInfo): MimeEntry | undefined;
export declare function listMimesHeavingString(string: string, mimeDb: MimeToInfo): Mime[] | undefined;
export declare function firstMimeHeavingString(string: string, mimeDb: MimeToInfo): Mime | undefined;
