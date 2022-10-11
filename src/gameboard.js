
import shipMethods from "./ship.js";

const Gameboard        = () =>
  Array( 8 )
    .fill( Array( 8 )
      .fill( "_" ) );
const gameboardMethods = {
  createGameboard:
    ( ships = [] ) =>
      ( {
        board: Gameboard(),
        ships,
      } ),
  isGameOver:
    gameboard =>
      ( gameboard.ships.every( ship =>
        ship.isSunk ) ),
  placeShip:
    position =>
      length =>
        direction =>
          gameboard =>
            ( {
              ...gameboard,
              board: gameboard.board.map( ( row, rowIndex ) =>
                row.map( ( column, columnIndex ) =>
                  ( getFullShipCoordinates( position )( length )( direction )
                    .some( ( [row_, column_] ) =>
                      row_ === rowIndex && column_ === columnIndex )
                           && ifLegalPlacement( position )( length )( direction )( gameboard.board )
                    ? shipMethods.createShip( length )
                    : column ) ) ),
              ships: [
                ...gameboard.ships, {
                  hitCount: 0,
                  isSunk  : false,
                  length,
                  position: {
                    direction,
                    position,
                  },
                }],
            } ),
  receiveAttack:
    target =>
      gameboard =>
        ( {
          ...registerHit( target )( gameboard ),
          ...registerMiss( target )( gameboard.board ),
        } ),
};
const getFullShipCoordinates
  = position =>
    length =>
      direction =>
        ( direction === "horizontal"
          ? Array( length )
            .fill( position )
            .map( ( position_, index ) =>
              [position_[ 0 ], position_[ 1 ] + index] )
          : Array( length )
            .fill( position )
            .map( ( position_, index ) =>
              [position_[ 0 ] + index, position_[ 1 ]] ) );
const ifLegalPlacement
  = target =>
    length =>
      direction =>
        board =>
          ( checkIfPlacementFits( target )( length )( direction )
            && checkIfPlacementCollides( target )( length )( direction )( board ) );
/**
 * Returns true if the placement fits in the board, and
 * false if it doesn't.
 */
const checkIfPlacementFits
  = target =>
    length =>
      direction =>
        ( direction === "horizontal"
          ? target[ 1 ] + length <= 8
          : target[ 0 ] + length <= 8 );
const checkIfPlacementCollides
  = target =>
    length =>
      direction =>
        board =>
          ( direction === "horizontal"
            ? getAdjacentCells( target )( length )( direction )( board )
              .every( cell =>
                typeof cell !== "object" )
            : board.slice( target[ 0 ], target[ 0 ] + length )
              .every( row =>
                row[ target[ 1 ] ] === "_" ) );
// calculate adjacent cells considering rims of the board
const getAdjacentCells
  = target =>
    length =>
      direction =>
        board => {

          if ( direction === "horizontal" ) {

            if ( target[ 0 ] === 0 ) {

              return board[ target[ 0 ] ].slice( target[ 1 ] - 1, target[ 1 ] + length + 1 );

            } if ( target[ 0 ] === 7 ) {

              return board[ target[ 0 ] ].slice( target[ 1 ] - 1, target[ 1 ] + length + 1 );

            }
            return [...board[ target[ 0 ] ].slice( target[ 1 ] - 1, target[ 1 ] + length + 1 ),
              ...board[ target[ 0 ] - 1 ].slice( target[ 1 ] - 1, target[ 1 ] + length + 1 ),
              ...board[ target[ 0 ] + 1 ].slice( target[ 1 ] - 1, target[ 1 ] + length + 1 )];

          }

          // vertical
          if ( target[ 1 ] === 0 ) {

            return board.slice( target[ 0 ], target[ 0 ] + length );

          } if ( target[ 1 ] === 7 ) {

            return board.slice( target[ 0 ], target[ 0 ] + length );

          }
          return [...board.slice( target[ 0 ], target[ 0 ] + length ),
            ...board.slice( target[ 0 ] - 1, target[ 0 ] + length - 1 ),
            ...board.slice( target[ 0 ] + 1, target[ 0 ] + length + 1 )];

        };
const registerMiss
  = target =>
    board =>
      ( {
        board: board.map( ( row, rowIndex ) =>
          row.map( ( column, columnIndex ) => {

            if ( rowIndex === target[ 0 ]
              && columnIndex === target[ 1 ]
              && ( typeof column !== "object" ) ) {

              return "X";

            }
            return column;

          } ) ),
      }
      );
const registerHit
  = target =>
    gameboard => {

      const result = {
        board: gameboard.board.map( ( row, _ ) =>
          row.map( ( column, __ ) =>
            ( checkIfHit( target )( gameboard.board )
              ? shipMethods.hit( column )
              : column ) ) ),
      };

      return { ...result, ...registerHitAtShips( target )( gameboard ) };

    };
const registerHitAtShips
  = target =>
    gameboard =>
      ( {

        ships: gameboard.ships.map( ship =>
          ( getFullShipCoordinates( ship.position.position )( ship.length )( ship.position.direction )
            .some( ( [row, column] ) =>
              row === target[ 0 ] && column === target[ 1 ] )
            ? shipMethods.hit( ship )
            : ship ) ),

      } );
const checkIfHit
  = target =>
    board =>
      board[ target[ 0 ] ][ target[ 1 ] ].hitCount;
export default gameboardMethods;
