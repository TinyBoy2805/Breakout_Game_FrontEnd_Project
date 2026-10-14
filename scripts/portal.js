    import BALL from './ball.js'

    const createPortal = (x, y, width, height, color, velY) =>
    {
        return {
            x,
            y,
            minY: 25*1,
            maxY: 25*25,
            speed: 1,
            velY,
            width,
            height,
            color,

            move: function(canMove)
            {
                if(!canMove) return;

                this.y += this.speed * this.velY
                if(this.y + this.height >= this.maxY)
                {
                    this.y = this.maxY - this.height
                    this.velY *= -1
                }
                else if(this.y <= this.minY)
                {
                    this.y = this.minY
                    this.velY *= -1
                    this.speed = Math.min(this.speed * 1.05, 5)
                }


            },

            draw: function(ctx)
            {

                ctx.shadowBlur = 30
                ctx.shadowColor = this.color

                ctx.fillStyle = this.color
                ctx.fillRect(this.x, this.y, this.width, this.height)

                ctx.shadowBlur = 30
                ctx.shadowColor = "transparent"
            }
        }

    }



    const createTunnel = (xA, yA, xB, yB, colorA, colorB, width, height, canMove=false)=>
    {
        return {
            portalA: createPortal(xA, yA, width, height, colorA, 1),
            portalB: createPortal(xB, yB, width, height, colorB, -1),

            update: function()
            {
                this.collideWithPortalA()
                this.collideWithPortalB()
                this.portalA.move(canMove)
                this.portalB.move(canMove)
            },



            collideWithPortalA: function()
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
                        ball_l <= this.portalA.x + this.portalA.width &&
                        ball_r >= this.portalA.x &&
                        ball_t <= this.portalA.y + this.portalA.height &&
                        ball_b >= this.portalA.y
                    )
                    {
                        const {outX, outY} = {outX: this.portalB.x - ball.radius-10, outY: (this.portalB.y + this.portalB.height)/2}

                        ball.x = outX
                        ball.y = outY

                    }




                }
            },
            collideWithPortalB: function()
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
                        ball_l <= this.portalB.x + this.portalB.width &&
                        ball_r >= this.portalB.x &&
                        ball_t <= this.portalB.y + this.portalB.height &&
                        ball_b >= this.portalB.y
                    )
                    {
                        const {outX, outY} = {outX: this.portalA.x+this.portalA.width, outY: (this.portalA.y + this.portalA.height)/2}

                        ball.x = outX + ball.radius
                        ball.y = outY

                    }

                }
            },

            draw: function(ctx)
            {
                this.portalA.draw(ctx)
                this.portalB.draw(ctx)
            },


        }
    }

    export default {createPortal, createTunnel}
