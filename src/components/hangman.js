// Import React components
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

// Import random words from the dictionary array
import RandomWords from './randomwords';

// Import hangman images
import step1 from "../images/state1.GIF";
import step2 from "../images/state2.GIF";
import step3 from "../images/state3.GIF";
import step4 from "../images/state4.GIF";
import step5 from "../images/state5.GIF";
import step6 from "../images/state6.GIF";
import step7 from "../images/state7.GIF";
import step8 from "../images/state8.GIF";
import step9 from "../images/state9.GIF";
import step10 from "../images/state10.gif";
import step11 from "../images/state11.GIF";

// Define the alphabet in an array
const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Define images
const images = [step1, step2, step3, step4, step5, step6, step7, step8, step9, step10, step11];

// Function to display the guessed letters
function Hangman() {

    // Set the states
    const [word, setWord] = useState(RandomWords);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [guessedLetter, setGuessedLetter] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        
        // If the user has guessed 11 times then the game is over.  Initial state is zero so the condition has to be equal to 10
        if (incorrectGuesses === 11) {
            setGameOver(true);
        }

    }, [incorrectGuesses]);
   
    // Check if the word contains the guessed letter, when button is clicked it calls setGuessedLetter function to update the guessed letter state.
    // Used disabled prop to disable the button when the letter has already been guessed.
    function handleLetterClick(alphabet) {
        const isCorrect = word.includes(alphabet);
        setGuessedLetters([...guessedLetters, alphabet]);
        if (!isCorrect) {
          setIncorrectGuesses(incorrectGuesses + 1);
        }
        setGuessedLetter(alphabet);
        
        // Check if the game is won
        checkGameWon();
      }

    function checkGameWon() {
        if (wordToGuess === word) {
            setGameWon(true);
        }
    }
    
    // Check if the word has been guessed correctly and render the word with the underscores for unguessed letters
    const wordToGuess = word.split('').map((char) =>
    (guessedLetters.includes(char) ? char : ' _ ')).join('');

    // Reset the game when you click the Reset Button - create a new random word from the dictionary, rest the guessed letters and incorrect guesssed letters to default
    // and reset flags for game won and gameover
    function resetGame() {
        setWord(RandomWords);
        setGuessedLetters([]);
        setIncorrectGuesses(0);
        setGuessedLetter(guessedLetter);
        setGameOver(false);
        setGameWon(gameWon);
    }

    // Function will dispatch the action whenever the 'info' button is clicked
    const handleInfo = () => {
        setShowModal(true);
    };

    // Function to close the Modal box when the 'Go back to game' button is clicked
    const handleClose = () => {
        setShowModal(false);
    };

    // Return keypad of all letters, display hangman on incorrect guesses, display incorrect guesses and display the won or lost message
    return (

        <div className="text-center letters-guess py-3">
            {/* Use a seperate image for the last stage of the game if incorrect guesses are 11 */}
            {incorrectGuesses === 11 ? <img src={images[images.length-1]} alt="Hangman" /> : <img src={images[incorrectGuesses]} alt="Hangman" />}
            <div>{wordToGuess}</div>
            <div>
                {alphabets.map((alphabet) => (
                    <button
                    key={alphabet}
                    onClick={() => handleLetterClick(alphabet)}
                    disabled={guessedLetters.includes(alphabet) || gameOver || wordToGuess === word}
                    className="btn btn-lg btn-primary m-2"
                    >
                        {alphabet}
                    </button>
                ))}
            </div>
            <div className="fs-4 my-2">

                {/* Display incorrect guesses */}
                <div>Incorrect Guesses: {incorrectGuesses} out of {images.length}</div>
                
                {/* Messages displayed depending on whether game is lost or won  */}
                {gameOver && <div>You Lost, press Restart Game to Try Again</div>}
                {wordToGuess === word && <div>You Won!</div>}
                <button className="btn btn-success m-4" onClick={handleInfo}>Info</button>
                <button className='btn btn-danger' onClick={resetGame}>Reset Game</button>

                {/* Use Modal to display a pop up window when pressing the edit button */}
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Game Instructions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ol>
                            <li>Start by guessing letters.</li>
                            <li>Start by guessing common letters like vowels, or "s," "t," and "n."</li>
                            <li>The blanks "_ _ _" will be filled by the letter chosen from the keypad, if the player guesses correctly.</li>
                            <li>Part of the "hangman" will draw on screen when a player guesses wrong.</li>
                            <li>The player has 11 guesses, when 11 guesses is reached, the player loses the game.</li>
                            <li>The player wins when they guess the correct word.</li>
                            <li>You can reset the game at any point in the game by pressing the <button className='btn btn-danger info-btn'>Reset Game</button> button, and a new game will begin.</li>
                        </ol>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose}>Go back to game</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default Hangman;