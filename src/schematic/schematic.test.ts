import { expect, test } from 'vitest'
import { Schematic } from './schematic'
import { readFileSync } from 'fs'

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
  expect(schematic.name).toBe(schematic.tags.get('name'))
  expect(schematic.description).toBe(schematic.tags.get('description'))
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

  expect(schematic.tags.get('name')).toBe(name)
  expect(schematic.tags.get('description')).toBe(description)
})
test('schematic encoding/decoding coherence', () => {
  const base64 = JSON.parse(
    readFileSync('src/schematic/schematic.test.json', 'utf-8')
  )['encodedSchematic'] as string

  const schematic = Schematic.decode(base64)
  const reencoded = schematic.encode()
  const redecoded = Schematic.decode(reencoded)
  expect(redecoded.base64).toBe(schematic.base64)
  expect(redecoded.name).toBe(schematic.name)
  expect(redecoded.description).toBe(schematic.description)
  expect(redecoded.powerBalance).toBe(schematic.powerBalance)
  expect(redecoded.width).toBe(schematic.width)
  expect(redecoded.height).toBe(schematic.height)
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
  expect(redecoded.name).toBe(name)
  expect(redecoded.description).toBe(description)
})
test('schematic image generation', async () => {
  const base64 = JSON.parse(
    readFileSync('src/schematic/schematic.test.json', 'utf-8')
  )['encodedSchematic'] as string
  const schematic = Schematic.decode(base64)
  await schematic.render()
})
