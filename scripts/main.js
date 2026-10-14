

import gameConfig from './game_config.js'
import BALL from './ball.js'
import BRICK from './brick.js'
import BAR from './bar.js'
import user from './user_info.js'
import TUNNEL from './portal.js'
import MAPS from './map_level.js'
import createBlackHole from './black_hole.js'
import SHIELD from './shield.js'
import MOVINGS from './moving_wall.js'
import createMomentumField from './momentum_field.js'
import particle_manager from './particles.js'
import BLOCK from './block_types.js'
import TEXT_FLY from './text_fly.js'
import LEVEL_BRIEFS from './level_briefs.js'

user.level = localStorage.getItem("level")
user.highestScore = localStorage.getItem("highest")

const game = document.getElementById("game")
const ctx = game.getContext("2d")
ctx.imageSmoothingEnabled = false;

const pause_menu = document.querySelector('.overlay')
const info_board = document.getElementById("info_board")
const currentScore = info_board.querySelector("#score")
const highestScore = info_board.querySelector("#high_score")
const levelInfo = info_board.querySelector("#level_info")
const liveInfo = info_board.querySelector("#live_info")
const briefUI = document.querySelector(".brief")

const difficultyColors = {
  "Easy": '#00FF66',
  "Medium": '#00f0ff',
  "Hard": '#FFEA00',
  "Expert": '#FF5F1F',
  "Nightmare": '#FF00AA',
  "Demon": '#9D00FF'
};


pause_menu.querySelector("#restart").addEventListener("click", ()=>
{
    window.location.reload()
})


game.width = gameConfig.configs.GAME_WIDTH
game.height = gameConfig.configs.GAME_HEIGHT


const mapLevel = MAPS[`level${user.level}`]
const levelBrief = LEVEL_BRIEFS[`level${user.level}`]

let isPaused = false
const color = difficultyColors[mapLevel?.difficult]
let isStart = false
user.currentScore = 0
user.currentLive = mapLevel?.lives

function renderHearts()
{
    liveInfo.querySelector("#live_heart").innerHTML = ''
    for(let i=0; i<user?.currentLive; i++)
    {
        const heart = document.createElement('li')
        heart.classList.add("heart_li")
        heart.innerHTML = `<i class="fa-solid fa-heart"></i>`
        liveInfo.querySelector("#live_heart").append(heart)
    }
}

renderHearts()

function renderBrief(show = false)
{
    briefUI.style.display = show ? 'flex' : 'none'

    briefUI.querySelector('.brief_target').querySelector('p').textContent = levelBrief?.target
    briefUI.querySelector('header').querySelector('h1').innerHTML = `Level ${user?.level}: <span style="color: ${color}; text-shadow: 0 0 5px ${color};">${mapLevel?.title}</span>`

    briefUI.querySelector('button').addEventListener("click", ()=>
    {
        isPaused = false
        isStart = true
        briefUI.style.display = 'none'
    })

    for(const mecha of levelBrief?.mechanics)
    {
        const li = document.createElement('li')
        li.innerHTML = `
                <div class="brief_badge" style="display: ${mecha?.isNew ? 'block' : 'none'}">NEW</div>
                <div class="img_container">
                    <img src="${mecha?.image}" alt="">
                </div>
                <p class="name_block">${mecha?.name}</p>
                <p class="brief_block">${mecha?.description}</p>
        `

        briefUI.querySelector('.brief_mechanics').querySelector('ul').appendChild(li)
    }
}

function beforeStart()
{
    if(!isStart)
    {
        renderInfoBoard()
        isPaused = true

        renderBrief(true)

    }
}

// beforeStart()

function renderInfoBoard()
{
    levelInfo.innerHTML = `Level ${user?.level}: <span style="color: ${color}; text-shadow: 0 0 3px ${color}">${mapLevel?.title}</span>`

    currentScore.querySelector("span").textContent = user?.currentScore
    highestScore.querySelector("span").textContent = user?.highestScore ?? 0
}

window.addEventListener("keydown", (e)=>
{
    BAR.move(e, mapLevel.moveUp)
})

window.addEventListener("keyup", (e)=>
{
    BAR.stop()
})

function togglePauseMenu()
{
    isPaused = !isPaused
    pause_menu.style.display = isPaused ? "block" : "none"
}

window.addEventListener("keydown", (e)=>
{
    if(e.key === 'Escape')
    {
        togglePauseMenu()
        briefUI.style.display = 'none'
    }else if(e.key === ' ' || e.key === 'Enter')
    {
        if(!isStart)
        {
            isPaused = !isPaused
            isStart = true
            renderBrief()
        }
    }else if(e.key === 'h' || e.key === 'H')
    {
        isPaused = !isPaused
        renderBrief(isPaused)
    }
})

pause_menu.querySelector("#resume").addEventListener("click", ()=>
{
    togglePauseMenu()
})


function clearScreen()
{
    ctx.clearRect(0, 0, game.width, game.height)

    const color = "#858AE336"
    const backgroundColor = "#0e071b"
    ctx.fillStyle = backgroundColor
    ctx.strokeStyle = color

    ctx.fillRect(0, 0, game.width, game.height)
    ctx.beginPath()
    for(let y = 0; y < game.height; y++)
    {
        ctx.moveTo(0, y * gameConfig.configs.TILE_SIZE);
        ctx.lineTo(game.width, y * gameConfig.configs.TILE_SIZE);
    }

    for(let x = 0; x < game.width; x++)
    {
        ctx.moveTo(x * gameConfig.configs.TILE_SIZE, 0);
        ctx.lineTo(x * gameConfig.configs.TILE_SIZE, game.height);
    }
    ctx.stroke()

}


function renderDrops()
{
    for(let i=0; i<BRICK.drops.length; i++)
    {
        const drop = BRICK.drops[i]

        drop.update()
        drop.draw(ctx)

        if(drop.destroyed)
        {
            BRICK.drops.splice(i, 1);
        }
    }
}

// const tunnel = mapLevel?.tunnel ? TUNNEL.createTunnel(0, 100, gameConfig.configs.GAME_WIDTH-5, 20*25 - 150 + 100, "#ff7700", "#00f2ff", 5, 150, true) :""

BALL.balls.push(BALL.createBall(BAR.x+BAR.width/2, BAR.y-25))
function renderBalls()
{
    for(let i=0; i<BALL.balls.length; i++)
    {
        const ball = BALL.balls[i]

        ball.update()
        ball.draw(ctx)

        if(ball.destroyed)
        {
            BALL.balls.splice(i, 1)
        }

    }
}

function checkWinConddition()
{
    let cnt = 0
    for(let y = 0; y<BRICK.map.length; y++)
    {
        for(let x = 0; x<BRICK.map[y].length; x++)
        {
            const block = BRICK.map[y][x]
            if(block?.type === BLOCK.BLOCK_TYPES.BRICK1 ||
                block?.type === BLOCK.BLOCK_TYPES.BOMB ||
                block?.type === BLOCK.BLOCK_TYPES.BOMB_SEEDER ||
                block?.type === BLOCK.BLOCK_TYPES.MULTIPLE_BREAK ||
                block?.type === BLOCK.BLOCK_TYPES.MULTIPLE_SEEDER ||
                block?.type === BLOCK.BLOCK_TYPES.BLOCK_EATER
            )
            {
                cnt++;
            }
        }
    }
    return cnt <= 0
}

function handleWin()
{

    if(checkWinConddition())
    {
        const title_mennu = pause_menu.querySelector("#title_menu")
        const resumeBtn = pause_menu.querySelector("#resume")
        const restart = pause_menu.querySelector("#restart")
        restart.style.border = '2px solid var(--c4)'
        restart.style.color = 'var(--c4)'
        restart.addEventListener('mouseenter', ()=>
        {
            restart.style.backgroundColor = 'var(--c4)'
            restart.style.color = 'var(--c6)'
        })
        restart.addEventListener('mouseleave', ()=>
        {
            restart.style.backgroundColor = 'transparent'
            restart.style.color = 'var(--c4)'
        })
        resumeBtn.style.display = "none"
        title_mennu.textContent = 'You Win!'
        togglePauseMenu()
        localStorage.setItem("highest", Math.max(user?.currentScore, user?.highestScore))
    }

}



function handleLoose()
{
    if(BALL.balls.length === 0 && user?.currentLive > 1)
    {
        user.currentLive--;
        BALL.balls.push(BALL.createBall(BAR.x+BAR.width/2, BAR.y-25))
        renderHearts()
    }

    if(BALL.balls.length === 0)
    {
        const title_mennu = pause_menu.querySelector("#title_menu")
        const resumeBtn = pause_menu.querySelector("#resume")
        const restart = pause_menu.querySelector("#restart")
        restart.style.border = '2px solid var(--c4)'
        restart.style.color = 'var(--c4)'
        restart.addEventListener('mouseenter', ()=>
        {
            restart.style.backgroundColor = 'var(--c4)'
            restart.style.color = 'var(--c6)'
        })
        restart.addEventListener('mouseleave', ()=>
        {
            restart.style.backgroundColor = 'transparent'
            restart.style.color = 'var(--c4)'
        })
        resumeBtn.style.display = "none"
        title_mennu.textContent = 'You loose!'
        togglePauseMenu()

        localStorage.setItem("highest", Math.max(user?.currentScore, user?.highestScore))
    }
}


// const black_hole = createBlackHole(350, 350)
// const black_hole2 = createBlackHole(850, 350)

// const black_holes = [black_hole, black_hole2]

// function renderBlackHoles()
// {
//     for(const bh of black_holes)
//     {
//         bh.update()
//         bh.draw(ctx)
//     }
// }

function renderBar()
{
    BAR.update()
    BAR.draw(ctx)
}



const maxMeteorTimeSpawn = 250
let meteorCountDown = maxMeteorTimeSpawn
const spawnRate = 0.25
function spawnMeteor()
{
    if(Math.random() < spawnRate)
    {
        const spawnX = Math.floor(Math.random()*(gameConfig.WALLS.RIGHT - gameConfig.configs.TILE_SIZE*2))+(gameConfig.configs.TILE_SIZE*2)
        const spawnY = mapLevel?.map.length * gameConfig.configs.TILE_SIZE + 10
        TEXT_FLY.text_flies.push(TEXT_FLY.createTextFly(
            spawnX,
            spawnY,
            "⚠️",
            {
                font: "20px Arial bold",
                color: "#fda816",
                align: "center",
                baseLine: "middle",
                lifeTime: 150
            }
        ))
        const meteor = BALL.createBall(spawnX, spawnY, 'meteor')
        setTimeout(()=>
        {
            BALL.balls.push(meteor)
        }, 1000)
    }
}


function createMovingWalls()
{
    const moves = mapLevel?.moving_walls
    if(moves)
    {
        for(const move of moves)
        {
            MOVINGS.movings.push(MOVINGS.createMovingWall(
                move?.x,
                move?.y,
                move?.width,
                move?.height,
                move?.type
            ))
        }
    }
}

createMovingWalls()

function renderMovingWalls()
{
    for(const move of MOVINGS.movings)
    {
        move.update()
        move.draw(ctx)
    }
}


if(mapLevel?.shield)
{
    SHIELD.shield = SHIELD.createShield()
}



// function renderTunnel()
// {
//     if(tunnel)
//     {
//         tunnel.update()
//         tunnel.draw(ctx)
//     }
// }

let filed_timer = 0;
let field_duration = 1000;
let field;

if(mapLevel?.momentum)
{
    field = createMomentumField()
}




function renderParticles()
{
    for(let i = 0; i < particle_manager.particles.length; i++)
    {
        const p = particle_manager.particles[i]
        p.update()
        p.draw(ctx)

        if(p.destroyed)
        {
            particle_manager.particles.splice(i, 1)
        }
    }
}



function renderTextFly()
{
    for(let i=0; i<TEXT_FLY.text_flies.length; i++)
    {
        const t = TEXT_FLY.text_flies[i]
        t.update()
        t.draw(ctx)

        if(t.destroyed)
        {
            TEXT_FLY.text_flies.splice(i, 1)
        }

    }
}

function renderShield()
{
   if(mapLevel?.shield && SHIELD?.shield)
   {
        SHIELD?.shield.update()
        SHIELD?.shield.draw(ctx)
   }
}


function startLoop()
{
    if(!isPaused)
    {

        renderInfoBoard()
        handleWin()
        handleLoose()
        clearScreen()


        if(mapLevel?.momentum && field)
        {
            filed_timer++;
            if(filed_timer >= field_duration)
            {
                field.swap()
                filed_timer = 0
            }
            field.update()
            field.draw(ctx)
        }

        // renderBlackHoles()

        // renderTunnel()



        BRICK.draw(ctx)
        renderDrops()

        renderBalls()

        if(mapLevel?.meteor)
        {
            meteorCountDown--;
            if(meteorCountDown === 0)
            {
                spawnMeteor()
                meteorCountDown = maxMeteorTimeSpawn
            }
        }


        renderBar()

        renderShield()

        renderMovingWalls()






        renderParticles()
        renderTextFly()


    }


    requestAnimationFrame(startLoop)
}

requestAnimationFrame(startLoop)











