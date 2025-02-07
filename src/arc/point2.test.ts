import { expect, test } from 'vitest'
import { Point2 } from './point2'

test('pack coordinates to an int', () => {
  const point = new Point2(10, 10)
  const packed = point.pack()
  const unpack = Point2.unpack(packed)
  expect(point.equals(unpack)).toBe(true)
})
test('unpack numbers from other Point2', () => {
  const original = new Point2(16, 64)

  expect(Point2.x(original.pack())).toBe(16)
  expect(Point2.y(original.pack())).toBe(64)
})
