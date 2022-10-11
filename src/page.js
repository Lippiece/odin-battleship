/* eslint-disable fp/no-unused-expression,fp/no-mutation */

/* create 2 players
   place ships
   render boards
   take turns */

import { css } from "@emotion/css";

import gameboardMethods from "./gameboard";
import playerMethods from "./player";
import shipMethods from "./ship";

const bodyStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #222;
`;
document.querySelector( "body" ).classList.add( bodyStyle );

const gameStyle      = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  height: 70vh;
  width: 70vh;
  background-color: #222;
`;
const gameboardStyle = css`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-gap: 1px;
  width: 100%;
  height: 100%;
  background-color: #222;
  `;
const cellStyle      = css`
    &[data-cell="3"] {
      background-color: red;
    }
    &[data-cell="5"] {
      background-color: navy;
    }
    & {
      background-color: #555;
      border: 1px solid #000;
      width: 100%;
      height: 100%;
    }
  `;
const player1Board   = gameboardMethods.placeShip( [0, 0] )( 3 )( "horizontal" )( gameboardMethods.createGameboard() );
console.log( "player1Board", player1Board );
const player2Board = gameboardMethods.placeShip( [2, 2] )( 5 )( "vertical" )( gameboardMethods.placeShip( [0, 0] )( 3 )( "horizontal" )( gameboardMethods.createGameboard() ) );
const player1      = playerMethods.createPlayer( "Player 1" )( player1Board );
const player2      = playerMethods.createPlayer( "Player 2" )( player2Board );
const game         = {
  player1,
  player2,
  turn: 0,
};
const handleTurn
  = game_ =>
    attack =>
      ( game_.turn % 2 === 0
        ? {
          ...game_,
          player1: gameboardMethods.receiveAttack( attack )( game_.player1 ),
          turn   : game_.turn + 1,
        }
        : {
          ...game_,
          player2: gameboardMethods.receiveAttack( attack )( game_.player2 ),
          turn   : game_.turn + 1,
        } );
const render       = game => {

  const gameElement = document.createElement( "div" );
  gameElement.classList.add( gameStyle );
  const player1BoardElement = document.createElement( "div" );
  player1BoardElement.classList.add( gameboardStyle );
  const player2BoardElement = document.createElement( "div" );
  player2BoardElement.classList.add( gameboardStyle );

  game.player1.gameboard.board.map( ( row, rowIndex ) =>
    row.map( ( column, columnIndex ) =>
      player1BoardElement.append( ( () => {

        const cellElement = document.createElement( "div" );
        cellElement.classList.add( cellStyle );
        cellElement.dataset.row    = rowIndex;
        cellElement.dataset.column = columnIndex;
        column === "_"
          ? cellElement.dataset.cell = "_"
          : ( column.isSunk
            ? cellElement.dataset.cell = "sunk"
            : cellElement.dataset.cell = column.length );
        cellElement.addEventListener( "click", () => {

          document.querySelector( "body" )
            .replaceChildren();
          render( handleTurn( game )( [rowIndex, columnIndex] ) );

        } );
        return cellElement;

      } )() ) ) );

  game.player2.gameboard.board.map( ( row, rowIndex ) =>
    row.map( ( column, columnIndex ) =>
      player2BoardElement.append( ( () => {

        const cellElement = document.createElement( "div" );
        cellElement.classList.add( cellStyle );
        cellElement.dataset.row    = rowIndex;
        cellElement.dataset.column = columnIndex;
        column === "_"
          ? cellElement.dataset.cell = "_"
          : ( column.isSunk
            ? cellElement.dataset.cell = "sunk"
            : cellElement.dataset.cell = column.length );
        console.log( column );
        cellElement.addEventListener( "click", () => {

          document.querySelector( "body" )
            .replaceChildren();
          render( handleTurn( game )( [rowIndex, columnIndex] ) );

        } );
        return cellElement;

      } )() ) ) );

  gameElement.append( player1BoardElement );
  gameElement.append( player2BoardElement );
  document.querySelector( "body" )
    .append( gameElement );

};

render( game );
