import { Postfixes, PrefixesPostfixes } from '@user3232/pattern'
import { MIMEType } from 'node:util'




/**
 * Rules for resolving file path {@link Mime}.
 */
export type MimeMap = {
    /**
     * Name of this ruleset.
     */
    name?: string,
    /**
     * Version of this ruleset.
     */
    version?: string,
    /**
     * Default resolusion of file extensions with {@link Mime}.
     */
    mimes?: MimeMapMimes,
    /**
     * Scoped resolusion of file extensions with {@link Mime}.
     */
    scopes?: MimeMapScopes,
    /**
     * Exact resolusion of file extensions with {@link Mime}.
     */
    files?: MimeMapFiles,
}
/**
 * Mime information.
 */
export type Mime = {
    /**
     * Mandatory mime name.
     */
    mime: string
} & {
    /**
     * Additional params, e.g. `charset`
     */
    [param in string]?: string
}
/**
 * File path to {@link Mime} map.
 */
export type MimeMapFiles = {
    [path in Path]?: Mime
}
/**
 * File path extension to {@link Mime} map.
 */
export type MimeMapMimes = {
    [extension in Extension]?: Mime
}
/**
 * File path scope to {@link MimeMapMimes} map.
 */
export type MimeMapScopes = {
    [scope in Scope]?: MimeMapMimes
}

/**
 * File path for {@link MimeMap}, must start with `./`,
 * e.g. `./index.html`.
 */
export type Path = `./${string}`
/**
 * File path extension for {@link MimeMap}, must start with `.`,
 * e.g. `.js`.
 */
export type Extension = `.${string}`
/**
 * File path scope for {@link MimeMap}, must start with `./` and
 * ends with `/`, e.g. `./images/`.
 */
export type Scope = `./` | `./${string}/`


/**
 * Exemple {@link MimeMap}.
 */
export const mimemapExample: MimeMap = {
    name: '@user3232/some-app',
    version: '1.0.1',
    mimes: {
        '.ts': {
            mime: 'text/typescript' ,
            charset: 'utf8',
        },
        '.js': {
            mime: 'text/javascript' ,
            charset: 'utf8',
        },
        '.json': {
            mime: 'application/json' ,
            charset: 'utf8',
        },
        '.html': {
            mime: 'text/html' ,
            charset: 'utf8',
        },
        '.svg': {
            mime: 'image/svg+xml',
            charset: 'utf8',
        },
        '.jpeg': {
            mime: 'image/jpeg'
        }
    },
    scopes: {
        './dist/': {
            '.js': {
                mime: 'application/javascript',
                charset: 'utf8',
            },
            '.ts': {
                mime: 'application/typescript' ,
                charset: 'utf8',
            },
        }
    },
    files: {
        './manifest/manifest.json': {
            mime: 'application/manifest+json',
            charset: 'utf8',
        }
    }
}


/**
 * {@link MimeMap} container offering efficient {@link Mime} matching.
 */
export class Mimemap {
    #scopeToExtensions: PrefixesPostfixes
    #mimes: Postfixes
    #files: Set<string>
    #mimemap: MimeMap

    /**
     * Creates {@link Mime}'s container.
     */
    constructor(
        /**
         * Initial mimemap to add to container.
         */
        mimemap?: MimeMap
    ) {
        this.#mimemap = mimemap ?? {}
        this.#scopeToExtensions = new PrefixesPostfixes()
        this.#mimes = new Postfixes()
        this.#files = new Set()

        for(const [path, _] of Object.entries(this.#mimemap.files ?? {})) {
            this.#files.add(path)
        }

        for(const [extension, _] of Object.entries(this.#mimemap.mimes ?? {})) {
            this.#mimes.add(extension)
        }

        for(const [scope, extensionToMime] of Object.entries(this.#mimemap.scopes ?? {})) {
            for(const [extension, _] of Object.entries(extensionToMime ?? {})) {
                this.#scopeToExtensions.add({
                    prefix: scope,
                    postfix: extension
                })
            }
        }
    }

    /**
     * Sets name of internal {@link MimeMap}.
     */
    set name(
        mimemapName: string | undefined
    ) {
        this.#mimemap.name = mimemapName
    }
    /**
     * Gets name of internal {@link MimeMap}.
     */
    get name() {
        return this.#mimemap.name
    }

    /**
     * Sets version of internal {@link MimeMap}.
     */
    set version(
        mimemapVersion: string | undefined
    ) {
        this.#mimemap.version = mimemapVersion
    }

    /**
     * Gets version of internal {@link MimeMap}.
     */
    get version() {
        return this.#mimemap.version
    }

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
        mime: Mime
    ): void {
        if(!this.#mimemap.scopes) {
            this.#mimemap.scopes = {}
        }
        if(!this.#mimemap.scopes[scope]) {
            this.#mimemap.scopes[scope] = {}
        }
        this.#mimemap.scopes[scope][extension] = mime
        this.#scopeToExtensions.add({
            prefix: scope,
            postfix: extension,
        })
    }

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
        mime: Mime
    ): void {
        if(!this.#mimemap.mimes) {
            this.#mimemap.mimes = {}
        }
        this.#mimemap.mimes[extension] = mime
        this.#mimes.add(extension)
    }

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
        mime: Mime,
    ): void {
        if(!this.#mimemap.files) {
            this.#mimemap.files = {}
        }
        this.#mimemap.files[path] = mime
        this.#files.add(path)
    }

    /**
     * Returns matched best {@link Mime} for given path,
     * or `undefined` if no match.
     */
    matchBestTo(
        /**
         * File path for which to match best Mime.
         */
        path: string
    ): Mime | undefined {
        const fileMatch = this.#mimemap.files?.[path as Path]
        if(fileMatch !== undefined) {
            return fileMatch
        }

        const scopeMatchPattern = this.#scopeToExtensions.matchBestTo(path)
        if(scopeMatchPattern !== undefined) {
            const scopeMatch = this.#mimemap.scopes![
                scopeMatchPattern.prefix as Scope
            ]![
                scopeMatchPattern.postfix as Extension
            ]!
            return scopeMatch
        }

        const mimeMatchPattern = this.#mimes.matchBestTo(path)
        if(mimeMatchPattern !== undefined) {
            const mimeMatch = this.#mimemap.mimes![
                mimeMatchPattern as Extension
            ]!
            return mimeMatch
        }

        return undefined
    }

    /**
     * Sorts and serialize underlying {@link MimeMap} object to JSON.
     */
    toJSON(
        /**
         * Adds indentation, white space, and line break characters 
         * to the return-value JSON text to make it easier to read.
         */
        space?: string | number
    ): string {
        return JSON.stringify(
            toSortedMimeMap(this.#mimemap),
            undefined,
            space
        )
    }

    /**
     * Returns serialized deep copy of underlying {@link MimeMap} object.
     */
    toObject(): MimeMap {
        return toSortedMimeMap(this.#mimemap)
    }

    
}




/**
 * Parses mime http header format to {@link Mime} object. 
 * (uses node util class {@link MIMEType})
 */
export function parseMime(
    string: string
): Mime {
    const mime = new MIMEType(string)
    return {
        mime: mime.essence,
        ...Object.fromEntries(mime.params.entries())
    }
}

/**
 * Serializes mime to http header format.
 * (uses node util class {@link MIMEType})
 */
export function serializeMime(
    mime: Mime
): string {
    const mimeSerializer = new MIMEType(mime.mime)
    for(const [key, value] of Object.entries(mime)) {
        if(key !== 'mime') {
            mimeSerializer.params.set(key, value!)
        }
    }
    return mimeSerializer.toString()
}



/**
 * Returns sorted deep copy of provided mimemap.
 */
export function toSortedMimeMap(
    mimemap: MimeMap
): MimeMap {
    const name = mimemap.name
    const version = mimemap.version
    const mimes = sortObject(
        mimemap.mimes,
        (mime) => sortMime(mime)
    )
    const scopes = sortObject(
        mimemap.scopes, 
        (mimes) => sortObject(
            mimes,
            (mime) => sortMime(mime)
        )
    )
    const files = sortObject(
        mimemap.files,
        (mime) => sortMime(mime)
    )
    return {
        name,
        version,
        files,
        mimes,
        scopes,
    }
}


/**
 * Returns sorted deep copy of provided mime.
 */
export function sortMime(mime?: Mime): Mime | undefined {
    if(!mime) {
        return undefined
    }
    const sorted: Mime = {mime: mime.mime}
    const keys = Object.keys(mime).sort()
    for(const key of keys) {
        if(key !== 'mime') {
            sorted[key] = mime[key]
        }
    }
    return sorted
}


/**
 * Returns sorted shallow copy of provided object.
 */
function sortObject<T>(
    object?: Record<string, T>,
    map?: (x: T) => T
) {
    if(!object) {
        return object
    }
    const sortedKeys = Object.keys(object).sort()
    const sortedObject: Record<string, T> = {}
    for(const key of sortedKeys) {
        if(map) {
            sortedObject[key] = map(object[key])
        }
        else {
            sortedObject[key] = object[key]
        }
    }
    return sortedObject
}