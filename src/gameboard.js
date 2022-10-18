
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
              ships: ifLegalPlacement( position )( length )( direction )( gameboard.board )
                ? [
                  ...gameboard.ships, {
                    hitCount: 0,
                    isSunk  : false,
                    length,
                    position: {
                      direction,
                      position,
                    },
                  }]
                : gameboard.ships,
            } ),
  receiveAttack:
    target =>
      gameboard =>
        ( {
          ...registerHit( target )( gameboard ),
          ...registerMiss( target )( gameboard.board ),
        } ),
};
/**
 * "Given a position, a length, and a direction, return
 * an array of coordinates that represent the full
 * ship."
 */
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
  = position =>
    length =>
      direction =>
        ( direction === "horizontal"
          ? position[ 1 ] + length <= 8
          : position[ 0 ] + length <= 8 );
const checkIfPlacementCollides
  = position =>
    length =>
      direction =>
        board =>
          ( direction === "horizontal"
            ? getAdjacentCells( position )( length )( board )
              .horizontal
              .every( cell =>
                cell === "_" )
            : getAdjacentCells( position )( length )( board )
              .vertical
              .every( cell =>
                cell === "_" ) );
// calculate adjacent cells considering rims of the board
const getAdjacentCells
  = position =>
    length =>
      board =>
        ( {
          horizontal: [
            ...getFullShipCoordinates( position )( length )( "horizontal" )
              .map( ( [row, column] ) =>
                board[ row - 1 ]?.[ column  ] ),
            board[ position[ 0  ] - 1 ]?.[ position[ 1 ] - 1 ],
            board[ position[ 0  ] + 1 ]?.[ position[ 1 ] + length  ],
            ...getFullShipCoordinates( position )( length )( "horizontal" )
              .map( ( [row, column] ) =>
                board[ row + 1 ]?.[ column  ] ),
            board[ position[ 0  ] + 1 ]?.[ position[ 1 ] - 1 ],
            board[ position[ 0  ] - 1 ]?.[ position[ 1 ] + length  ],
            ...getFullShipCoordinates( position )( length )( "horizontal" )
              .map( ( [row, column] ) =>
                board[ row ][ column ] ),
            board[ position[ 0 ] ][ position[ 1 ] - 1 ],
            board[ position[ 0 ] ][ position[ 1 ] + length  ],
          ]
            .filter( cell =>
              cell !== undefined ),
          vertical: [
            ...getFullShipCoordinates( position )( length )( "vertical" )
              .map( ( [row, column] ) =>
                board[ row ]?.[ column - 1 ] ),
            board[ position[ 0 ] - 1 ]?.[ position[ 1 ] - 1 ],
            board[ position[ 0 ] + length  ]?.[ position[ 1 ] - 1 ],
            ...getFullShipCoordinates( position )( length )( "vertical" )
              .map( ( [row, column] ) =>
                board[ row ]?.[ column + 1 ] ),
            board[ position[ 0 ] - 1 ]?.[ position[ 1 ] + 1 ],
            board[ position[ 0 ] + length  ]?.[ position[ 1 ] + 1 ],
            ...getFullShipCoordinates( position )( length )( "vertical" )
              .map( ( [row, column] ) =>
                board[ row ]?.[ column ] ),
            board[ position[ 0 ] - 1 ]?.[ position[ 1 ] ],
            board[ position[ 0 ] + length  ]?.[ position[ 1 ] ],
          ]
            .filter( cell =>
              cell !== undefined ),
        } );
const registerMiss
  = target =>
    board =>
      ( {
        board: board.map( ( row, rowIndex ) =>
          row.map( ( column, columnIndex ) =>
            ( rowIndex === target[ 0 ]
            && columnIndex === target[ 1 ]
              ? ( typeof column === "object" ? "H" : "X" )
              : column ) ) ),
      } );
const registerHit
  = target =>
    gameboard => {

      if ( typeof gameboard.board[ target[ 0 ] ][ target[ 1 ] ] !== "object" ) {

        return gameboard;

      }
      return ( {
        ...gameboard,
        ...registerHitAtShips( target )( gameboard ),
      } );

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
/**
 * If the column is an object, then it's a hit.
 */
const checkIfHit
  = column =>
    typeof column === "object";
export default gameboardMethods;
