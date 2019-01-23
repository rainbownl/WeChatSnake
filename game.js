/*import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'

new Main()*/
import Point from 'js/point.js'
import Snake from 'js/snake.js'
import Main from 'js/main.js'

const DIRECTION=require('js/direction.js')
var canvas = wx.createCanvas()
var main = new Main(canvas)

main.startGame()


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
        return DIRECTION.UP
    } else if (isDownGesture(points, length)){
        return DIRECTION.BOTTOM
    } else if(isLeftGesture(points, length)){
        return DIRECTION.LEFT
    }else if(isRightGesture(points, length)){
        return DIRECTION.RIGHT
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
        main.onGesture(direction)
    }
})
