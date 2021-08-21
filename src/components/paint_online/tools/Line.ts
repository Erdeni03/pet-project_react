import Tool from "./Tool";
import React, {EventHandler, MouseEventHandler} from "react";


export default class Line extends Tool {
    private name: string;
    private mouseDown: boolean | undefined;
    private currentX: number | undefined;
    private currentY: number | undefined;
    private saved: string | undefined;
    constructor(canvas:any) {
        // @ts-ignore
        super(canvas);
        this.listen()
        this.name = 'Line'
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseDownHandler(e: any) {
        this.mouseDown = true
        this.currentX = e.pageX-e.target.offsetLeft
        this.currentY = e.pageY-e.target.offsetTop
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY )
        this.saved = this.canvas.toDataURL()
    }

    mouseUpHandler(e: Event) {
        this.mouseDown = false
    }

    mouseMoveHandler(e:any) {
        if (this.mouseDown) {
            this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop);
        }
    }


    draw(x:number,y:number) {
        const img = new Image()
        if (typeof this.saved === "string") {
            img.src = this.saved
            img.onload = async () => {
                this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
                this.ctx.beginPath()
                this.ctx.moveTo(this.currentX, this.currentY )
                this.ctx.lineTo(x, y)
                this.ctx.stroke()
            }
        }


    }
}