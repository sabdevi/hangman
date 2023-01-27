// Import React components
import React from 'react';

// Import styling
import './App.css';

// Importing Bootstrap library for styling
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Hangman page components
import Hangman from './components/hangman';

function App() {

  // const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  return (
    <div className="container bg-white">
      <div className="text-center m-5">
        <h1>Hangman Game</h1>
      </div>
        <Hangman />
    </div>
  );
}

export default App;
