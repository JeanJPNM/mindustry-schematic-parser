export type CanvasLike = Pick<HTMLCanvasElement, 'width' | 'height'> & {
  getContext(contextId: '2d'): CanvasContextLike
}
export type CanvasDrawable = CanvasLike | ImageLike
export type CanvasContextLike = Pick<
  CanvasRenderingContext2D,
  | 'save'
  | 'globalAlpha'
  | 'restore'
  | 'translate'
  | 'rotate'
  | 'globalCompositeOperation'
  | 'fillStyle'
  | 'fillRect'
  | 'shadowOffsetY'
  | 'shadowOffsetX'
  | 'shadowBlur'
  | 'shadowColor'
  | 'scale'
> & {
  drawImage(image: CanvasDrawable, dx: number, dy: number): void
  drawImage(
    image: CanvasDrawable,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void
  drawImage(
    image: CanvasDrawable,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void
  createPattern(image: CanvasDrawable, repetition: string | null): CanvasPattern
}

export type ImageLike = Pick<HTMLImageElement, 'width' | 'height'>
