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
const movesetHolder = document.createElement('ul');
//game object
const gameObject ={
    turn: 'readyPlayerOne',
    whoseTurn(){
        if(this.turn === 'rival'){
            this.turn = 'readyPlayerOne';
        }else{
            this.turn = 'rival';
        }
    },
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
        starterObject: null,

    },
    rival:{
        starterObject: null,
    },
    battleCommence(){
        setTimeout(function(){
            titles.innerHTML = 'Your Rival wants to battle';
            titles2.innerHTML = '';
            competitors.style.justifyContent = 'space-between';
            gameObject.readyPlayerOne.starterElement.style.order = '-1';
            battleBox.style.display = 'flex';
            battleBox.style.justifyContent = 'flex-start';
            battleButtonRun.style.display = '';
        },1000 *3)
    },
    selection(){
        titles.innerHTML = `You chose ${this.readyPlayerOne.starterObject.name}`;
        const userWeakness = this.starters[this.readyPlayerOne.starterName].weakness;
        console.log(userWeakness);
        for(let i of Object.keys(this.starters)){
            if(this.starters[i].type === userWeakness){
                this.rival.starterObject = this.starters[i];
                this.rival.starterElement = document.querySelector(`.${i}`);
            }
        }
        console.log(this.rival.starterObject);
        this.rival.starterElement.classList.add('selected','rival');
        titles2.innerHTML = `Your Rival chose ${this.rival.starterObject.name}`;
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
        //selects move keys ie ['tackle','ember','slash'] for movelist.
        //use for.each to create list items in unordered list
        //flex column
        battleButtonRun.style.display = 'none';
        battleButtonFight.style.display = '';
        battleBox.style.justifyContent = 'flex-start';
        console.log(Object.keys(gameObject.readyPlayerOne.starterObject.moveset));
        const moveset = Object.keys(gameObject.readyPlayerOne.starterObject.moveset);
        movesetHolder.classList.add('moveset-holder');
        // movesetHolder.style.display = 'flex';
        // movesetHolder.style.flexDirection = 'column';
        battleBox.appendChild(movesetHolder);
        moveset.forEach(element =>{
            const newLi = document.createElement('li');
            newLi.innerText = element;
            newLi.addEventListener('click',actionStart);
            movesetHolder.append(newLi);
        })
    }
}

const actionStart =(event)=>{
    console.log('heard the click');
    movesetHolder.style.display = 'none';
    battleButtonFight.style.display = 'none';
    const newH2 = document.createElement('h2');
    battleBox.style.justifyContent = 'center';
    battleBox.append(newH2);
    if(event){
        newH2.innerText = `${gameObject.readyPlayerOne.starterObject.name} used ${event.target.innerText}`;
    }
    else{
        (console.log(`no event, it's rivals turn.`))
    }
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
    event.target.parentNode.classList.add('selected','readyPlayerOne');
    pokeStarters.forEach(element=>{
        element.removeEventListener('click',selectStarter);
    })
    for(let i of Object.keys(gameObject.starters)){
        if(gameObject.starters[i].name === id){
            gameObject.readyPlayerOne.starterObject = gameObject.starters[i];
            console.log(gameObject.readyPlayerOne.starterObject);
        }
    }
    gameObject.selection();
}
//event listeners
pokeStarters.forEach(element=>{
    element.addEventListener('click',selectStarter);
})
//this event listener will be reassigned to each move li
// attackButton.addEventListener('click', actionStart);

battleButtonFight.addEventListener('click',gameObject.selectBattle);
// battleButtonRun.addEventListener('click',selectRun);