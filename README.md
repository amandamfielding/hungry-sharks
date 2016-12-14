# Hungry Sharks

[Hungry Sharks Live](https://amandamfielding.github.io/hungry-sharks/)

Hungry Sharks is a brain game designed to increase the users divided attention, or ability to multitask. Identical sharks swim around the screen in a random manner and are fed by clicking on them. Each shark must be fed only once to move on the next level. In order to be successful, the user must stayed focused on which sharks they have already fed and which ones they have not. If they click on the same shark twice, the round is lost. With each level, another shark is added. The fist level has three, the second has four, and so on.

![gif of game](docs/wireframes/hs.gif)

## Features & Implementation

`Vanilla JavaScript` for structure and game logic.
`HTML5 Canvas` for DOM manipulation and rendering.

###Game

When the DOM content is loaded, a new GameView object is created and the context of the Canvas is passed as params. GameView is starts animation with requestAnimationFrame. A new Game is also created which handles all of the logic for winning, losing, adding sharks, and draws the game background. It also has instance variables to keep track of the current level, the timer, and whether or not the game is paused or muted.

### Sharks

The Shark class handles the logic for drawing each shark, randomizing their movement, and registering clicks. It keeps tracks of whether or not a particular shark is fed.

### Controls

When the player clicks the question mark button, an About modal describes how to play the game and rules.

The player can pause the game and a modal will display that the game is paused and tell the player to click the question mark if they are new to the game.

The player has the option to turn the game's sound off by clicking the mute button.

### Timer

The player must wait three seconds in between clicks. There is a timer to let the player know when they can feed a shark again. If they click before the timer is up, the click will not be registered. When a shark is successfully fed, the game alerts the player with a chomping noise.

## Game Stats

A bar at the top of the game displays the current level and how many fish (clicks) are remaining in that current level. With each successful click, a fish is removed from the display.

## Future Plans
I will increase the game's difficulty by adding other distractions swimming around the screen such as other fish, octopus, turtles, etc. I will also add the option to change the speed in which the sharks move making the game easier or more difficult to suit the player's abilities.
