import React, { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import game from "./game";

const audio = new Audio("assets/sounds/Card-flip-sound-effect.mp3");

function MemoryGame() {
    const [gameOver, setGameOver] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(game.createCards());
    }, [])

    function restart() {
        game.clearCards();
        setCards(game.createCards());
        setGameOver(false);
    }

    function flip(card) {
        audio.play();
        game.flipCard(card.id, () => {
            // gameOverCallback
            setGameOver(true);
        }, () => {
            // noMatchCallback
            setCards([...game.cards]);
        });
        setCards([...game.cards]);
    }

    return (
        <div>
            <GameBoard handleFlip={flip} cards={cards} />
            <GameOver show={gameOver} handleRestart={restart} />
        </div>
    )
}

export default MemoryGame;