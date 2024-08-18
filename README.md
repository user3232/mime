# mime

Work with [MIME database](https://github.com/jshttp/mime-db)!

## Install

```sh
$ npm i --save-dev @user3232/mime@git+file:///home/mk/github/tutorials/flatten-vite-manifest#semver:latest
```

## CLI

```sh
$ npx mime --help
$ npx mime info text/plain
$ npx mime find-ext js
$ npx mime find-text json
```

## typescript/javascript


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


## Development - Git Tagging

https://devconnected.com/how-to-create-git-tags/

```sh
# anonimous tag for HEAD
$ git tag v1.0.1

# anotiated tag
$ git tag v1.0.2 -am "Release 1.0.2"

# list tags
$ git tag
v1.0.1
v1.0.2

# list tags with messages
$ git tag -n
v1.0.1
v1.0.2    Release 1.0.2

# push tags
$ git push --tags

# annotiated tag for ref:
# last commit
$ git tag v.1.0.2-head HEAD -am "tag to actual 15.08.2024"
# commit before HEAD
$ git tag v.1.0.2-head HEAD~1 -am "tag to befor changes on 15.08.2024"
```
