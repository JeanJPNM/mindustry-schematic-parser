import Canvas from 'canvas'

let spritesheet: Canvas.Image | undefined

export function isSpritesheetLoaded() {
  return !!spritesheet
}

export function loadSpritesheet(image: Canvas.Image) {
  spritesheet = image
}

export function unloadSpritesheet() {
  spritesheet = undefined
}

export class Sprite {
  constructor(
    public readonly image: Canvas.Image,
    public readonly x: number,
    public readonly y: number,
    public readonly width: number,
    public readonly height: number
  ) {}

  static block(x: number, y: number, width: number, height: number) {
    if (!spritesheet) throw new Error('Spritesheet not loaded')

    return new Sprite(spritesheet, x, y, width, height)
  }

  draw(context: Canvas.CanvasRenderingContext2D, x: number, y: number) {
    context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height,
      x,
      y,
      this.width,
      this.height
    )
  }

  toCanvas() {
    const canvas = Canvas.createCanvas(this.width, this.height)
    const context = canvas.getContext('2d')
    this.draw(context, 0, 0)
    return canvas
  }
}

export function drawImage(
  context: Canvas.CanvasRenderingContext2D,
  image: Canvas.Image | Sprite | Canvas.Canvas,
  x: number,
  y: number
) {
  if (image instanceof Sprite) {
    image.draw(context, x, y)
  } else {
    context.drawImage(image, x, y)
  }
}
