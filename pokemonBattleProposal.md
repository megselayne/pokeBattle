*** Megan Lee / 06/18/20 ***

# Pokemon Battle Proposal

## What is Pokemon Battle?

- A simple battle based 1 player game.
- User selects starter pokemon.
- User enters battle with automated Rival.
- User or rival wins when opposing pokemon hp is less than 1.

## Wireframe

(Your wireframes go here. Preferably two or more)

## Initial thoughts on game structure

(Write out what challenges you expect to encounter, or ideas you want to come up with)

## Phases of Completion

(The steps or phases you expect to go through, and the tasks that you'll need to accomplish to reach each step. These should resemble the acceptance criteria we were working through earlier.)
- Select Starter
    - User can select pokemon starter from three pokemon on screen
    - Upon click, user will be notified that they've selected that pokemon
    - User will be notified that their Rival has gotten a pokemon as well
- Battle Commences
    - Title will display: Your rival wants to battle!
    - User can select from 2 buttons: to Battle or Run
    - if user selects to run, they will return to main screen with option to "rebattle rival" with same starters
- Select Battle
    - User can select pokemon move from some kind of dropdown, div with buttons tbd
    - Upon selection, hide battle buttons and move list
    - Title displays in battleBox what move user selected
    - rival pokemon position "shakes" in response to user attack
    - rival pokemon HP goes down
    - if rival has more than 0 hp, battle continues!
- Rival Turn
    - Title displays in battleBox: rival pokemonName used pokemonMove
    - user pokemon position "shakes" left to right
    - user pokemon HP goes down
    - if user has more than 0 hp, battle continues!
- Repeat Battle Commences > Rival Turn
    - game cyles back through to select battle or run through to rival turn until someone faints
- Win/loss Condition
    - if rival lost
        - Title displays in battleBox: Rival pokemonName fainted! Rival blacked out!
        - rival pokemon and stats disappear from screen
        - return to main screen with option to re-play rival
    - if user lost
        - Title displays in battleBox: User pokemonName fainted! You blacked out!
        - user pokemon, user stats disappear
        - return to main screen with option to re-play rival

## Links and Resources

(Anything you've looked up so far or are thinking about using.)
- Technical spec (in-progress):
- Select Starter
    - 3 pokemon images centered on page in flex container
    - object for each starter pokemon (created by a class?!)
        - name, moveset array or object, hp, level, experience
    - click event listener on each of 3 pokemon images    
    - function for click: add to dom: you you chose pokemonName; Your rival gets pokemonName
- Battle Commences
    - h1 added to DOM: Your rival wants to battle!
    - event listeners on 2 buttons
    - Battle div appears with 2 buttons: Battle, Run
    - event listener function: if battle go to Select Battle, else Replay Rival
- Select Battle
    - Some kind of container with move options appears (dropdown, div with buttons tbd)
    - event listeners on move options
    - functions for move options: 
        - hide battle buttons and move lists
        - h1 innertext set in battleBox: Your pokemonName used pokemonMove
        - rival pokemon position "shakes" with left/right changes (keyframe)
        - rival pokemon HP is decremented
        - function to check if anyone lost (hp < 1)
            - if no, continue back to battle commences   
- Rival Turn
    - function for rival turn
        - math.floor math.random selects rival pokemon move from pokemon moveset
        - h1 innertext set in battleBox: rival pokemonName used pokemonMove
        - rival pokemon position "shakes" with left/right changes (keyframe)
        - rival pokemon HP is decremented
        - function to check if anyone lost (hp < 1)
            - if no, continue back to battle commences 
- Repeat Battle Commences > Rival Turn
    - game cyles back through to select battle or run through to rival turn until someone faints
- Win/loss Condition
    - function to check if anyone lost (hp < 1)    
        - if yes: user or rival
            - if rival lost
                - h1 innertext in battleBox: Rival pokemonName fainted! Rival blacked out!
                - rival pokemon, rival header display set to none
                - send to winFunction()
            - if user lost
                - h1 innertext in battleBox: User pokemonName fainted! You blacked out!
                - user pokemon, user header display set to none
                - send to replayRivalLossFunction()