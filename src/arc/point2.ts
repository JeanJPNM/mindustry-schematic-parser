/**
 * A point in a 2D grid, with integer x and y coordinates
 * @author badlogic
 *
 * Copied from `Anuken/Arc`
 */
export class Point2 {
  /**
   * Constructs a new 2D grid point.
   * @param x X coordinate
   * @param y Y coordinate
   */
  constructor(public x: number, public y: number) {}

  /** @return a point unpacked from an integer. */
  public static unpack(pos: number): Point2 {
    return new Point2(pos >>> 16, pos & 0xffff)
  }

  /** @return this point packed into a single int by casting its components to shorts. */
  public static pack(x: number, y: number): number {
    return (x << 16) | (y & 0xffff)
  }

  /** @return the x component of a packed position. */
  public static x(pos: number): number {
    return pos >>> 16
  }

  /** @return the y component of a packed position. */
  public static y(pos: number): number {
    return pos & 0xffff
  }

  /** @return this point packed into a single int by casting its components to shorts. */
  public pack(): number {
    return Point2.pack(this.x, this.y)
  }

  /**
   * Sets the coordinates of this 2D grid point.
   * @param x X coordinate
   * @param y Y coordinate
   * @return this 2D grid point for chaining.
   */
  public set(x: number, y: number): Point2

  /**
   * Sets the coordinates of this 2D grid point to that of another.
   * @param point The 2D grid point to copy the coordinates of.
   * @return this 2D grid point for chaining.
   */
  public set(point: Point2): Point2

  public set(...args: [Point2] | [number, number]): Point2 {
    if (args[0] instanceof Point2) {
      const [point] = args
      this.x = point.x
      this.y = point.y
      return this
    }
    const [x, y] = args
    this.x = x
    this.y = y as number
    return this
  }

  /**
   * @param other The other point
   * @return the squared distance between this point and the other point.
   */
  public dst2(other: Point2): number

  /**
   * @param x The x-coordinate of the other point
   * @param y The y-coordinate of the other point
   * @return the squared distance between this point and the other point.
   */
  public dst2(x: number, y: number): number

  dst2(...args: [Point2] | [number, number]): number {
    if (args[0] instanceof Point2) {
      const [other] = args
      const xd = other.x - this.x
      const yd = other.y - this.y
      return xd * xd + yd * yd
    }
    const [x, y] = args
    const xd = x - this.x
    const yd = (y as number) - this.y
    return xd * xd + yd * yd
  }

  /**
   * @param other The other point
   * @return the distance between this point and the other vector.
   */
  public dst(other: Point2): number

  /**
   * @param x The x-coordinate of the other point
   * @param y The y-coordinate of the other point
   * @return the distance between this point and the other point.
   */
  public dst(x: number, y: number): number

  dst(...args: [Point2] | [number, number]): number {
    if (args[0] instanceof Point2) {
      const [other] = args
      const xd = other.x - this.x
      const yd = other.y - this.y

      return Math.sqrt(xd * xd + yd * yd)
    }
    const [x, y] = args
    const xd = x - this.x
    const yd = (y as number) - this.y

    return Math.sqrt(xd * xd + yd * yd)
  }

  /**
   * Adds another 2D grid point to this point.
   * @param other The other point
   * @return this 2d grid point for chaining.
   */
  public add(other: Point2): Point2

  /**
   * Adds another 2D grid point to this point.
   * @param x The x-coordinate of the other point
   * @param y The y-coordinate of the other point
   * @return this 2d grid point for chaining.
   */
  public add(x: number, y: number): Point2

  add(...args: [Point2] | [number, number]): Point2 {
    if (args[0] instanceof Point2) {
      const [other] = args
      this.x += other.x
      this.y += other.y
      return this
    }
    const [x, y] = args
    this.x += x
    this.y += y as number
    return this
  }

  /**
   * Subtracts another 2D grid point from this point.
   * @param other The other point
   * @return this 2d grid point for chaining.
   */
  public sub(other: Point2): Point2

  /**
   * Subtracts another 2D grid point from this point.
   * @param x The x-coordinate of the other point
   * @param y The y-coordinate of the other point
   * @return this 2d grid point for chaining.
   */
  public sub(x: number, y: number): Point2

  sub(...args: [Point2] | [number, number]): Point2 {
    if (args[0] instanceof Point2) {
      const [other] = args
      this.x -= other.x
      this.y -= other.y
      return this
    }
    const [x, y] = args
    this.x -= x
    this.y -= y as number
    return this
  }

  /**
   * @return a copy of this grid point
   */
  public cpy(): Point2 {
    return new Point2(this.x, this.y)
  }

  /** Rotates this point in 90-degree increments several times. */
  public rotate(steps: number): Point2 {
    for (let i = 0; i < Math.abs(steps); i++) {
      const { x } = this
      if (steps >= 0) {
        this.x = -this.y
        this.y = x
      } else {
        this.x = this.y
        this.y = -x
      }
    }
    return this
  }

  public static equals(x: number, y: number, ox: number, oy: number): boolean {
    return x === ox && y === oy
  }

  public equals(other: Point2): boolean

  public equals(x: number, y: number): boolean

  public equals(...args: [Point2] | [number, number]): boolean {
    {
      if (args[0] instanceof Point2) {
        const [other] = args
        return this.x === other.x && this.y === other.y
      }
      const [x, y] = args
      return this.x === x && this.y === y
    }
  }

  public hashCode(): number {
    return this.x * 0xc13f + this.y * 0x91e1
  }

  public toString(): string {
    return '(' + this.x + ', ' + this.y + ')'
  }
}
