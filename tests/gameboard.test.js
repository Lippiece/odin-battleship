/* eslint-disable fp/no-nil, fp/no-unused-expression */
import { describe, expect, test } from "vitest";

import gameboardMethods from "../src/gameboard";
import shipMethods from "../src/ship";

const sampleBoard    = gameboardMethods.createGameboard();
const boardWithAShip = gameboardMethods.placeShip( [1, 1] )( 3 )( "horizontal" )( sampleBoard );
const attack         = gameboardMethods.receiveAttack( [1, 1] )( boardWithAShip );

describe( "gameboard", () => {

  test( "should return empty board", () => {

    expect.assertions( 1 );
    expect( sampleBoard.board )
      .toContainEqual( ["_", "_", "_", "_", "_", "_", "_", "_"] );

  } );

} );

// eslint-disable-next-line max-lines-per-function
describe( "ship placement", () => {

  test( "should place a ship at specific coordinates", () => {

    expect.assertions( 4 );

    expect(
      [boardWithAShip.board[ 1 ][ 1 ],
        boardWithAShip.board[ 1 ][ 2 ],
        boardWithAShip.board[ 1 ][ 3 ]]
    )
      .toEqual(
        [shipMethods.createShip( 3 ),
          shipMethods.createShip( 3 ),
          shipMethods.createShip( 3 )]
      );
    expect( boardWithAShip.ships )
      .toEqual( [
        {
          hitCount: 0,
          isSunk  : false,
          length  : 3,
          position: { direction: "horizontal", position: [1, 1] },
        },
      ] );
    expect( boardWithAShip.board[ 1 ][ 1 ] )
      .toHaveProperty( "isSunk", false );
    expect( boardWithAShip.board[ 1 ][ 1 ] )
      .toHaveProperty( "length", 3 );

  } );

  test( "should not place a ship at illegal coordinates", () => {

    const illegalShipPlacement = gameboardMethods.placeShip( [7, 7] )( 3 )( "vertical" )( sampleBoard );

    expect.assertions( 1 );

    expect( illegalShipPlacement.board[ 7 ][ 7 ] )
      .toEqual( "_" );

  } );

  test( "should not place a ship on top of another ship", () => {

    const illegalShipPlacement = gameboardMethods.placeShip( [0, 1] )( 3 )( "vertical" )( boardWithAShip );

    expect.assertions( 1 );

    expect( illegalShipPlacement.board[ 2 ][ 1 ] )
      .toEqual( "_" );

  } );

  test( "should not place ship next to another ship", () => {

    const illegalShipPlacement = gameboardMethods.placeShip( [2, 1] )( 3 )( "horizontal" )( boardWithAShip );

    expect.assertions( 1 );

    expect( illegalShipPlacement.board[ 2 ][ 1 ] )
      .toEqual( "_" );

  } );

  test( "should place multiple ships", () => {

    const boardWithTwoShips = gameboardMethods.placeShip( [4, 4] )( 4 )( "horizontal" )( boardWithAShip );

    expect.assertions( 2 );

    expect( boardWithTwoShips.ships.length )
      .toEqual( 2 );
    expect( boardWithTwoShips.board[ 4 ][ 4 ] )
      .toHaveProperty( "isSunk", false );

  } );

  test( "should place a ship on the rim of the board", () => {

    const boardWithShipOnRim = gameboardMethods.placeShip( [0, 0] )( 3 )( "horizontal" )( sampleBoard );

    expect.assertions( 1 );

    expect( boardWithShipOnRim.board[ 0 ][ 0 ] )
      .toHaveProperty( "length", 3 );

  } );

} );

describe( "hit logic", () => {

  test( "should receive a hit and return changed board", () => {

    expect.assertions( 2 );

    expect( attack.ships )
      .toEqual( [{
        hitCount: 1,
        isSunk  : false,
        length  : 3,
        position: { direction: "horizontal", position: [1, 1] },
      }] );
    expect(
      attack.board[ 1 ][ 1 ]
    )
      .toHaveProperty( "isSunk", false );

  } );

  test( "should sink a ship", () => {

    const sunk = gameboardMethods.receiveAttack( [1, 3] )( gameboardMethods.receiveAttack( [1, 2] )( attack ) );
    expect.assertions( 1 );

    expect( sunk.ships )
      .toContainEqual( {
        hitCount: 3,
        isSunk  : true,
        length  : 3,
        position: { direction: "horizontal", position: [1, 1] },
      } );

  } );

} );

describe( "miss logic", () => {

  test( "should record a missed shot", () => {

    const missed = gameboardMethods.receiveAttack( [0, 1] )( attack );
    expect.assertions( 1 );

    expect( missed.board[ 0 ][ 1 ] )
      .toBe( "X" );

  } );

} );

describe( "game end logic", () => {

  test( "should return true if all ships are sunk", () => {

    const sunk = gameboardMethods.receiveAttack( [1, 3] )( gameboardMethods.receiveAttack( [1, 2] )( attack ) );
    expect.assertions( 1 );

    expect( gameboardMethods.isGameOver( sunk ) )
      .toBe( true );

  } );

  test( "should return false if all ships are not sunk", () => {

    expect.assertions( 1 );

    expect( gameboardMethods.isGameOver( attack ) )
      .toBe( false );

  } );

} );
