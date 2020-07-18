const attackButton = document.querySelector('.battle-click');
const battleVis = document.querySelector('.attack-vis');
const actionStart = function(){
    console.log('heard the click');
    battleVis.style.display = 'inline-block';
    battleVis.style.animation = 'attack-s 4s';
};

attackButton.addEventListener('click', actionStart);