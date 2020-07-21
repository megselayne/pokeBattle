//variable declarations
const attackButton = document.querySelector('.battle-click');
const battleVis = document.querySelector('.attack-vis');
const pokeStarters = document.querySelectorAll('div.pokemon');
const titles = document.querySelector('h2.title-text');
const titles2 = document.querySelector('h3.title-text');
const attackVis = document.querySelector('.attack-vis');
const competitors = document.querySelector('.competitors');
const battleBox = document.querySelector('.battle-box');
const battleButtonFight = document.querySelector('#fight');
const battleButtonRun = document.querySelector('#run');
//game object
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
    battleCommence(){
        setTimeout(function(){
            titles.innerHTML = 'Your Rival wants to battle';
            titles2.innerHTML = '';
            competitors.style.justifyContent = 'space-between';
            gameObject.readyPlayerOne.starterElement.style.order = '-1';
            battleBox.style.display = 'flex';
        },1000 *3)
    },
    selection(){
        titles.innerHTML = `You chose ${this.readyPlayerOne.starterName}`;
        const userWeakness = this.starters[this.readyPlayerOne.starterName].weakness;
        console.log(userWeakness);
        for(let i of Object.keys(this.starters)){
            if(this.starters[i].type === userWeakness){
                this.rival.starterName = this.starters[i].name;
                this.rival.starterElement = document.querySelector(`.${i}`);
            }
        }
        console.log(this.rival.starterName);
        for(let i of Object.keys(this.starters)){
            if(this.starters[i].name === this.rival.starterName){
                this.rival.moveset = this.starters[i].moveset;
                console.log(this.rival.moveset);
            }
        }
        this.rival.starterElement.classList.add('selected');
        titles2.innerHTML = `Your Rival chose ${this.rival.starterName}`;
        pokeStarters.forEach(element =>{
           if(!element.classList.contains('selected')){
               element.style.display = 'none';
           }
        })
        this.battleCommence();

    },
    selectBattle(){
        console.log('heard you click Fight!');
        //open moveset box
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
    const id = event.target.getAttribute('id');
    gameObject.readyPlayerOne.starterName = event.target.getAttribute('id');
    gameObject.readyPlayerOne.starterElement = event.target.parentNode;
    event.target.parentNode.classList.add('selected');
    pokeStarters.forEach(element=>{
        element.removeEventListener('click',selectStarter);
    })
    for(let i of Object.keys(gameObject.starters)){
        if(gameObject.starters[i].name === id){
            gameObject.readyPlayerOne.moveset = gameObject.starters[i].moveset;
            console.log(gameObject.readyPlayerOne.moveset);
        }
    }
    gameObject.selection();
}
//event listeners
pokeStarters.forEach(element=>{
    element.addEventListener('click',selectStarter);
})
attackButton.addEventListener('click', actionStart);

battleButtonFight.addEventListener('click',gameObject.selectBattle);
// battleButtonRun.addEventListener('click',selectRun);