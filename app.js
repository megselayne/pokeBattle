//variable declarations
const attackButton = document.querySelector('.battle-click');
const battleVis = document.querySelector('.attack-vis');
const pokeStarters = document.querySelectorAll('.poke');
const titles = document.querySelector('h2.title-text');
const attackVis = document.querySelector('.attack-vis');

const userPlayer={
    starter: null,
    selection(){
        titles.innerHTML = `You chose ${this.starter.getAttribute('id')}`;
    },
}
const actionStart =()=>{
    console.log('heard the click');
    if(! attackVis.classList.contains('animation')){
        console.log('knows it does not contain');
        attackVis.classList.add('animation');
    }
    else{
        attackVis.classList.remove('animation');
        //add back after delay
        setTimeout(function(){
            attackVis.classList.add('animation');
        },1000 *3);
    }
    
};

const selectStarter = (event)=>{
    console.log('pokemon selected!')
    userPlayer.starter = event.target;
    userPlayer.selection();
}
//event listeners
pokeStarters.forEach(element=>{
    element.addEventListener('click',selectStarter);
})
attackButton.addEventListener('click', actionStart);