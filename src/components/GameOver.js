import React from "react";

function GameOver(props) {
    return (
        props.show ?
            <div id="gameOver">
                <div>
                    Parabéns, você completou o jogo!
                </div>
                <button id="restart" onClick={props.handleRestart}>Novo Jogo</button>
            </div> : <div />
    )
}

export default GameOver;