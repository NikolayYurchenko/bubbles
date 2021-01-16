import Rec from './Rec.js'
import Vector from './Vector.js'
const canvas = document.getElementById("screen")
const ctx = canvas.getContext("2d")

// set width and height of canvas
canvas.width =  document.body.offsetWidth
canvas.height = document.body.offsetHeight

let drawCanvas = () => {
    ctx.fillStyle = "#333333";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
    let createElements = Array.from(Array(100), () => {
       const rec = new Rec (
            Math.floor(Math.random() * canvas.width),
            Math.floor(Math.random() * canvas.height),
            Math.floor(Math.random() * 25 + 32),
            Math.floor(Math.random() * 25 + 32) 
        )

     let temp = Math.floor(Math.random()*6) + 8 + 12
     rec.color = `rgba(${temp},${temp},${temp},0.3)` 

     return rec
    })
   let player = Array.from(Array(700), () => {
        let r = Math.random() * 10
        const rec = new Rec (
         Math.floor(Math.random() * canvas.width),
         Math.floor(Math.random() * canvas.height),
         Math.floor(r + 2),
         Math.floor(r + 2) 
        )
       
       rec.color = "lime"
       return rec 
   })

let target = new Vector(0,0);  
let mouseMoveListener = () => {
    canvas.addEventListener("mousemove", ({offsetX,offsetY}) => {
        target.x = offsetX
        target.y = offsetY
    })
}    

let clickListener = () => {
    canvas.addEventListener("click", ({offsetX,offsetY}) => {
        player.forEach((box,index) => {
           moveRec(box,index, offsetX - (box.x + Math.floor(Math.random()*25)),offsetY - (box.y + Math.floor(Math.random()*25)))
        })
        drawCanvas()
    })
}

let overlap = (box,object) => {
    return object.right > box.left &&
           object.left < box.right &&
           object.top < box.bottom &&
           object.bottom > box.top;
}

let intersection = (object,index,cb) => {
    player.filter((box,i) => index !==i && overlap(box,object)).forEach(cb)
    createElements.filter(box =>  overlap(box,object) ).forEach(cb)
}

let moveRec = (object,index,vx,vy) => {
    object.x += vx
    if (vx > 0) {
        intersection(object,index,(box)=> {
            if (object.right > box.left) {
                object.right = box.left
            }
        })
    } else if (vx < 0) {
        intersection(object,index,(box)=> {
            if (object.left < box.right) {
                object.left = box.right
            }
        })
    }
    object.y += vy
    if (vy > 0) {
        intersection(object,index,(box) => { 
            if (object.bottom > box.top) {
                object.bottom = box.top
            }
        })
    } else if (vy < 0) {
        intersection(object,index,(box) => { 
            if (object.top < box.bottom) {
                object.top = box.bottom
            }
        })
    }
}

let drawBoxes = () => {
    //draw static rectangle
    createElements.forEach(box => {
        ctx.fillStyle = box.color
        ctx.fillRect(box.x,box.y,box.width,box.height)
    })
    // draw rectangle for player 
    player.forEach (player => {
        ctx.fillStyle = player.color
        ctx.fillRect(player.x,player.y,player.width,player.height)
    })
}
let update = () => {
    player.forEach ((player,index) => {
        let moveTo = new Vector(target.x - player.x , target.y - player.y)
        if (moveTo.len > 1) {
            moveTo.len /= ((player.width * player.height) - 1)
            moveRec(player,index,moveTo.x,moveTo.y)
        }
    })
    drawCanvas()
    drawBoxes();
    requestAnimationFrame(update)
}
let init = () => {
    drawCanvas()
    drawBoxes()
    mouseMoveListener()
    clickListener()
    update()
}

init()
