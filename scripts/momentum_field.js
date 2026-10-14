import BALL from './ball.js'

//accelerate
//decelerate


const createField = (x, y, radius, color, blurColor=color,type = 'accelerate')=>
{
    return {
        x, y, radius, color, blurColor, type,


        update: function()
        {
            switch(this.type)
            {
                case 'accelerate':
                    this.accelerate();
                    break;
                case 'decelerate':
                    this.decelerate()
                    break;
            }
        },


        collideWithBalls: function(ball)
        {
            const {ball_t, ball_r, ball_b, ball_l} = {
                ball_t: ball.y - ball.radius,
                ball_r: ball.x + ball.radius,
                ball_b: ball.y + ball.radius,
                ball_l: ball.x - ball.radius
            }

            const {field_t, field_r, field_b, field_l} = {
                field_t: this.y - this.radius,
                field_r: this.x + this.radius,
                field_b: this.y + this.radius,
                field_l: this.x - this.radius
            }

            if(
                ball_t <= field_b &&
                ball_b >= field_t &&
                ball_l <= field_r &&
                ball_r >= field_l
            )
            {
                return true
            }

            return false
        },

        accelerate: function()
        {
            for(const ball of BALL.balls)
            {
                if(this.collideWithBalls(ball))
                {
                    ball.vector_scale = Math.min(ball.vector_scale * 1.005, 5)
                    return;
                }
            }
        },

        decelerate: function()
        {
            for(const ball of BALL.balls)
            {
                if(this.collideWithBalls(ball))
                {
                    ball.vector_scale = Math.max(ball.vector_scale / 2, 0.5)
                    return;
                }
            }
        },

        draw: function(ctx)
        {
            ctx.fillStyle = this.color

            ctx.shadowBlur = 20
            ctx.shadowColor = this.blurColor

            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
            ctx.fill()

            ctx.shadowBlur = 0
            ctx.shadowColor = "transparent"

        }
    }
}




const createMomentumField = ()=>
{
    return {
        accelerate_field: createField(190, 235, 90, "#ff195a45", "#ff4a7d", "accelerate"),
        decelerate_field: createField(1015, 235, 90, "#214aff4a", "#4049ff", "decelerate"),

        swap: function()
        {
            let tmpX = this.accelerate_field.x
            let tmpY = this.accelerate_field.y

            this.accelerate_field.x = this.decelerate_field.x
            this.accelerate_field.y = this.decelerate_field.y

            this.decelerate_field.x = tmpX
            this.decelerate_field.y = tmpY
        },

        update: function()
        {
            this.accelerate_field.update()
            this.decelerate_field.update()
        },

        draw: function(ctx)
        {
            this.accelerate_field.draw(ctx)
            this.decelerate_field.draw(ctx)
        }


    }
}


export default createMomentumField








