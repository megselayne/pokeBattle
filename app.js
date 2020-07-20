//variable declarations
const attackButton = document.querySelector('.battle-click');
const battleVis = document.querySelector('.attack-vis');
const pokeStarters = document.querySelectorAll('.poke');
const titles = document.querySelector('h2.title-text');
const attackVis = document.querySelector('.attack-vis');

const gameObject ={
    types: {
        grass:{
            weakness: 'fire',
        },
        fire:{
            weakness: 'water',
        },
        water:{
            weakness: 'grass',
        }
    },
    starters:{
        charmander:{
            name: 'charmander',
            type: 'fire',
            weakness: 'water',
        },
        squirtle:{
            name: 'squirtle',
            type: 'water',
            weakness: 'grass',
        },
        bulbasaur:{
            name: 'bulbasaur',
            type: 'grass',
            weakness: 'fire',
        }
    },
    readyPlayerOne:{
        starterName: null,
        starterElement: null,

    },
    rival:{
        starterName: null,
        starterElement: null,
    },
    selection(){
        titles.innerHTML = `You chose ${this.readyPlayerOne.starterName}`;
        console.log(this.starters[this.readyPlayerOne.starterName].weakness);
        const userWeakness = this.starters[this.readyPlayerOne.starterName].weakness;
        console.log()
    }
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
        },1000 *1);
    }
    
};

const selectStarter = (event)=>{
    console.log('pokemon selected!')
    gameObject.readyPlayerOne.starterName = event.target.getAttribute('id');
    gameObject.readyPlayerOne.starterElement = event.target;
    pokeStarters.forEach(element=>{
        element.removeEventListener('click',selectStarter);
    })
    gameObject.selection();
}
//event listeners
pokeStarters.forEach(element=>{
    element.addEventListener('click',selectStarter);
})
attackButton.addEventListener('click', actionStart);