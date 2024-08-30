import assert from 'node:assert'
import test from 'node:test'
import { Mimemap, mimemapExample } from '../src/mimemap.js'


test('Mimemap', async (t) => {
    const tests: Promise<void>[] = []
    tests.push(t.test('Finding best mime matching file path works', () => {

        
        const mime = new Mimemap(mimemapExample)
        // const mimeObject = mime.toObject()
        // console.log(mimeObject.scopes?.['./dist/']?.['.js'])
        // console.log(mimeObject)

        assert.deepStrictEqual(
            mime.matchBestTo('./index.ts')?.mime, 'text/typescript'
        )
        assert.deepStrictEqual(
            mime.matchBestTo('./src/index.js')?.mime, 'text/javascript'
        )
        assert.deepStrictEqual(
            mime.matchBestTo('./dist/index.js')?.mime, 'application/javascript'
        )
        assert.deepStrictEqual(
            mime.matchBestTo('./manifest/manifest.json')?.mime, 'application/manifest+json'
        )
    }))

    await Promise.all(tests)
})

