/*import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'

new Main()*/

var context = wx.createCanvas()
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