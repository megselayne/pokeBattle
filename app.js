//variable declarations
const attackButton = document.querySelector('.battle-click');
const battleVis = document.querySelector('.attack-vis');
const pokeStarters = document.querySelectorAll('.poke');

const userPlayer={
    starter: null,
}
const actionStart = function(){
    console.log('heard the click');
    battleVis.style.display = 'inline-block';
    battleVis.style.animation = 'attack-s 4s';
};

const selectStarter = (event)=>{
    console.log('pokemon selected!')
    userPlayer.starter = event.target;
}
//event listeners
pokeStarters.forEach(element=>{
    element.addEventListener('click',selectStarter);
})
attackButton.addEventListener('click', actionStart);