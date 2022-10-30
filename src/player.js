import * as R from "ramda";

import gameboardMethods from "./gameboard";
import shipMethods from "./ship";

export const playerMethods = {
  attack:
    attacker =>
      receiver =>
        coordinates =>
          ( {
            next: attacker,
            turn: {
              ...receiver,
              gameboard: gameboardMethods.receiveAttack( coordinates )( receiver.gameboard ),
            },
          } ),
  createPlayer:
    name =>
      board =>
        ( {
          gameboard: board,
          name,
        } ),
};
const getHitCell = board =>
  board.reduce( ( accumulator, row, rowIndex ) => {

    const hit_ = row.reduce( ( accumulator_, cell, cellIndex ) => {

      if ( cell === "H" ) {

        return [ rowIndex, cellIndex ];

      }
      return accumulator_;

    }, false );

    return hit_ || accumulator;

  }, [] );
const getUnhitCells = board =>
  board.reduce( ( accumulator, row, rowIndex ) => {

    const unhit = row.reduce( ( accumulator_, cell, cellIndex ) => {

      if ( cell !== "X" ) {

        return [ ...accumulator_, [ rowIndex, cellIndex ] ];

      }
      return accumulator_;

    }, [] );

    return [ ...accumulator, ...unhit ];

  }, [] )
    .filter( ( [ row, column ] ) =>
      board[ row ]?.[ column ] !== "H" )
    .filter( Boolean );
export const aiMethods = {
  getCellNearNearHit:
    board =>
      hit => {

        const unhit     = getUnhitCells( board );
        const validMove = [
          [ hit[ 0 ] - 1, hit[ 1 ] ],
          [ hit[ 0 ] + 1, hit[ 1 ] ],
          [ hit[ 0 ], hit[ 1 ] - 1 ],
          [ hit[ 0 ], hit[ 1 ] + 1 ],
        ]
          .find( availableCell =>
            unhit.find( unhitCell =>
              R.equals( availableCell, unhitCell ) ) );
        const random    = unhit[ Math.floor( Math.random() * unhit.length ) ];
        return validMove || random;

      },
  getRandomCell:
    board =>
      ( [ Math.floor( Math.random() * board.length ),
        Math.floor( Math.random() * board.length ) ] ),
  selectTarget:
    board => {

      const hit = getHitCell( board );

      return aiMethods.getCellNearNearHit( board )( hit );

    },
};
