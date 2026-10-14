
import gameConfig from "./game_config.js"
import BAR from "./bar.js"
import BALL from "./ball.js"
import sprites from "./assets.js"


const createDrop = (x, y, type = 'bonus')=>
{
    return {
        x,
        y,
        width: gameConfig.configs.TILE_SIZE,
        height: gameConfig.configs.TILE_SIZE,
        speed: 0.02,
        destroyed: false,
        bonusDrop: Math.floor((Math.random()*4)+1),

        update: function()
        {
            this.fall()
            this.collideWithBar()
        },

        draw: function(ctx)
        {

            ctx.shadowBlur = 10
            ctx.shadowColor = "white"
            ctx.drawImage(sprites.DROP[this.bonusDrop-1] ,this.x*gameConfig.configs.TILE_SIZE, this.y*gameConfig.configs.TILE_SIZE, this.width, this.height)
            ctx.shadowBlur = 0
            ctx.shadowColor = "transparent"
        },

        fall: function()
        {
            this.y += this.speed
        },

        collideWithBar: function()
        {
            if(
                this.x*gameConfig.configs.TILE_SIZE <= BAR.x + BAR.width &&
                this.x*gameConfig.configs.TILE_SIZE + this.width >= BAR.x &&
                this.y*gameConfig.configs.TILE_SIZE <= BAR.y + BAR.height &&
                this.y*gameConfig.configs.TILE_SIZE + this.height >= BAR.y
            )
            {

                for(let i=0; i<this.bonusDrop; i++)
                {
                    const ball = BALL.createBall(BAR.x+BAR.width/2, BAR.y - 25)
                    ball.velX = i*0.25
                    BALL.balls.push(ball)
                }
                this.destroyed = true
            }
        }
    }
}

export default createDrop
