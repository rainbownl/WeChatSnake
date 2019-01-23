export default class Panel{
    constructor(config){
        this.mPanelWidth = config.panelWidth
        this.mPanelHeight = config.panelHeight
        this.mNumBlockW = config.numBlockW
        this.mNumBlockH = config.numBlockH
        this.mStartX = config.startX
        this.mStartY = config.startY
        this.mGridColor = config.gridColor
        this.canvas = config.canvas
        this.mBgColor = config.backgroundColor
        this.context = this.canvas.getContext('2d')

        var block_w = this.mPanelWidth / this.mNumBlockW
        var block_h = this.mPanelHeight / this.mNumBlockH
        this.mBlockWidth = Math.min(block_w, block_h)
    }

    drawGrids() {
        this.context.lineStyle = this.mGridColor
        for (var i = 0; i <= this.mNumBlockW; i++) {
            this.context.moveTo(this.mStartX + i * this.mBlockWidth, this.mStartY)
            this.context.lineTo(this.mStartX + i * this.mBlockWidth, this.mStartY + this.mNumBlockH * this.mBlockWidth)
            this.context.stroke()
        }

        for (var i = 0; i <= this.mNumBlockH; i++) {
            this.context.moveTo(this.mStartX, this.mStartY + i * this.mBlockWidth)
            this.context.lineTo(this.mStartX + this.mNumBlockW * this.mBlockWidth, this.mStartY + i * this.mBlockWidth)
            this.context.stroke()
        }
    }

    drawBlock(x, y, color, context) {
        this.context.fillStyle = color
        this.context.fillRect(this.mStartX + x * this.mBlockWidth, this.mStartY + y * this.mBlockWidth, 
            this.mBlockWidth, this.mBlockWidth)
    }

    drawBlocks(blocks, count, color, context){
        for (let i = 0; i < count; i++){
            this.drawBlock(blocks[i].x, blocks[i].y, color, context)
        }
    }

    drawBackground(){
        this.context.fillStyle = this.mBgColor
        this.context.fillRect(0, 0, this.canvas.width - 1, this.canvas.height - 1)
    }
}