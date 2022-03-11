import * as assert from 'uvu/assert'
import { Schematic } from './schematic'
import { readFileSync } from 'fs'
import { test } from 'uvu'

test('schematic getters functioning correctly', () => {
  const schematic = new Schematic({
    height: 0,
    width: 0,
    tiles: [],
    tags: new Map([
      ['name', 'foo'],
      ['description', 'something'],
    ]),
  })
  assert.is(schematic.name, schematic.tags.get('name'))
  assert.is(schematic.description, schematic.tags.get('description'))
})
test('schematic setters functioning correctly', () => {
  const schematic = new Schematic({
    height: 0,
    width: 0,
    tiles: [],
    tags: new Map([
      ['name', 'foo'],
      ['description', 'something'],
    ]),
  })
  const name = 'new name'
  const description = 'my custom description'
  schematic.name = name
  schematic.description = description
  assert.is(schematic.tags.get('name'), name)
  assert.is(schematic.tags.get('description'), description)
})
test('schematic encoding/decoding coherence', () => {
  const base64 = JSON.parse(
    readFileSync('src/schematic/schematic.test.json', 'utf-8')
  )['encodedSchematic'] as string

  const schematic = Schematic.decode(base64)
  const reencoded = schematic.encode()
  const redecoded = Schematic.decode(reencoded)
  assert.is(redecoded.base64, schematic.base64)
  assert.is(redecoded.name, schematic.name)
  assert.is(redecoded.description, schematic.description)
  assert.is(redecoded.powerBalance, schematic.powerBalance)
  assert.is(redecoded.width, schematic.width)
  assert.is(redecoded.height, schematic.height)
})

test('schematic tag editing', () => {
  const base64 = JSON.parse(
    readFileSync('src/schematic/schematic.test.json', 'utf-8')
  )['encodedSchematic'] as string
  const longText = JSON.parse(
    readFileSync('src/schematic/schematic.test.json', 'utf-8')
  )['longText'] as string
  const schematic = Schematic.decode(base64)
  const name = longText.slice(0, Math.floor(longText.length / 2))
  schematic.name = name
  const description = longText.slice(Math.floor(longText.length / 2))
  schematic.description = description
  const reencoded = Schematic.encode(schematic)
  const redecoded = Schematic.decode(reencoded)
  assert.is(redecoded.name, name)
  assert.is(redecoded.description, description)
})
test('schematic image generation', async () => {
  const base64 = JSON.parse(
    readFileSync('src/schematic/schematic.test.json', 'utf-8')
  )['encodedSchematic'] as string
  const schematic = Schematic.decode(base64)
  await schematic.render()
})

test.run()
