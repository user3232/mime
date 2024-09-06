# mime

API for creating and using mimemap's.

CLI and API for searching/using [MIME database](https://github.com/jshttp/mime-db).


## Install

```sh
$ npm i --save-dev user3232/mime#semver:latest
$ npm i --save-dev @user3232/mime@github:user3232/mime#semver:latest
$ npm i --save-dev @user3232/mime@git+https://github.com/user3232/mime#semver:latest
```



## Create and use mimemap


```ts
import { Mimemap, mimemapExample } from '@user3232/mime/mimemap.js'

const mimemap = {
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

const mime = new Mimemap(mimemapExample)
mime.matchBestTo('./index.ts')?.mime
// 'text/typescript'
mime.matchBestTo('./src/index.js')?.mime
// 'text/javascript'
mime.matchBestTo('./dist/index.js')?.mime
// 'application/javascript'
mime.matchBestTo('./manifest/manifest.json')?.mime
// 'application/manifest+json'

```


## Search mime db CLI

```sh
$ npx mime --help
$ npx mime info text/plain
$ npx mime find-ext js
$ npx mime find-text json
```

## Search mime db API


```ts
import * as mime from '@user3232/mime'

// completition works here
const jsMime = mime.mimeToInfo['application/javascript']

// mime to content encoding
console.log(mime.mimeToContentEncoding(jsMime))
// "application/javascript; charset=utf-8"

// find mime for file
const maybeMime = mime.findMimeForFile('./static/index.html')
console.log(maybeMime)
// text/html
console.log(mime.getMimeInfo(maybeMime))
// {
//   source: 'iana',
//   compressible: true,
//   extensions: [ 'html', 'htm', 'shtml' ]
// }
```
