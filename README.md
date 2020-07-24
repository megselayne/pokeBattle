# pokeBattle
## What is pokeBattle?

- A simple battle based 1 player game.
- User selects starter pokemon.
- User enters battle with automated Rival.
- User or rival wins when opposing pokemon hp is less than 1.
- After running from or defeating Rival, user can continue to battle other Trainers in the pokeBattle-verse.

## Technologies Used
- Vanilla JS,HTML, CSS and animate.style for a few bounce effects.

## Approach
- pokeBattle is operated in a single screen with heavy DOM manipulation to hide and show user controls.
- The majority of data storage and functionality is written into  a `gameObject`.
- User input is achieved through event click listeners, which propel the game forward.
- While waiting for user input, no game functions are invoked. Game play continues based on call functions passed through click events.

## User Requirements
- User can select pokemon starter from three pokemon on screen
- Upon click, user will be notified that they've selected that pokemon
- User will be notified that their Rival has gotten a pokemon as well that is user's type weakness
- Title will display: Your rival wants to battle!
- Unchosen starter pokemon disappears. Selected pokemon move to opposite sides of the screen.
- Pokemon profile stat trackers appear below images
- User can select from 2 buttons: to Fight or Run
  -If user selects to run, they will return to main screen with options: battle rival, trainers, or new game.
  -If user selects fight
    - User can select pokemon move from list of moves
    - Upon selection, hide battle buttons and list
    - Title displays in battleBox what move user selected
    - rival pokemon position "shakes" in response to user attack
    - rival pokemon HP goes down
    - if rival has >=1 hp, battle continues!
- Title displays in battleBox: rival pokemonName used pokemonMove
- user pokemon position "shakes" left to right
- user pokemon HP goes down
- if user has >=1 hp, pattern repeats till someone has less than 1 hp.
- When someone has less than 1 hp:
  - Title will display who won.
  - Losing pokeon and stats will disappear from screen.
  - If user won, battles won stat will go up by one.
  - User will have the option to keep battling or return to the home screen.
## Wireframes:
- https://github.com/megselayne/pokeBattle/tree/master/wireframes

## Instructions for Use
- Deployed game: https://megselayne.github.io/pokeBattle/
- Select your pokemon
- Choose to fight or run
- If fight:
  - choose a move
  - wait for your rival to attack you
  - if you survive, go back to fight or run!
- If run
  - Choose to battle rival, other trainers, or start a new game
