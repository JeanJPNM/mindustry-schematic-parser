import * as assert from 'uvu/assert'
import { Point2 } from './point2'
import { test } from 'uvu'

test('pack coordinates to an int', () => {
  const point = new Point2(10, 10)
  const packed = point.pack()
  const unpack = Point2.unpack(packed)
  assert.is(point.equals(unpack), true)
})
test('unpack numbers from other Point2', () => {
  const original = new Point2(16, 64)
  assert.is(Point2.x(original.pack()), 16)
  assert.is(Point2.y(original.pack()), 64)
})

test.run()
