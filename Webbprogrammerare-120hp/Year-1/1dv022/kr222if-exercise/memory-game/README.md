# Memory game
In this exercise you will create a simple memory game (http://en.wikipedia.org/wiki/Concentration_(game)).
 
In the memory game, images are randomly placed face-down in a grid. Each turn, the player chooses two images to peek at. If they choose two of the same image in a row, those images are a match and will be hidden from the game. If the images do not match they will be turned back face down after one second. You win when every image is removed from the game. 

![](memory.png)

### Demands
 * You should be able to play the game with and without using the mouse.
 * The game should count how many attempts the user have made and present that when the game is finnished.
 * It should be possible to render different sizes of the gameboard. (4x4, 2x2, 2x4)
 
### Tip 
 * Even though a game board is rendered as an matrix (4 x 4) the game logic does not need the images to be placed in an matrix. Instead, let the images be represented by an array where 0 is the first image and 15 is the last image. 
 * Every image (number) should appear twice in the array [0,0,1,1,2,2,3,3,4,4...]
 * There is no need to save the url to the image in the array, but you could if you like to.
 * You will need a function that will shuffle the array of images.
 
### Possible solution path

1) Decide your overall design approach. Types or only a function? 
2) Create the array and populate it with image ids
3) Shuffle the array
4) Print the gameboard using javascript and templates. Images sources should be "image/0.png"
5) Make the bricks "turn" when clicked
6) Implement game logics
 
### To try out to learn even more
 * Do you want to use types for the game or just use a function create game boards?
 * Can you solve the assignment by setting only one click-eventlistener per memory game?
 
### Extending the game
 * Two players and a bigger board? Each player gets a pile of matched pairs. The largest pile in the end wins.
 * Add a timer to force the user to win as fast as possible
 
### Credits
 Images made by Moa Alfredsson
 Original assignment by Petter Miller 2002
