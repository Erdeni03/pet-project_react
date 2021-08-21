import Tool from "./Tool";

export default class Rect extends Tool{
    private mouseDown: boolean | undefined;
    private startX: number | undefined;
    private startY: number | undefined;
    private saved: string | undefined;
    constructor(canvas:any) {
        // @ts-ignore
        super(canvas);
        this.listen()
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e:any){
        this.mouseDown = false
    }
    mouseDownHandler(e:any){
        this.mouseDown = true
        this.ctx.beginPath() // Начали рисовать новую линию
        this.startX = e.pageX - e.target.offsetLeft
        this.startY = e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e:any){
        if(this.mouseDown && this.startX && this.startY) {
            let currentX = e.pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop
            let width = currentX - this.startX
            let height = currentY - this.startY
            this.draw(this.startX, this.startY, width, height)
        }
    }

    draw(x:number, y: number, w:number, h:number) {
        const img = new Image()
        if (typeof this.saved === "string") {
            img.src = this.saved
            img.onload = ()=>{
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ctx.drawImage(img, 0,0, this.canvas.width, this.canvas.height)
                this.ctx.beginPath()
                this.ctx.rect(x,y,w,h)
                this.ctx.fill() // заполнение фигуры
                this.ctx.stroke() // обводка
            }
        }


    }

}