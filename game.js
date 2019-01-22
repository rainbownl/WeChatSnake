/*import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'

new Main()*/

const DIRECTION_UP = 0
const DIRECTION_LEFT = 1
const DIRECTION_BOTTOM = 2
const DIRECTION_RIGHT = 3

function Snake(in_maxNodes){
    this.maxNodes = in_maxNodes
    this.nodes = new Array(this.maxNodes)
    this.length = 0
    this.direction = DIRECTION_UP
    for (var i = 0; i < this.maxNodes; i++) {
        this.nodes[i] = new Point(0, 0)
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

    this.Move = function(){
        for (var i = this.length - 1; i >= 1; i--) {
            this.nodes[i].x = this.nodes[i - 1].x
            this.nodes[i].y = this.nodes[i - 1].y
        }
       switch(this.direction){
            case DIRECTION_UP:
                this.nodes[0].y--
                break
            case DIRECTION_BOTTOM:
                this.nodes[0].y++
                break
            case DIRECTION_LEFT:
                this.nodes[0].x--
                break
            case DIRECTION_RIGHT:
                this.nodes[0].x++
                break
        }
        if (this.nodes[0].x < 0 || this.nodes[0].x >= mNumBlockH ||
            this.nodes[0].y < 0 || this.nodes[0].y >= mNumBlockW){
                return -1
        }
        return 0
    }

    this.Eat = function(in_foodx, in_foody){
        if (this.length >= this.maxNodes) {
            return -1
        }
        var foodx, foody
        switch(this.direction){
            case DIRECTION_UP:
                foodx = this.nodes[0].x
                foody = this.nodes[0].y - 1
                break
            case DIRECTION_BOTTOM:
                foodx = this.nodes[0].x
                foody = this.nodes[0].y + 1
                break
            case DIRECTION_LEFT:
                foodx = this.nodes[0].x - 1
                foody = this.nodes[0].y
                break
            case DIRECTION_RIGHT:
                foodx = this.nodes[0].x + 1
                foody = this.nodes[0].y
                break
        }
        if (foodx == in_foodx && foody == in_foody){
                for (var i = this.length - 1; i >= 0; i--) {
                    this.nodes[i + 1].x = this.nodes[i].x
                    this.nodes[i + 1].y = this.nodes[i].y
                }
                this.nodes[0].x = foodx
                this.nodes[0].y = foody
                this.length++
                return 0
        }
    }

    this.Turn = function(dir){
        if (this.length > 1){
            if ((dir == DIRECTION_UP && this.nodes[1].y == this.nodes[0].y-1 && this.nodes[1].x == this.nodes[0].x) ||
                (dir == DIRECTION_BOTTOM && this.nodes[1].y == this.nodes[0].y+1 && this.nodes[1].x == this.nodes[0].x) ||
                (dir == DIRECTION_LEFT && this.nodes[1].x == this.nodes[0].x-1 && this.nodes[1].y == this.nodes[0].y) ||
                (dir == DIRECTION_RIGHT && this.nodes[1].x == this.nodes[0].x+1 && this.nodes[1].y == this.nodes[0].y)){
                    return -1
            }
        }
        this.direction = dir
    }
    return -1
}

function Point(x, y){
    this.x = x
    this.y = y
}

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
var mSnake
var mFood = null

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

function update(){
    //draw background color
    context.fillStyle = mBackgroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)

    drawGrids()
    drawSnake(mSnake)

    //draw food
    if (mFood != null){
        drawBlock(mFood.x, mFood.y)
    }
}

function isPointInSnake(in_x, in_y){
    for (var i = 0; i < mSnake.length; i++){
        if (mSnake.nodes[i].x == in_x && mSnake.nodes[i].y == in_y){
            return true
        }
    }
    return false
}

function produceFood(){
    var food = new Point(0, 0)
    var total = mNumBlockH * mNumBlockW
    var count = 0
    var pos = parseInt(Math.random() * (total - mSnake.length))
    for (var i = 0; i < mNumBlockH; i++){
        for (var j = 0; j < mNumBlockW; j++){
            if (!isPointInSnake(j, i)){
                count++
                if (count == pos) {
                    food.x = j
                    food.y = i
                    return food
                }
            }
        }
    }
    return null
}

var gameInterval = 0
function startGame(){
    gameInterval = setInterval(function(){
        if (mSnake.Move() == 0){
            if (mSnake.Eat(mFood.x, mFood.y) == 0){
                mFood = produceFood()
            }
            update()
        } else {
            gameOver()
        }
    }, 1000)
}

function gameOver(){
    clearInterval(gameInterval)
    var x = 0, y = 0
    var gameOverInterval = setInterval(function(){
        drawBlock(x, y)
        x++
        if (x >= mNumBlockW){
            x = 0
            y++
        }
        if (y >= mNumBlockH){
            clearInterval(gameOverInterval)
        }
    },5)
}

function main(){
    initGrids()
    mSnake = new Snake(100)

    mSnake.Add(5, 6)
    mSnake.Add(5, 7)
    mFood = produceFood()
    update()

    startGame()
}

main()

function isUpGesture(points, length){
    for (var i = 1; i < length; i++){
        if (points[i].y > points[i-1].y || Math.abs(points[i].y - points[i-1].y) < Math.abs(points[i].x - points[i-1].x) ){
            return false
        }
    }
    return true
}

function isDownGesture(points, length){
    for (var i = 1; i < length; i++){
        if(points[i].y < points[i-1].y || Math.abs(points[i].y - points[i-1].y) < Math.abs(points[i].x - points[i-1].x)){
            return false
        }
    }
    return true
}

function isLeftGesture(points, length) {
    for (var i = 1; i < length; i++){
        if (points[i].x > points[i - 1].x || Math.abs(points[i].y - points[i - 1].y) > Math.abs(points[i].x - points[i - 1].x)){
            return false
        }
    }
    return true
}

function isRightGesture(points, length) {
    for (var i = 1; i < length; i++){
        if (points[i].x < points[i - 1].x || Math.abs(points[i].y - points[i - 1].y) > Math.abs(points[i].x - points[i - 1].x)) {
            return false
        }
    }
    return true
}

function gestureDetector(points, length) {
    if (isUpGesture(points, length)){
        return DIRECTION_UP
    } else if (isDownGesture(points, length)){
        return DIRECTION_BOTTOM
    } else if(isLeftGesture(points, length)){
        return DIRECTION_LEFT
    }else if(isRightGesture(points, length)){
        return DIRECTION_RIGHT
    }
    return -1
}

var mGesturePoints = null
var mGesturePtLength

wx.onTouchStart(function(res){
    mGesturePoints = Array()
    var point = new Point(res.changedTouches[0].clientX, res.changedTouches[0].clientY)
    mGesturePtLength = mGesturePoints.push(point)
})

wx.onTouchMove(function(res){
    mGesturePtLength = mGesturePoints.push(new Point(res.changedTouches[0].clientX, res.changedTouches[0].clientY))
})

wx.onTouchEnd(function(res){
    mGesturePtLength = mGesturePoints.push(new Point(res.changedTouches[0].clientX, res.changedTouches[0].clientY))
    var direction = gestureDetector(mGesturePoints, mGesturePtLength)
    if (direction != -1){
        mSnake.Turn(direction)
    }
})