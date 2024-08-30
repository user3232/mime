/**
 * Rules for resolving file path {@link Mime}.
 */
export type MimeMap = {
    /**
     * Name of this ruleset.
     */
    name?: string;
    /**
     * Version of this ruleset.
     */
    version?: string;
    /**
     * Default resolusion of file extensions with {@link Mime}.
     */
    mimes?: MimeMapMimes;
    /**
     * Scoped resolusion of file extensions with {@link Mime}.
     */
    scopes?: MimeMapScopes;
    /**
     * Exact resolusion of file extensions with {@link Mime}.
     */
    files?: MimeMapFiles;
};
/**
 * Mime information.
 */
export type Mime = {
    /**
     * Mandatory mime name.
     */
    mime: string;
} & {
    [param in string]?: string;
};
/**
 * File path to {@link Mime} map.
 */
export type MimeMapFiles = {
    [path in Path]?: Mime;
};
/**
 * File path extension to {@link Mime} map.
 */
export type MimeMapMimes = {
    [extension in Extension]?: Mime;
};
/**
 * File path scope to {@link MimeMapMimes} map.
 */
export type MimeMapScopes = {
    [scope in Scope]?: MimeMapMimes;
};
/**
 * File path for {@link MimeMap}, must start with `./`,
 * e.g. `./index.html`.
 */
export type Path = `./${string}`;
/**
 * File path extension for {@link MimeMap}, must start with `.`,
 * e.g. `.js`.
 */
export type Extension = `.${string}`;
/**
 * File path scope for {@link MimeMap}, must start with `./` and
 * ends with `/`, e.g. `./images/`.
 */
export type Scope = `./` | `./${string}/`;
/**
 * Exemple {@link MimeMap}.
 */
export declare const mimemapExample: MimeMap;
/**
 * {@link MimeMap} container offering efficient {@link Mime} matching.
 */
export declare class Mimemap {
    #private;
    /**
     * Creates {@link Mime}'s container.
     */
    constructor(
    /**
     * Initial mimemap to add to container.
     */
    mimemap?: MimeMap);
    /**
     * Sets name of internal {@link MimeMap}.
     */
    set name(mimemapName: string | undefined);
    /**
     * Gets name of internal {@link MimeMap}.
     */
    get name(): string | undefined;
    /**
     * Sets version of internal {@link MimeMap}.
     */
    set version(mimemapVersion: string | undefined);
    /**
     * Gets version of internal {@link MimeMap}.
     */
    get version(): string | undefined;
    /**
     * Adds extension scoped {@link Mime} to this container.
     */
    setScopedMime(
    /**
     * File scope associated with provided Mime.
     */
    scope: Scope, 
    /**
     * File extension associated with provided Mime.
     */
    extension: Extension, 
    /**
     * Provided Mime.
     */
    mime: Mime): void;
    /**
     * Adds extension default {@link Mime} to this container.
     */
    setDefaultMime(
    /**
     * File extension associated with provided Mime.
     */
    extension: Extension, 
    /**
     * Provided Mime.
     */
    mime: Mime): void;
    /**
     * Adds file {@link Mime} to this container.
     */
    setFileMime(
    /**
     * File path for provided Mime.
     */
    path: Path, 
    /**
     * Provided Mime.
     */
    mime: Mime): void;
    /**
     * Returns matched best {@link Mime} for given path,
     * or `undefined` if no match.
     */
    matchBestTo(
    /**
     * File path for which to match best Mime.
     */
    path: string): Mime | undefined;
    /**
     * Sorts and serialize underlying {@link MimeMap} object to JSON.
     */
    toJSON(
    /**
     * Adds indentation, white space, and line break characters
     * to the return-value JSON text to make it easier to read.
     */
    space?: string | number): string;
    /**
     * Returns serialized deep copy of underlying {@link MimeMap} object.
     */
    toObject(): MimeMap;
}
/**
 * Parses mime http header format to {@link Mime} object.
 * (uses node util class {@link MIMEType})
 */
export declare function parseMime(string: string): Mime;
/**
 * Serializes mime to http header format.
 * (uses node util class {@link MIMEType})
 */
export declare function serializeMime(mime: Mime): string;
/**
 * Returns sorted deep copy of provided mimemap.
 */
export declare function toSortedMimeMap(mimemap: MimeMap): MimeMap;
/**
 * Returns sorted deep copy of provided mime.
 */
export declare function sortMime(mime?: Mime): Mime | undefined;
