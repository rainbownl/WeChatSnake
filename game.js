/*import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'

new Main()*/

function Snake(in_maxNodes){
    this.maxNodes = in_maxNodes
    this.nodes = new Array(this.maxNodes)
    this.length = 0
    this.direction = DIRECTION_UP
    for (var i = 0; i < this.maxNodes; i++) {
        this.nodes[i] = new Point()
    }

    this.Add = function(in_x, in_y){
        if (this.length >= this.maxNodes) {
            return
        }
        this.nodes[this.length].x = in_x
        this.nodes[this.length].y = in_y
        this.length++
    }

    this.Remove = function(idx){
        if (idx < 0 || idx >= this.length){
            return
        }
        if (idx < this.length - 1){
            for (var i = idx; i < this.length-1; i++){
                this.nodes[i].x = this.nodes[i+1].x
                this.nodes[i].y = this.nodes[i+1].y
            }
        }

        this.nodes[length-1].x = 0
        this.nodes[length-1].y = 0
        length --
    }
}

function Point(){
    this.x = 0
    this.y = 0
}

const DIRECTION_UP = 0
const DIRECTION_LEFT = 1
const DIRECTION_BOTTOM = 2
const DIRECTION_RIGHT = 3

var canvas = wx.createCanvas()
var context = canvas.getContext("2d")
//context.fillStyle = 'red'
//context.fillRect(0, 0, 100, 100)
var mStartX = 10
var mStartY = 10
var mPanelWidth = canvas.width - 20
var mPanelHeight = canvas.height - 20
var mNumBlockW = 20
var mNumBlockH = 40
var mBlockWidth = 0
var mBlockColor = 'black'
var mBackgroundColor = 'white'

function initGrids(){
    var block_w = mPanelWidth / mNumBlockW
    var block_h = mPanelHeight / mNumBlockH
    mBlockWidth = Math.min(block_w, block_h)
}

function drawGrids(){
    context.lineStyle = mBlockColor
    for(var i = 0; i <= mNumBlockW; i++){
        context.moveTo(mStartX + i * mBlockWidth, mStartY)
        context.lineTo(mStartX + i * mBlockWidth, mStartY + mNumBlockH * mBlockWidth)
        context.stroke()
    }
    
    for(var i = 0; i <= mNumBlockH; i++){
        context.moveTo(mStartX, mStartY + i * mBlockWidth)
        context.lineTo(mStartX + mNumBlockW * mBlockWidth, mStartY + i * mBlockWidth)
        context.stroke()
    }
}

function drawBlock(x, y){
    context.fillStyle = mBlockColor
    context.fillRect(mStartX + x * mBlockWidth, mStartY + y * mBlockWidth, mBlockWidth, mBlockWidth)
}

function drawSnake(snake){
    for (var i = 0; i < snake.length; i++){
        drawBlock(snake.nodes[i].x, snake.nodes[i].y)
    }
}

function main(){
    //draw background color
    context.fillStyle = mBackgroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)

    var snake = new Snake(100)

    snake.Add(5, 6)
    snake.Add(5, 7)
    initGrids()
    drawGrids()
    drawSnake(snake)
}

main()

wx.onTouchMove(function(res){

})
/*var objects = new Array(20)
var objectCount = 0
var background_color = '#243044'
var currentSelectObject = -1
var touchStartX
var touchStartY*/

/*var drawObjects = function () {
    canvasContext.fillStyle = background_color
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < objectCount; i++) {
        objects[i].draw()
    }
}
setInterval(arg => {
    drawObjects()
}, 20)

var touchDetect = function (in_x, in_y) {
    for (var i = 0; i < objectCount; i++) {
        if (objects[i].touchDetect(in_x, in_y) == 1) {
            return i
        }
    }
    return -1
}

var BaseObject = function (in_x, in_y) {
    this.x = in_x
    this.y = in_y
}
var RectObject = function (in_x, in_y) {
    BaseObject.call(this, in_x, in_y)
    this.objType = 'rect'
    this.width = 100
    this.height = 100
    this.fillStyle = 'red'
    this.draw = function () {
        canvasContext.fillStyle = this.fillStyle
        canvasContext.fillRect(this.x, this.y, this.width, this.height)
    }
    this.touchDetect = function (in_x, in_y) {
        if (in_x >= this.x && in_x < this.x + this.width && in_y >= this.y && in_y < this.y + this.height) {
            return 1
        }
        else {
            return 0
        }
    }
}
RectObject.prototype = BaseObject

var CircleObject = function (in_x, in_y, in_r) {
    BaseObject.call(this, in_x, in_y)
    this.r = in_r
    this.fillStyle = 'green'
    this.draw = function () {
        canvasContext.fillStyle = this.fillStyle
        canvasContext.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        canvasContext.fill()
    }
    this.touchDetect = function (in_x, in_y) {
        if (Math.pow(in_x - this.x, 2) + Math.pow(in_y - this.y, 2) <= Math.pow(r, 2)) {
            return 1
        }
        else {
            return 0
        }
    }
}
CircleObject.prototype = BaseObject

var PanelObject = function (in_x, in_y, in_r) {
    CircleObject.call(this, in_x, in_y, in_r)
    this.detectMovement = function (in_x, in_y) {
        if (this.touchDetect(in_x, in_y) == 1) {
            if (in_x == this.x) {
                if (in_y > this.y) {
                    return 0
                }
                else if (in_y < this.y) {
                    return 2
                }
                else {
                    return -1
                }
            }
            else {
                tan = (in_y - this.y) / (in_x - this.x)
                if (in_y > this.y && (tan >= 1 || tan <= -1)) {
                    return 0
                }
                else if (in_x < this.x && (tan < 1 && tan > -1)) {
                    return 1
                }
                else if (in_y < this.y && (tan >= 1 || tan <= -1)) {
                    return 3
                }
                else if (in_x > this.x && (tan > -1 && tan < 1)) {
                    return 4
                }
            }
        }
        return -1
    }
}
var rectObject = new RectObject(20, 20)
objects[objectCount] = rectObject
objectCount++

var circleObject = new CircleObject(35, canvas.height - 35, 30)
objects[objectCount] = circleObject
objectCount++

setInterval(arg => {
    objects[0].x += 10
    objects[0].y += 10
}, 500)

wx.onTouchStart(function (res) {
    touchStartX = res.changedTouches[0].clientX
    touchStartY = res.changedTouches[0].clientY
    currentSelectObject = touchDetect(touchStartX, touchStartY)
    console.log(res.touchs)
})

wx.onTouchMove(function (res) {
    if (currentSelectObject >= 0) {
        objects[currentSelectObject].x = res.changedTouches[0].clientX
        objects[currentSelectObject].y = res.changedTouches[0].clientY
    }
    console.log(res)
})

wx.onTouchEnd(function (res) {
    console.log(res)
    touchStartX = -1
    touchStartY = -1
    currentSelectObject = -1
})*/