/* eslint-disable fp/no-unused-expression,fp/no-mutation,fp/no-nil */

/* create 2 players
   place ships
   render boards
   take turns */

import { css } from "@emotion/css";

import gameboardMethods from "./gameboard";
import playerMethods from "./player";
import shipMethods from "./ship";

const bodyStyle = css`
  color: hsla(0, 0%, 100%, 0.8);
  display: flex;
  gap: 3em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #222;
`;
document.querySelector( "body" ).classList.add( bodyStyle );

const gameStyle      = css`
  display         : flex;
  flex-direction  : column;
  align-items     : center;
  justify-content : center;
  gap             : 1em;
  height          : 90vh;
  width           : 90vh;
  background-color: #222;
`;
const gameboardStyle = css`
  display              : grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows   : repeat(8, 1fr);
  grid-gap             : 1px;
  width                : 40vh;
  height               : 40vh;
  background-color     : #222;
  transition           : all 1s ease-in-out;
  `;
const cellStyle      = css`
    &[data-cell="2"] {
      background-color: orange;
    }
    &[data-cell="3"] {
      background-color: red;
    }
    &[data-cell="4"] {
      background-color: blue;
    }
    &[data-cell="5"] {
      background-color: navy;
    }
    &[data-cell="X"] {
      background-color: #aaa;
    }
    & {
      background-color: #555;
      border          : 1px solid #000;
      width           : 100%;
      height          : 100%;
    }`;
const shipsStyle     = css`
  display         : flex;
  flex-direction  : row;
  align-items     : center;
  justify-content : center;
  gap             : 1em;
  background-color: #222;
`;
const shipStyle      = css`
  &[data-ship="2"] {
    width : 2em;
    background-color: orange;
  }
  &[data-ship="3"] {
    width : 4em;
    background-color: red;
  }
  &[data-ship="4"] {
    width : 6em;
    background-color: blue;
  }
  &[data-ship="5"] {
    width : 8em;
    background-color: navy;
  }
  & {
    background-color: #555;
    border          : 1px solid #000;
    width           : 5vh;
    height          : 5vh;
  }`;
const sampleBoard    = gameboardMethods.createGameboard();
const placeShipsRandomly
  = gameboard =>
    ( ships = [5, 4, 3, 3, 2] ) => {

      const presentShips = gameboard.ships.length;
      const randomRow    = Math.floor( Math.random() * 8 );
      const randomColumn = Math.floor( Math.random() * 8 );
      const axis         = {
        0: "horizontal",
        1: "vertical",
      };
      const randomAxis   = axis[ Math.floor( Math.random() * 2 ) ];
      const newShipBoard = gameboardMethods.placeShip( [randomRow, randomColumn] )( ships[ 0 ] )( randomAxis )( gameboard );
      if ( newShipBoard.ships.length === presentShips ) {

        return placeShipsRandomly( gameboard )( ships );

      }
      if ( ships.length === 1 ) {

        return newShipBoard;

      }
      return placeShipsRandomly( newShipBoard )( ships.slice( 1 ) );

    };
const handleTurn
  = game_ =>
    attack =>
      ( game_.turn % 2 === 0
        ? {
          ...game_,
          player1: {
            ...game_.player1,
            gameboard: gameboardMethods.receiveAttack( attack )( game_.player1.gameboard ),
          },
          turn: game_.turn + 1,
        }
        : {
          ...game_,
          player2: {
            ...game_.player2,
            gameboard: gameboardMethods.receiveAttack( attack )( game_.player2.gameboard ),
          },
          turn: game_.turn + 1,
        } );
const renderPlayer
  = player =>
    playerBoardElement =>
      game_ =>
        player.gameboard.board.map( ( row, rowIndex ) =>
          row.map( ( column, columnIndex ) =>
            playerBoardElement.append( ( () => {

              const cellElement = document.createElement( "div" );
              cellElement.classList.add( cellStyle );
              cellElement.dataset.row    = rowIndex;
              cellElement.dataset.column = columnIndex;
              const cell                 = {
                default: () =>
                  cellElement.dataset.cell = column,
                ship: () =>
                  ( column.isSunk
                    ? cellElement.dataset.cell = "sunk"
                    : cellElement.dataset.cell = column.length ),
              };
              ( cell.ship || cell.default )();
              cellElement.addEventListener( "click", () => {

                document.querySelector( "body" )
                  .replaceChildren();
                render( handleTurn( game_ )( [rowIndex, columnIndex] ) );
                console.log( column );

              } );
              return cellElement;

            } )() ) ) );
const handleEnd
  = game_ =>
    gameElement => {

      if ( gameboardMethods.isGameOver( game_.player1.gameboard ) || gameboardMethods.isGameOver( game_.player2.gameboard ) ) {

        const gameOverElement       = document.createElement( "div" );
        gameOverElement.textContent = "Game Over!";
        gameElement.append( gameOverElement );

      }

    };
const render = game_ => {

  const gameElement = document.createElement( "div" );
  gameElement.classList.add( gameStyle );

  const player1BoardElement = document.createElement( "div" );
  player1BoardElement.classList.add( gameboardStyle );
  gameElement.append( player1BoardElement );

  renderPlayer( game_.player1 )( player1BoardElement )( game_ );
  handleEnd( game_ )( gameElement );

  const player2BoardElement = document.createElement( "div" );
  player2BoardElement.classList.add( gameboardStyle );
  gameElement.append( player2BoardElement );

  placeShipsRandomly( game_.player2.gameboard );

  renderPlayer( game_.player2 )( player2BoardElement )( game_ );
  document.querySelector( "body" )
    .append( gameElement );

};
const preventDefault     = event =>
  event.preventDefault();
const renderInitialBoard = gameboard => {

  const boardElement = document.createElement( "div" );
  boardElement.classList.add( gameboardStyle );
  gameboard.board.reduce( ( accumulator, row, rowIndex ) => {

    row.reduce( ( accumulator_, cell, columnIndex ) => {

      const cellElement = document.createElement( "div" );
      cellElement.classList.add( cellStyle );
      cellElement.dataset.row    = rowIndex;
      cellElement.dataset.column = columnIndex;
      const content              = {
        default: () =>
          cellElement.dataset.cell = cell,
        ship: () =>
          ( cell.isSunk
            ? cellElement.dataset.cell = "sunk"
            : cellElement.dataset.cell = cell.length ),
      };
      ( content.ship || content.default )();

      // place ship when dragged into cell
      cellElement.addEventListener( "dragenter", preventDefault );
      cellElement.addEventListener( "dragover", preventDefault );
      cellElement.addEventListener( "drop", event => {

        event.preventDefault();
        const data         = JSON.parse( event.dataTransfer.getData( "text" ) );
        const newGameboard = gameboardMethods.placeShip(
          [Number( cellElement.dataset.row ),
            Number( cellElement.dataset.column )]
        )( data.length )( data.axis )( gameboard );
        document.querySelector( "body" )
          .replaceChildren();
        renderInitialBoard( newGameboard );

      } );
      accumulator_.append( cellElement );
      return accumulator_;

    }, accumulator );
    return accumulator;

  }, boardElement );
  document.querySelector( "body" )
    .append( boardElement );

};
const renderAvailableShips = () => {

  const shipsElement = document.createElement( "div" );
  const tip          = document.createElement( "div" );
  tip.textContent    = "Drag and drop the ships to place them on the board.";
  shipsElement.classList.add( shipsStyle );
  const ships = [5, 4, 3, 3, 2];
  ships.reduce( ( accumulator, ship ) => {

    const shipElement        = document.createElement( "div" );
    shipElement.dataset.ship = ship;
    shipElement.classList.add( shipStyle );
    shipElement.draggable = true;
    accumulator.append( shipElement );
    shipElement.addEventListener( "dragstart", event => {

      const data = {
        axis  : "horizontal",
        length: ship,
      };
      event.dataTransfer.setData( "text/plain", JSON.stringify( data ) );

    } );
    return accumulator;

  }, shipsElement );
  document.querySelector( "body" )
    .append( shipsElement );
  document.querySelector( "body" )
    .append( tip );

};
const initializeGame = () => {

  /* render empty board
   render ship types
   place ships by dragging */
  /*  renderInitialBoard();
     ! const player1Board = getUserInput( sampleBoard ); TODO: get user input */
  const player2Board = placeShipsRandomly( sampleBoard )();
  const player1      = playerMethods.createPlayer( "Player 1" )( player1Board );
  const player2      = playerMethods.createPlayer( "Player 2" )( player2Board );
  const game         = {
    player1,
    player2,
    turn: 0,
  };
  render( game );

};
renderInitialBoard( sampleBoard );
renderAvailableShips();

// initializeGame();
