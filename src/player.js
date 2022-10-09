import gameboardMethods from "./gameboard";
import shipMethods from "./ship";

const playerMethods = {
  attack:
    attacker =>
      receiver =>
        coordinates =>
          ( {
            line: attacker,
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
const aiMethods     = {
  chooseCoordinatesNearHit:
    board =>
      hit => {

        const validMoves = [
          [hit[ 0 ] - 1, hit[ 1 ]],
          [hit[ 0 ] + 1, hit[ 1 ]],
          [hit[ 0 ], hit[ 1 ] - 1],
          [hit[ 0 ], hit[ 1 ] + 1],
        ].filter( move =>
          move[ 0 ] >= 0 && move[ 0 ] < 8 && move[ 1 ] >= 0 && move[ 1 ] < 8 );

        return validMoves.length > 0 ? validMoves[ 0 ] : aiMethods.chooseRandomCoordinates( board );

      },
  chooseRandomCoordinates:
    board =>
      ( [Math.floor( Math.random() * board.length ),
        Math.floor( Math.random() * board.length )] ),
  selectCellToAttack:
    board => {

      const hit = ( board.reduce( ( accumulator, row, rowIndex ) => {

        const hit_ = row.reduce( ( accumulator_, cell, cellIndex ) => {

          if ( cell === "X" ) {

            return [rowIndex, cellIndex];

          }
          return accumulator_;

        }, false );

        return hit_ || accumulator;

      }, [] ) );

      return hit.length > 0
        ? aiMethods.chooseCoordinatesNearHit( board )( hit )
        : aiMethods.chooseRandomCoordinates( board );

    },
};

export default {
  ...playerMethods,
  aiMethods,
};
