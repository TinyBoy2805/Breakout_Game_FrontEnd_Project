
import gameConfig from './game_config.js'
import BALL from './ball.js'
import particle_manager from './particles.js'





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

        update: function()
        {
            this.collideWithBall()
        },

        collideWithBall: function()
        {
            for(const ball of BALL.balls)
            {
                const {ball_t, ball_r, ball_b, ball_l} = {
                    ball_t: ball.y - ball.radius,
                    ball_r: ball.x + ball.radius,
                    ball_b: ball.y + ball.radius,
                    ball_l: ball.x - ball.radius
                }

                if(
                    ball_t <= this.y + this.impact_range+this.plus_impact_range &&
                    ball_b >= this.y - this.impact_range-this.plus_impact_range &&
                    ball_l <= this.x + this.impact_range+this.plus_impact_range &&
                    ball_r >= this.x - this.impact_range-this.plus_impact_range
                )
                {
                    this.changeBallDirection(ball)
                }

            }
        },

        changeBallDirection: function(ball)
        {
            const dx = this.x - ball.x
            const dy = this.y - ball.y
            const angle = Math.atan2(dy, dx)

            ball.velX += Math.cos(angle) * this.gravity
            ball.velY += Math.sin(angle) * this.gravity
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


export default createBlackHole








