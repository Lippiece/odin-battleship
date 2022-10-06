import shipMethods from "./ship";

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
  placeShip:
      posX =>
        posY =>
          length =>
            direction =>
              ( {
                board: Gameboard()
                  .map( ( row, rowIndex ) =>
                    row.map( ( _, columnIndex ) => {

                      if ( direction === "horizontal" ) {

                        if ( rowIndex === posX && columnIndex >= posY && columnIndex < posY + length ) {

                          return shipMethods.createShip( length );

                        }

                      } else if ( columnIndex === posY && rowIndex >= posX && rowIndex < posX + length ) {

                        return shipMethods.createShip( length );

                      }
                      return columnIndex;

                    } ) ),
                ships: [{
                  hitCount: 0,
                  isSunk  : false,
                  length,
                  position: {
                    direction,
                    posX,
                    posY,
                  },
                }],
              } ),
  receiveAttack:
              target =>
                gameboard =>
                  ( {
                    ...registerHitOnBoard( target )( gameboard.board ),
                    ...registerHitInShips( target )( gameboard.ships ),
                    ...registerMiss( target )( gameboard.board ),
                  } ),

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
const registerHitOnBoard
  = target =>
    board =>
      ( {
        board: board.map( ( row, rowIndex ) =>
          row.map( ( column, columnIndex ) => {

            if ( rowIndex === target[ 0 ]
              && columnIndex === target[ 1 ]
              && !!column.hitCount ) {

              return shipMethods.hit( column );

            }
            return column;

          } ) ),
      } );
const registerHitInShips
  = target =>
    ships =>
      ( {

        ships: ships.map( ship =>
          ( {
            ...ship,
            hitCount: ship.position.direction === "horizontal"
              ? ( ship.position.posX === target[ 0 ] && ship.position.posY <= target[ 1 ] && ship.position.posY + ship.length > target[ 1 ]
                ? ship.hitCount + 1
                : ship.hitCount )
              : ( ship.position.posY === target[ 1 ] && ship.position.posX <= target[ 0 ] && ship.position.posX + ship.length > target[ 0 ]
                ? ship.hitCount + 1
                : ship.hitCount ),
          } ) ),

      } );
export default gameboardMethods;
