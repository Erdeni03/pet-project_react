import Brush from './Brush'

export default class Eraser extends Brush {
  // eslint-disable-next-line no-useless-constructor
  constructor(canvas: any) {
    // @ts-ignore
    super(canvas)
  }

  draw(x: number, y: number) {
    this.ctx.strokeStyle = 'white'
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
  }
}
