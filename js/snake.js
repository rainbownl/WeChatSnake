import Point from 'point.js'
const DIRECTION = require ('direction.js')

export default class Snake{
    constructor() {
        this.nodes = new Array()
        this.direction = DIRECTION.UP
        this.color = 'black'
    }

    length(){
        return this.nodes.length
    }

    add(in_x, in_y) {
        this.nodes.push({x:in_x, y:in_y})
    }

    remove(idx) {
        if (idx < 0 || idx >= this.nodes.length) {
            return
        }
        if (idx < this.nodes.length - 1) {
            for (var i = idx; i < this.nodes.length - 1; i++) {
                this.nodes[i] = this.nodes[i+1]
            }
        }

        this.nodes.pop()
    }

    move(mNumBlockW, mNumBlockH) {
        if (this.nodes.length <= 0){
            return -1
        }
        for (var i = this.nodes.length - 1; i >= 1; i--) {
            this.nodes[i].x = this.nodes[i - 1].x
            this.nodes[i].y = this.nodes[i - 1].y
        }
        switch (this.direction) {
            case DIRECTION.UP:
                this.nodes[0].y--
                break
            case DIRECTION.BOTTOM:
                this.nodes[0].y++
                break
            case DIRECTION.LEFT:
                this.nodes[0].x--
                break
            case DIRECTION.RIGHT:
                this.nodes[0].x++
                break
        }
        if (this.nodes[0].x < 0 || this.nodes[0].x >= mNumBlockW ||
            this.nodes[0].y < 0 || this.nodes[0].y >= mNumBlockH) {
            return -1
        }
        return 0
    }

    eat(in_foodx, in_foody) {
        var foodx, foody
        switch (this.direction) {
            case DIRECTION.UP:
                foodx = this.nodes[0].x
                foody = this.nodes[0].y - 1
                break
            case DIRECTION.BOTTOM:
                foodx = this.nodes[0].x
                foody = this.nodes[0].y + 1
                break
            case DIRECTION.LEFT:
                foodx = this.nodes[0].x - 1
                foody = this.nodes[0].y
                break
            case DIRECTION.RIGHT:
                foodx = this.nodes[0].x + 1
                foody = this.nodes[0].y
                break
        }
        if (foodx == in_foodx && foody == in_foody) {
            this.add(foodx, foody)
            return 0
        }
    }

    turn(dir) {
        if (this.nodes.length > 1) {
            if ((dir == DIRECTION.UP && this.nodes[1].y == this.nodes[0].y - 1 && this.nodes[1].x == this.nodes[0].x) ||
                (dir == DIRECTION.BOTTOM && this.nodes[1].y == this.nodes[0].y + 1 && this.nodes[1].x == this.nodes[0].x) ||
                (dir == DIRECTION.LEFT && this.nodes[1].x == this.nodes[0].x - 1 && this.nodes[1].y == this.nodes[0].y) ||
                (dir == DIRECTION.RIGHT && this.nodes[1].x == this.nodes[0].x + 1 && this.nodes[1].y == this.nodes[0].y)) {
                return -1
            }
        }
        this.direction = dir
        return 0
    }

    clear() {
        this.nodes = new Array()
    }

    biteSelf(){
        for(let i = 1; i < this.nodes.length; i++){
            if(this.nodes[i].x == this.nodes[0].x && this.nodes[i].y == this.nodes[0].y){
                return true
            }
        }
        return false
    }
}
