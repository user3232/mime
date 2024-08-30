import { MimeEntry, MimeSource } from 'mime-db';
export declare const mimeSourceImportance: {
    iana: number;
    apache: number;
    nginx: number;
};
export declare function compareMimeEntriesBySource(a: MimeEntry, b: MimeEntry, sourceImportance?: {
    [source in MimeSource]: number;
}): number;
