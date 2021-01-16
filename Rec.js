export default class Rec {
    constructor(x,y,width,height)  {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
    }

    // getters

    get left() {
        return this.x
    }
    get right() {
        return this.x + this.width
    }
    get top() {
        return this.y
    }
    get bottom() {
        return this.y + this.height
    }

    // setters

     set left(value) {
         this.x = value
     }
     set right(value) {
        this.x = value - this.width
     }
     set top(value) {
         this.x = value
     }
     set bottom(value) {
        this.y = value - this.height
     }
}