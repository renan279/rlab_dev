const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const clouds = document.querySelector('.clouds');
const background = document.querySelector('.background');
const ground = document.querySelector('.ground');

const countHp = document.querySelector('.count-hp');
let hp = +document.querySelector('.count-hp').innerHTML;

const countScore = document.querySelector('.count-score');
let score = +document.querySelector('.count-score').innerHTML;



const jump = () => {
  mario.classList.add('jump');
  setTimeout(() => { mario.classList.remove('jump'); }, 500);
}

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  const cloudsPosition = +window.getComputedStyle(clouds).right.replace('px', '');
  const backgroundPosition = +window.getComputedStyle(background).left.replace('px', '');
  const groundPosition = +window.getComputedStyle(ground).left.replace('px', '');

  console.log(pipePosition);

  if (pipePosition <= 120 && marioPosition >= 179) {
    score++;
    countScore.innerHTML = score;
  }

  if (pipePosition <= 120 && marioPosition <= 80 && pipePosition > 0) {

    if (hp > 0) {
      if (pipePosition >= 110 ) {
        hp = hp - 1;
        countHp.innerHTML = hp;
      }
    } else {
      pipe.style.animation = 'none';
      pipe.style.left = `${pipePosition}px`;
      mario.style.animation = 'none';
      mario.style.bottom = `${marioPosition}px`;
      mario.src = './assets/img/game-over.png'
      mario.style.width = '75px';
      mario.style.marginLeft = '50px';

      clouds.style.animation = 'none';
      clouds.style.right = `${cloudsPosition}px`;
      background.style.animation = 'none';
      background.style.left = `${backgroundPosition}px`;
      ground.style.animation = 'none';
      ground.style.left = `${groundPosition}px`;

      clearInterval(loop);
    }

  }

}, 15)

document.addEventListener('keydown', jump);