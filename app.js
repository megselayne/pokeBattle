//variable declarations
const attackButton = document.querySelector('.battle-click');
const battleVis = document.querySelector('.attack-vis');
const pokeStarters = document.querySelectorAll('.poke');
const titles = document.querySelector('h2.title-text');
const titles2 = document.querySelector('h3.title-text');
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
            hp: 25,
            moveset:{
                tackle:{
                    name: 'tackle',
                    power: 5,
                },
                ember:{
                    name: 'ember',
                    power: 4,
                },
                slash:{
                    name: 'slash',
                    power: 6,
                },
            }
        },

        squirtle:{
            name: 'squirtle',
            type: 'water',
            weakness: 'grass',
            hp: 25,
            moveset:{
                tackle:{
                    name: 'tackle',
                    power: 5,
                },
                bubble:{
                    name: 'bubble',
                    power: 4,
                },
                bite:{
                    name: 'bubble',
                    power: 6,
                },
            }
        },
        bulbasaur:{
            name: 'bulbasaur',
            type: 'grass',
            weakness: 'fire',
            hp: 25,
            moveset:{
                tackle:{
                    name: 'tackle',
                    power: 5,
                },
                wineWhip:{
                    name: 'vine whip',
                    power: 5,
                },
                razorLeaf:{
                    name: 'razor leaf',
                    power: 6,
                }
            }
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
        const userWeakness = this.starters[this.readyPlayerOne.starterName].weakness;
        console.log(userWeakness);
        for(let i of Object.keys(this.starters)){
            if(this.starters[i].type === userWeakness){
                this.rival.starterName = this.starters[i].name;
                this.rival.starterElement = this.starters[i];
            }
        }
        console.log(this.rival.starterName);
        titles2.innerHTML = `Your Rival chose ${this.rival.starterName}`;
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