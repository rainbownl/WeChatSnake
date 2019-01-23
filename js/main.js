import Snake from 'snake.js'
import Panel from 'panel.js'
import DIRECTION from 'direction.js'

export default class Main{
    //var gameInterval = -1
    constructor(canvas){
        this.mSnake = new Snake()
        this.mPanel = new Panel({
            startX : 10,
            startY : 10,
            panelWidth : canvas.width - 20,
            panelHeight : canvas.height - 20,
            numBlockW : 20,
            numBlockH : 40,
            gridColor : 'black',
            backgroundColor : 'white',
            canvas : canvas
        })
       this.mSnake.add(10, 20)
       this.mFood = this.produceFood()
 }

    drawSnake(snake) {
        console.log(snake)
        for (var i = 0; i < snake.length(); i++) {
            this.mPanel.drawBlock(snake.nodes[i].x, snake.nodes[i].y, snake.color)
        }
    }

    update() {
        //draw background color
        this.mPanel.drawBackground()

        this.mPanel.drawGrids()
        this.drawSnake(this.mSnake)

        //draw food
        if (this.mFood != null) {
            this.mPanel.drawBlock(this.mFood.x, this.mFood.y, this.mFood.color)
        }
    }
 
    isPointInSnake(in_x, in_y) {
        for (var i = 0; i < this.mSnake.length; i++) {
            if (this.mSnake.nodes[i].x == in_x && this.mSnake.nodes[i].y == in_y) {
                return true
            }
        }
        return false
    }

   produceFood() {
        var food = {x: 0, y: 0, color:'red'}
        var total = this.mPanel.mNumBlockH * this.mPanel.mNumBlockW
        var count = 0
        var pos = parseInt(Math.random() * (total - this.mSnake.length()))
        for (var i = 0; i < this.mPanel.mNumBlockH; i++) {
            for (var j = 0; j < this.mPanel.mNumBlockW; j++) {
                if (!this.isPointInSnake(j, i)) {
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

    startGame() {
       let that = this
        this.gameInterval = setInterval(function () {
            if (that.mSnake.move(that.mPanel.mNumBlockW, that.mPanel.mNumBlockH) == 0) {
                if (that.mSnake.eat(that.mFood.x, that.mFood.y) == 0) {
                    that.mFood = that.produceFood()
                }
                that.update()
            } else {
                that.gameOver()
            }
        }, 1000)
    }

    gameOver() {
        clearInterval(this.gameInterval)
        var x = 0, y = 0
        let that = this
        let gameOverInterval = setInterval(function () {
            that.mPanel.drawBlock(x, y, that.mSnake.color)
            x++
            if (x >= that.mPanel.mNumBlockW) {
                x = 0
                y++
            }
            if (y >= that.mPanel.mNumBlockH) {
                clearInterval(gameOverInterval)
            }
        }, 5)
    }

    stopGame() {
        if (this.gameInterval != -1) {
            clearInterval(this.gameInterval)
            this.gameInterval = -1
        }
        this.mSnake = null
    }

    onGesture(direction){
        if (this.mSnake != null){
            this.mSnake.turn(direction)
        }
    }
}