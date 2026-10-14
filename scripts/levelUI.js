
import MAPS from './map_level.js'
import user from './user_info.js'

const level_container = document.querySelector(".level_container")
const level_template = document.getElementById("level_box_template")

const level_count = Object.keys(MAPS).length;

const difficultyColors = {
  "Easy": '#00FF66',
  "Medium": '#00f0ff',
  "Hard": '#FFEA00',
  "Expert": '#FF5F1F',
  "Nightmare": '#FF00AA',
  "Demon": '#9D00FF'
};



for(let i=0; i<level_count; i++)
{
    const level_box = level_template.content.cloneNode(true)
    const box = level_box.querySelector(".level_box")

    const currentLevel = i+1
    const level = MAPS[`level${currentLevel}`]
    const color = difficultyColors[level.difficult]



    box.addEventListener("mouseenter", ()=>
    {
        box.style.border = `1px solid ${color}`
        box.style.boxShadow = `0 0 8px 1px ${color}`
    })
    box.addEventListener("mouseleave", ()=>
    {
        box.style.border = `1px solid #c4c4c427`
        box.style.boxShadow = 'none'
    })


    level_box.querySelector('.level_title').style.background = color ?? '#d1d1d1'
    level_box.querySelector('.level_title').style.backgroundClip = 'text'
    level_box.querySelector('.level_title').style.color = 'transparent'


    level_box.querySelector('.level_number').textContent = currentLevel < 10 ? `0${currentLevel}`:currentLevel;
    level_box.querySelector('.level_title').textContent = level.title
    level_box.querySelector('.difficult_type').textContent = `${level.difficult}`
    level_box.querySelector('.difficult_type').style.color = `${color}`
    level_box.querySelector('.completed_badge').textContent = level.completed ? "Completed" : "Incomplete"

    level_box.querySelector('.completed_badge').classList.toggle("active", Boolean(level.completed))
    const playBtn = level_box.querySelector(".play_level")

    playBtn.addEventListener("click", ()=>
    {
        user.level = currentLevel
        localStorage.setItem("level", user.level)
        window.location.href = '../game.html'
    })

    level_container.appendChild(level_box)
}






