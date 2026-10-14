import sprites from "./assets.js"
import game_config from "./game_config.js"
import BLOCK from './block_types.js'

const createMovingWall = (x, y, width, height, type='horizontal')=>
{

    return {
        type,
        x,
        y,
        width,
        height,
        color: "#fafafa",
        minY: 1 * game_config.configs.TILE_SIZE,
        maxY: 10 * game_config.configs.TILE_SIZE,
        minX: 1 * game_config.configs.TILE_SIZE,
        maxX: 47 * game_config.configs.TILE_SIZE,
        speed: 1,
        velX: 1,
        velY: 1,

        update: function()
        {
            this.move()
        },

        move: function()
        {
            if(this.type === 'horizontal') this.moveHorizontal()
            else if(this.type === 'vertical') this.moveVertical()
        },

        moveHorizontal: function()
        {
            this.x += this.speed * this.velX
            if(this.x + this.width >= this.maxX)
            {
                this.x = this.maxX - this.width
                this.velX *= -1
            }else if(this.x <= this.minX)
            {
                this.x = this.minX
                this.velX *= -1
            }
        },

        moveVertical: function()
        {
            this.y += this.speed * this.velY
            if(this.y + this.height >= this.maxY)
            {
                this.y = this.maxY - this.height
                this.velY *= -1
            }else if(this.y <= this.minY)
            {
                this.y = this.minY
                this.velY *= -1
            }
        },

        draw: function(ctx)
        {
            ctx.fillStyle = this.color


            const size = this.width / game_config.configs.TILE_SIZE
            if(this.type === 'horizontal')
            {
                for(let i=0; i<size; i++)
                {
                    ctx.drawImage(
                        sprites[BLOCK.BLOCK_TYPES.WALL][0],
                        this.x + (i * game_config.configs.TILE_SIZE),
                        this.y,
                        game_config.configs.TILE_SIZE,
                        game_config.configs.TILE_SIZE
                    )
                }
            }else if(this.type === 'vertical')
            {
                for(let i=0; i<size; i++)
                {
                    ctx.drawImage(
                        sprites[BLOCK.BLOCK_TYPES.WALL][0],
                        this.x,
                        this.y + (i * game_config.configs.TILE_SIZE),
                        game_config.configs.TILE_SIZE,
                        game_config.configs.TILE_SIZE
                    )
                }
            }



        }
    }

}

const movings = []

export default {createMovingWall, movings}
