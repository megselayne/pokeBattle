//variable declarations for DOM manipulation
const runButton = document.querySelector('.battle-run');
const pokeStarters = document.querySelectorAll('div.pokemon');
const readyPlayerOneStarter = document.querySelector('#starter');
const rivalStarter = document.querySelector('#rival');
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
const userProfileLevel = document.createElement('h4');
const userProfileHP = document.createElement('h4');
const rivalProfilePName = document.createElement('h3');
const rivalProfileLevel = document.createElement('h4');
const rivalProfileHP = document.createElement('h4');
const playByPlay = document.createElement('h3');
const replayButtonYes = document.querySelector('.yes');
const replayButtonNo = document.querySelector('.no');
const replayButtons = document.querySelector('.replay-buttons');
const homeButtons = document.querySelector('.home-buttons');
const replayRival = document.querySelector('.rival');
const replayTrainers = document.querySelector('.trainers');
const newGame = document.querySelector('.reset');
const score = document.querySelector('.score-target');
let readyPlayerOneWins = 0;
//Pokedex and object creators via class
class Pokemon {
    constructor(name,type,weakness,color,image,moveset) {
            this.name = name;
            this.type = type;
            this.weakness = weakness;
            this.hp = 25;
            this.maxHp = 25;
            this.level = 5;
            this.baseLevel = 5;
            this.basePrevLevelExp = 20;
            this.prevLevelExp = 20;
            this.baseExp = 1;
            this.exp= 1;
            this.color = color;
            this.image = image;
            this.moveset = moveset;
    }        

}
const pokedex = [['squirtle','water','grass','blue','./assets/squirtle.png', {
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
},],
['bulbasaur','grass','fire','green','./assets/bulbasaur.png', {
    tackle:{
        name: 'tackle',
        power: 5,
    },
    vineWhip:{
        name: 'vine whip',
        power: 5,
    },
    razorLeaf:{
        name: 'razor leaf',
        power: 6,
    }
},],
['charmander','fire','water','red','./assets/charmander.png',{
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
},]
]
let readyPlayerOneDex = {};
let rivalDex = {};

pokedex.forEach(element =>{
    rivalDex[element[0]] = new Pokemon(element[0],element[1],element[2],element[3],element[4],element[5]);
    readyPlayerOneDex[element[0]] = new Pokemon(element[0],element[1],element[2],element[3],element[4],element[5]);
})

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
    trainers: ['Youngster Billy','Ace Trainer Lucy','Scientist Ned'],
    readyPlayerOne:{
        starterObject: null,
        currentMove: null,
        remove: 'right',
        addPosition: 'left',
        addValue: '15%',

    },
    rival:{
        rivalName: 'Your Rival',
        starterObject: null,
        currentMove: null,
        remove: 'left',
        addPosition: 'right',
        addValue: '15%',
    },
    resetBattleBox(){
        //All the DOM manipulation to re-show controls and data in competitor div
        homeButtons.style.display = 'none';
        replayButtons.style.display = 'none';
        titles2.innerHTML = '';
        rivalStarter.display = 'block';
        readyPlayerOneStarter.display = 'block';
        competitors.style.justifyContent = 'space-between';
        gameObject.readyPlayerOne.starterElement.style.order = '-1';
        battleBox.style.display = 'flex';
        battleBox.style.justifyContent = 'flex-start';
        playByPlay.innerText = '';
        battleButtonFight.style.display = '';
        battleButtonRun.style.display = '';
        //profiles user
        gameObject.readyPlayerOne.starterElement.style.display = '';
        readyPlayerOneProfile.style.display = '';
        userProfilePName.innerText = `${gameObject.readyPlayerOne.starterObject.name}`;
        userProfileLevel.innerText =  `level: ${gameObject.readyPlayerOne.starterObject.level}`;
        userProfileHP.innerText = `hp: ${gameObject.readyPlayerOne.starterObject.hp}`;
        //profiles rival
        gameObject.rival.starterElement.style.display = '';
        rivalProfile.style.display = 'block';
        rivalProfilePName.innerText = `${gameObject.rival.starterObject.name}`;
        rivalProfileLevel.innerText =  `level: ${gameObject.rival.starterObject.level}`;
        rivalProfileHP.innerText = `hp: ${gameObject.rival.starterObject.hp}`;
    },
    battleCommence(){
        setTimeout(function(){
            gameObject.resetBattleBox();
            titles.innerHTML = `${gameObject.rival.rivalName} wants to battle`;

        },1000 *4)
    },
    rivalSelection(){
        const userWeakness = rivalDex[this.readyPlayerOne.starterName].weakness;
        console.log(userWeakness);
        for(let i of Object.keys(rivalDex)){
            if(rivalDex[i].type === userWeakness){
                this.rival.starterObject = rivalDex[i];
                this.rival.starterElement = rivalStarter;
                document.querySelector('img#rival').setAttribute('src', this.rival.starterObject.image);
            }
        }
    },
    selection(){
        titles.innerHTML = `You chose ${this.readyPlayerOne.starterObject.name}`;

        this.rivalSelection();

        console.log(this.rival.starterObject);
        this.rival.starterElement.classList.add('selected','rival');
        titles2.innerHTML = `Your Rival chose ${this.rival.starterObject.name}`;
        pokeStarters.forEach(element =>{
           if(element.classList.contains('disappear')){
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
        battleBox.append(playByPlay);
        gameObject.readyPlayerOne.starterElement.appendChild(readyPlayerOneProfile);
        readyPlayerOneProfile.appendChild(userProfilePName);
        readyPlayerOneProfile.appendChild(userProfileLevel);
        readyPlayerOneProfile.appendChild(userProfileHP);
        gameObject.rival.starterElement.appendChild(rivalProfile);
        rivalProfile.appendChild(rivalProfilePName);
        rivalProfile.appendChild(rivalProfileLevel);
        rivalProfile.appendChild(rivalProfileHP);

        this.battleCommence();

    },
    selectBattle(){
        console.log('heard you click Fight!');
        playByPlay.innerText = '';
        movesetHolder.style.display = 'flex';
        battleButtonRun.style.display = 'none';
        battleButtonFight.style.display = '';
        battleBox.style.justifyContent = 'flex-start';
        const movesetItems = document.querySelectorAll('.moveset-item')
        movesetItems.forEach(element =>{
            element.style.display = '';
        })
    },
    rivalTurn(){
        setTimeout(function(){
        const randomMove = Math.floor(Math.random()*3);
        const moveset = Object.keys(gameObject.rival.starterObject.moveset);
        console.log(moveset);
        console.log(moveset[randomMove]);
        gameObject.rival.currentMove = moveset[randomMove];
        actionStart();
        }, 1000*8)
    },
    levelUpAnimation(){
        if(! userProfileLevel.classList.contains('animate__animated')){
            userProfileLevel.classList.add('animate__animated','animate__delay-3s','animate__bounce');
        }
        else{
            userProfileLevel.classList.remove('animate__animated','animate__delay-3s','animate__bounce');
    
            setTimeout(function(){
                userProfileLevel.classList.add('animate__animated','animate__delay-3s','animate__bounce');
            },1000 *1);
        }

    },
    expGain(){
        console.log(`gaining some exp!`);
        this.readyPlayerOne.starterObject.exp += Math.round(this.rival.starterObject.prevLevelExp /3);
        console.log(this.readyPlayerOne.starterObject.exp);
        titles.innerText = `${this.readyPlayerOne.starterObject.name} gained ${Math.round(this.rival.starterObject.prevLevelExp /3)} exp!`;
        setTimeout(function(){
            gameObject.expCheck();
        },1000*5)
    },
    expCheck(){
        if(this.readyPlayerOne.starterObject.exp >= Math.round(this.readyPlayerOne.starterObject.prevLevelExp*1.2)){
            console.log(`time to level up!`);
            this.readyPlayerOne.starterObject.level ++;
            console.log(this.readyPlayerOne.starterObject.level);
            this.readyPlayerOne.starterObject.prevLevelExp = Math.round(this.readyPlayerOne.starterObject.prevLevelExp*1.2);
            console.log(this.readyPlayerOne.starterObject.prevLevelExp);
            titles.innerText = `${this.readyPlayerOne.starterObject.name} grew to level ${this.readyPlayerOne.starterObject.level}!`;
            userProfileLevel.innerText = `level: ${this.readyPlayerOne.starterObject.level}`;
            this.levelUpAnimation();
        }else{
            console.log(`not time to level up yet`);
        }
        setTimeout(function(){
            gameObject.replaySequence();
        },1000*6)
    },
    replaySequence(){
        titles.innerText = 'Ready to keep battling?';
        replayButtons.style.display = 'flex';
        // console.log(this.starters[this.readyPlayerOne.starterObject.name].hp);
    },
    setScore(){
        if(localStorage.getItem('scoreKeeper')){
          readyPlayerOneWins = localStorage.getItem('scoreKeeper');
        }else{
            readyPlayerOneWins = 0;
        }
        score.innerHTML = readyPlayerOneWins;
        //set up html element for score tracker
      },
    lossCondition(winner){
        setTimeout(function(){
        if(winner === 'readyPlayerOne'){
            gameObject.rival.starterElement.style.display = 'none';
            rivalProfile.style.display = 'none';
            readyPlayerOneWins = parseInt(score.innerHTML) + 1;
            localStorage.setItem('scoreKeeper',readyPlayerOneWins);
            console.log(localStorage.getItem('scoreKeeper'));
            console.log(readyPlayerOneWins);
            score.innerHTML = readyPlayerOneWins;
            playByPlay.innerText = '';
            titles.innerText = `Rival ${gameObject.rival.starterObject.name} fainted! Rival blacked out! You win!`
        }else{
            gameObject.readyPlayerOne.starterElement.style.display = 'none';
            readyPlayerOneProfile.style.display = 'none';
            playByPlay.innerText = '';
            titles.innerText = `Your ${gameObject.readyPlayerOne.starterObject.name} fainted! You blacked out! You loose!`
        }
        },1000*6)
        setTimeout(function(){
            gameObject.expGain();
        },1000*10)
    },
    rivalGenerator(){
        setTimeout(function(){
            const rivalIndex = Math.floor(Math.random()* gameObject.trainers.length);
            gameObject.rival.rivalName = gameObject.trainers[rivalIndex];
            const starters = Object.keys(rivalDex);
            const id = starters[rivalIndex];
            for(let i of starters){
                if(rivalDex[i].name === id){
                    gameObject.rival.starterObject = rivalDex[i];
                    rivalStarter.childNodes[1].setAttribute('src',gameObject.rival.starterObject.image);
                    gameObject.rival.starterObject.hp = gameObject.rival.starterObject.maxHp;
                    gameObject.readyPlayerOne.starterObject.hp = gameObject.readyPlayerOne.starterObject.maxHp;
                    console.log(gameObject.rival.starterObject);
                }
            }
            gameObject.battleCommence();
            }, 1000*2)
    },
    replayRival(){
        gameObject.rival.rivalName = 'Your Rival';
        gameObject.rivalSelection();
        gameObject.rival.starterObject.hp = gameObject.rival.starterObject.maxHp;
        gameObject.readyPlayerOne.starterObject.hp = gameObject.readyPlayerOne.starterObject.maxHp;
        gameObject.battleCommence();
    },
    home(){
        replayButtons.style.display = 'none';
        readyPlayerOneProfile.style.display = 'none';
        rivalProfile.style.display = 'none';
        battleBox.style.display = 'none';
        homeButtons.style.display = 'flex';
        gameObject.rival.starterObject.hp = gameObject.rival.starterObject.maxHp;
        gameObject.readyPlayerOne.starterObject.hp = gameObject.readyPlayerOne.starterObject.maxHp;
        competitors.style.justifyContent = 'center';
        titles.innerText = `Who do you want to battle?`;
    }

}
//end game object
const checkHealth =()=>{
    if(gameObject.turn === 'readyPlayerOne' && gameObject.rival.starterObject.hp > 0){
        gameObject.whoseTurn();
        gameObject.rivalTurn();
    }else if(gameObject.turn === 'readyPlayerOne' && gameObject.rival.starterObject.hp < 1){
        gameObject.lossCondition(gameObject.turn);
    }else if(gameObject.turn === 'rival' && gameObject.readyPlayerOne.starterObject.hp > 0){
        gameObject.whoseTurn();
        setTimeout(function(){
        gameObject.battleCommence();
        },1000*5)
    }else if(gameObject.turn === 'rival' && gameObject.readyPlayerOne.starterObject.hp < 1){
        gameObject.lossCondition(gameObject.turn);
    }
}

const hpAnimations = (user)=>{
    if(! user.classList.contains('animate__animated')){
        user.classList.add('animate__animated','animate__delay-4s','animate__bounce');
    }
    else{
        user.classList.remove('animate__animated','animate__delay-4s','animate__bounce');

        setTimeout(function(){
            user.classList.add('animate__animated','animate__delay-4s','animate__bounce');
        },1000 *1);
    }
}

const pokeAnimations = (user)=>{
    if(! user.classList.contains('animate__animated')){
        user.classList.add('animate__animated','animate__delay-3s','animate__shakeX');
    }
    else{
        user.classList.remove('animate__animated','animate__delay-3s','animate__shakeX');

        setTimeout(function(){
            user.classList.add('animate__animated','animate__delay-3s','animate__shakeX');
        },1000 *1);
    }
}

const actionStart =(event)=>{
    console.log('heard the click for move');
    movesetHolder.style.display = 'none';
    battleButtonFight.style.display = 'none';
    battleBox.style.justifyContent = 'center';
    if(! attackVis.classList.contains('animation')){
        attackVis.classList.add('animation');
        attackVis.style.backgroundColor = gameObject[gameObject.turn].starterObject.color;
        attackVis.style.removeProperty('right');
        attackVis.style.setProperty('left','15%');
    }
    else{
        attackVis.classList.remove('animation');
        attackVis.style.backgroundColor = gameObject[gameObject.turn].starterObject.color;
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
        pokeAnimations(rivalStarter);
        hpAnimations(rivalProfileHP);
    }
    else{
        (console.log(`no event, it's rivals turn.`))
        playByPlay.innerText = `${gameObject.rival.starterObject.name} used ${gameObject.rival.currentMove}`;
         //decrement rival hp
        gameObject.readyPlayerOne.starterObject.hp -= gameObject.rival.starterObject.moveset[gameObject.rival.currentMove].power;
        // userProfileHP.classList.add('animate__animated','animate__delay-4s','animate__bounce');
        setTimeout(function(){
            userProfileHP.innerText = `hp: ${gameObject.readyPlayerOne.starterObject.hp}`;
            pokeAnimations(readyPlayerOneStarter);
            hpAnimations(userProfileHP);
        },1000 *.5);
    }
   
    checkHealth();
};

const selectStarter = (event)=>{
    console.log('pokemon selected!')
    const id = event.target.getAttribute('class');
    gameObject.readyPlayerOne.starterName = event.target.getAttribute('class');
    gameObject.readyPlayerOne.starterElement = document.querySelector('#starter');
    pokeStarters.forEach(element=>{
        element.removeEventListener('click',selectStarter);
    })
    for(let i of Object.keys(readyPlayerOneDex)){
        if(readyPlayerOneDex[i].name === id){
            gameObject.readyPlayerOne.starterObject = readyPlayerOneDex[i];
            console.log(gameObject.readyPlayerOne.starterObject);
        }
    }
    readyPlayerOneStarter.childNodes[1].setAttribute('src',gameObject.readyPlayerOne.starterObject.image);
    gameObject.selection();
}
//reload
const reload = ()=>{
    const promptResponse = prompt('Are you sure you want to overwrite the file? You will lose all game data!','yes,no');
    if(promptResponse === 'yes'){
        localStorage.removeItem('scoreKeeper');
        location.reload();
    }
}

//event listeners
pokeStarters.forEach(element=>{
    element.addEventListener('click',selectStarter);
})
battleButtonFight.addEventListener('click',gameObject.selectBattle);
battleButtonRun.addEventListener('click',gameObject.home);
replayButtonYes.addEventListener('click', gameObject.rivalGenerator);
replayButtonNo.addEventListener('click',gameObject.home);
newGame.addEventListener('click',reload);
replayTrainers.addEventListener('click',gameObject.rivalGenerator);
replayRival.addEventListener('click',gameObject.replayRival);
window.addEventListener('load',gameObject.setScore);