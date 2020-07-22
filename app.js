//variable declarations
const attackButton = document.querySelector('.battle-click');
const pokeStarters = document.querySelectorAll('div.pokemon');
const titles = document.querySelector('h2.title-text');
const titles2 = document.querySelector('h3.title-text');
const attackVis = document.querySelector('.attack-vis');
const competitors = document.querySelector('.competitors');
const battleBox = document.querySelector('.battle-box');
const battleButtonFight = document.querySelector('#fight');
const battleButtonRun = document.querySelector('#run');
const movesetHolder = document.createElement('ul');
const readyPlayerOneProfile = document.createElement('div');
const rivalProfile = document.createElement('div');
const userProfilePName = document.createElement('h3');
const userProfileHP = document.createElement('h4');
const rivalProfilePName = document.createElement('h3');
const rivalProfileHP = document.createElement('h4');
const playByPlay = document.createElement('h2');
battleBox.append(playByPlay);
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
            color: 'red',
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
            color: 'blue',
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
            color: 'green',
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
        currentMove: null,
        remove: 'right',
        addPosition: 'left',
        addValue: '15%',

    },
    rival:{
        starterObject: null,
        currentMove: null,
        remove: 'left',
        addPosition: 'right',
        addValue: '15%',
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
            //profiles user
            gameObject.readyPlayerOne.starterElement.appendChild(readyPlayerOneProfile);
            userProfilePName.innerText = `${gameObject.readyPlayerOne.starterObject.name}`;
            userProfileHP.innerText = `hp: ${gameObject.readyPlayerOne.starterObject.hp}`;
            readyPlayerOneProfile.appendChild(userProfilePName);
            readyPlayerOneProfile.appendChild(userProfileHP);
           //profiles rival
           gameObject.rival.starterElement.appendChild(rivalProfile);
            rivalProfilePName.innerText = `${gameObject.rival.starterObject.name}`;
            rivalProfileHP.innerText = `hp: ${gameObject.rival.starterObject.hp}`;
            rivalProfile.appendChild(rivalProfilePName);
            rivalProfile.appendChild(rivalProfileHP);
        },1000 *5)
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
        console.log(Object.keys(gameObject.readyPlayerOne.starterObject.moveset));
        const moveset = Object.keys(gameObject.readyPlayerOne.starterObject.moveset);
        movesetHolder.classList.add('moveset-holder');
        battleBox.appendChild(movesetHolder);
        moveset.forEach(element =>{
            const newLi = document.createElement('li');
            newLi.innerText = element;
            newLi.classList.add('moveset-item');
            newLi.addEventListener('click',actionStart);
            newLi.style.display = 'none',
            movesetHolder.append(newLi);
        })
        this.battleCommence();

    },
    selectBattle(){
        console.log('heard you click Fight!');
        //open moveset box
        //selects move keys ie ['tackle','ember','slash'] for movelist.
        //use for.each to create list items in unordered list
        //flex column
        playByPlay.innerText = '';
        movesetHolder.style.display = 'flex';
        battleButtonRun.style.display = 'none';
        battleButtonFight.style.display = '';
        battleBox.style.justifyContent = 'flex-start';
        // console.log(Object.keys(gameObject.readyPlayerOne.starterObject.moveset));
        // const moveset = Object.keys(gameObject.readyPlayerOne.starterObject.moveset);
        // movesetHolder.classList.add('moveset-holder');
        const movesetItems = document.querySelectorAll('.moveset-item')
        movesetItems.forEach(element =>{
            element.style.display = '';
        })
    },
    rivalTurn(){
        setTimeout(function(){
        const randomMove = Math.floor(Math.random()*3);
        const moveset = Object.keys(gameObject.rival.starterObject.moveset);
        console.log(moveset[randomMove]);
        gameObject.rival.currentMove = moveset[randomMove];
        actionStart();
        }, 1000*6)
    }
}
//end game object
const checkHealth =()=>{
    if(gameObject.turn === 'readyPlayerOne' && gameObject.rival.starterObject.hp > 0){
        console.log(gameObject.turn);
        gameObject.whoseTurn();
        console.log(gameObject.turn);
        gameObject.rivalTurn();
    }else if(gameObject.turn === 'readyPlayerOne' && gameObject.rival.starterObject.hp < 1){
        console.log(gameObject.turn);
        gameObject.whoseTurn();
        console.log(gameObject.turn);
    }else if(gameObject.turn === 'rival' && gameObject.readyPlayerOne.starterObject.hp > 0){
        console.log(gameObject.turn);
        gameObject.whoseTurn();
        console.log(gameObject.turn);
        setTimeout(function(){
        gameObject.selectBattle();
        },1000*7)
    }else if(gameObject.turn === 'rival' && gameObject.rival.starterObject.hp < 1){
        console.log(gameObject.turn);
        gameObject.whoseTurn();
        console.log(gameObject.turn);
    }
}

const actionStart =(event)=>{
    console.log('heard the click for move');
    movesetHolder.style.display = 'none';
    battleButtonFight.style.display = 'none';
    battleBox.style.justifyContent = 'center';
    if(! attackVis.classList.contains('animation')){
        attackVis.classList.add('animation');
        attackVis.style.removeProperty('right');
        attackVis.style.setProperty('left','15%');
        attackVis.style.backgroundColor = gameObject[gameObject.turn].starterObject.color;
    }
    else{
        attackVis.classList.remove('animation');
        attackVis.style.backgroundColor = gameObject[gameObject.turn].starterObject.color;
        // attackVis.style.removeProperty('left');
        // attackVis.style.setProperty('right','15%');
        console.log(gameObject[gameObject.turn].remove);
        attackVis.style.removeProperty(gameObject[gameObject.turn].remove);
        attackVis.style.setProperty(gameObject[gameObject.turn].addPosition,gameObject[gameObject.turn].addValue);
        //add back after delay
        setTimeout(function(){
            attackVis.classList.add('animation');
        },1000 *1);
    }
    if(event){
        playByPlay.innerText = `${gameObject.readyPlayerOne.starterObject.name} used ${event.target.innerText}`;
         //decrement rival hp
        gameObject.rival.starterObject.hp -= gameObject.readyPlayerOne.starterObject.moveset[event.target.innerText].power;
        rivalProfileHP.innerText = `hp: ${gameObject.rival.starterObject.hp}`;
    }
    else{
        (console.log(`no event, it's rivals turn.`))
        playByPlay.innerText = `${gameObject.rival.starterObject.name} used ${gameObject.rival.currentMove}`;
         //decrement rival hp
        gameObject.readyPlayerOne.starterObject.hp -= gameObject.rival.starterObject.moveset[gameObject.rival.currentMove].power;
        userProfileHP.innerText = `hp: ${gameObject.readyPlayerOne.starterObject.hp}`;
    }
   
    checkHealth();
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

battleButtonFight.addEventListener('click',gameObject.selectBattle);
// battleButtonRun.addEventListener('click',selectRun);