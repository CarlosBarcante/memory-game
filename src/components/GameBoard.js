import React from "react";
import Card from "./Card";

function GameBoard(props) {
    return (
        <div id="board">
            {props.cards.map((card, index) => {
                return (<Card handleFlip={props.handleFlip} key={index} card={card} />)
            })}
        </div>
    )
}

export default GameBoard;