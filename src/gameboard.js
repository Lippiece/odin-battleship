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

  // TODO: disallow illegal ship placements
  placeShip:
      position =>
        length =>
          direction =>
            gameboard =>
              ( {
                ...gameboard,
                board: gameboard.board.map( ( row, rowIndex ) =>
                  row.map( ( column, columnIndex ) => {

                    if ( getFullShipCoordinates( position )( length )( direction )
                      .some( ( [row_, column_] ) =>
                        row_ === rowIndex && column_ === columnIndex ) ) {

                      return shipMethods.createShip( length );

                    }
                    return column;

                  } ) ),
                ships: [{
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
            .map( ( position, index ) =>
              [position[ 0 ], position[ 1 ] + index] )
          : Array( length )
            .fill( position )
            .map( ( position, index ) =>
              [position[ 0 ] + index, position[ 1 ]] ) );
const checkPlacement
  = target =>
    length =>
      direction =>
        board =>
          ( checkIfPlacementCollides( target )( length )( direction )( board )
            ? checkIfPlacementFitsInBoard( target )( length )( direction )( board )
            : false );
const checkIfPlacementFitsInBoard
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
            ? board[ target[ 0 ] ].slice( target[ 1 ], target[ 1 ] + length )
              .every( cell =>
                cell === "_" )
            : board.slice( target[ 0 ], target[ 0 ] + length )
              .every( row =>
                row[ target[ 1 ] ] === "_" ) );
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
