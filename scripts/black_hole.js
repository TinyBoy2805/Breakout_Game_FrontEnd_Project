
import gameConfig from './game_config.js'
import BALL from './ball.js'
import particle_manager from './particles.js'
import BRICK from './brick.js'




const scale = 0.65


const createBlackHole = (x, y)=>
{
    return {
        x,
        y,
        radius: 70*scale,
        impact_range: 80*scale,
        plus_impact_range: 0,
        color: "#0d0118e6",
        impact_color: "#ff8800",
        gravity: 0.5,
        angle: 0,
        pulse: 0,
        minX: 0,
        maxX: 1100,
        speed: 0.5,
        velX: 1,

        update: function()
        {
            this.collideWithBall()
            this.move()
            this.pullDrops()
        },

        pullDrops: function()
        {
            for(let i=0; i<BRICK.drops.length; i++)
            {
                const drop = BRICK.drops[i]

                const dropCenterX = drop.x * gameConfig.configs.TILE_SIZE + drop.width / 2
                const dropCenterY = drop.y * gameConfig.configs.TILE_SIZE + drop.height / 2

                const dx = this.x - dropCenterX
                const dy = this.y - dropCenterY

                const dis = Math.sqrt(dx*dx + dy*dy)

                if(dis < this.impact_range)
                {
                    
                    if(dis < 10)
                    {
                        drop.destroyed = true
                    }
                    
                    const dx = this.x - dropCenterX
                    const dy = this.y - dropCenterY
                    const angle = Math.atan2(dy, dx)

                    drop.velX += Math.cos(angle) * this.gravity
                    drop.velY += Math.sin(angle) * this.gravity
                    
                }


            }
        },

        changeObjDirection: function(obj)
        {
            const dx = this.x - obj.x
            const dy = this.y - obj.y
            const angle = Math.atan2(dy, dx)

            obj.velX += Math.cos(angle) * this.gravity
            obj.velY += Math.sin(angle) * this.gravity
        },

        move: function()
        {
            this.x += this.speed * this.velX
            if(this.x  >= this.maxX)
            {
                this.x = this.maxX
                this.velX *= -1
            }else if(this.x <= this.minX)
            {
                this.x = this.minX
                this.velX *= -1
            }
        },

        collideWithBall: function()
        {
            for(const ball of BALL.balls)
            {
                const dx = this.x - ball.x
                const dy = this.y - ball.y

                const distance = Math.sqrt(dx*dx + dy*dy)

                if(distance < this.impact_range + this.plus_impact_range)
                {
                    ball.speed = (ball.speed - 2) <= 0 ? 0.5 : ball.speed - 2
                    this.changeObjDirection(ball)
                }else ball.speed = 2

            }
        },



        draw: function(ctx)
        {
            ctx.shadowBlur = 20
            ctx.shadowColor = this.impact_color
            ctx.beginPath()
            ctx.fillStyle = this.impact_color
            ctx.arc(this.x, this.y, this.impact_range, 0, Math.PI*2)
            ctx.fill()

            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.fillStyle = "rgba(105, 49, 0, 0.19)"
            this.angle += 0.003
            ctx.rotate(this.angle)
            ctx.fillRect(-(this.impact_range*2+25)/2, -(this.impact_range*2+25)/2, this.impact_range*2+25, this.impact_range*2+25)
            ctx.restore()



            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
            ctx.fill()

            this.pulse += 0.03
            const r = this.radius + Math.sin(this.pulse) *10
            ctx.fillStyle = "#ff9e1f1a"
            ctx.beginPath()
            ctx.arc(this.x, this.y, r, 0, Math.PI*2)
            ctx.fill()

            ctx.shadowBlur = 20
            ctx.shadowColor = "transparent"

        }

    }

}

const holes = []

export default {createBlackHole, holes}








