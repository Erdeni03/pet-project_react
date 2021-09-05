export default class Tool {
  protected canvas: any
  protected ctx: any
  protected socket: any
  protected id: any
  constructor(canvas: any, socket: any, id: any) {
    this.canvas = canvas
    this.socket = socket
    this.id = id
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  set fillColor(color: string) {
    this.ctx.fillStyle = color
  }

  set strokeColor(color: string) {
    this.ctx.strokeStyle = color
  }

  set lineWidth(width: string) {
    this.ctx.lineWidth = width
  }

  destroyEvents() {
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
    this.canvas.onmousemove = null
  }
}
