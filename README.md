# MCU Trivia Game

This fully responsive application is a simple trivia game, with questions based on the Marvel Cinematic Universe (MCU). The project was primarily created with Javascript, utilizing jQuery to dynamically create and manipulate html elements. https://cjay1019.github.io/trivia-game/

## How To Play

The game is quite simple: on page load, the player is presented with a start button. Once the start button clicked, or enter is pressed, a question is presented, along with for answer choices. The player has 15 seconds to choose an answer. After 8 questions are answered, the player is presented with an end screen, displaying their score and a play again button. They can click the button or press enter to reset the application. Because the questions are chosen randomly, and there are 12 total options, the game experience will be different nearly ever time.

## How it works

On page load, the html displays the first screen including a start button. Once start is pressed, the screen is cleared, the app chooses 1 random question from a list of 12, and prints it to the screen (no question will ever be chosen more than once). Simultaneously, the app finds the 4 answers that correspond to the chosen question, and prints them in random order. This screen also contains a dynamic timer, that counts down from 15 seconds.

When the player chooses an answer, or after 15 seconds passes, the screen is cleared and a post question screen is displayed. Depending on the user input, the screen displays whether the player was correct, was incorrect, or failed to answer in time. A gif relevant to the question is then located and printed at this time. The app then increments the corresponding hidden score value, and also prints the correct answer is the player was not correct.

After 3 seconds, the application automatically clears the screen, and repeats the earlier steps to choose a new random question, and the player must choose again. This entire process that the app has executed so far repeats 8 times. After 8 questions have been completed, and the 3 seconds mentioned earlier have passed, the screen is cleared and an end screen is displayed. The app prints a message saying that the game is complete, as well as the player's scores and a play again button. If the player clicks the button or presses enter, the entire app is reset as if the page was refreshed.
