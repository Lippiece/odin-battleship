/* eslint-disable fp/no-nil, fp/no-unused-expression */
import { describe, expect, test } from "vitest";

import gameboardMethods from "../src/gameboard";
import playerMethods from "../src/player";

const player1 = playerMethods.createPlayer( "Alfonso" )( gameboardMethods.createGameboard() );
const player2 = playerMethods.createPlayer( "Bobby" )( gameboardMethods.createGameboard() );
const attack  = playerMethods.attack( player1 )( player2 )( [1, 1] );

describe( "player state", () => {

  test( "should return a player object", () => {

    expect.assertions( 2 );

    expect( player1 )
      .toHaveProperty( "name", "Alfonso" );
    expect( player1 )
      .toHaveProperty( "gameboard" );

  } );

  test( "should create a player with ships", () => {} );

} );

describe( "player actions", () => {

  test( "should be able to attack each", () => {

    expect.assertions( 2 );

    expect( attack )
      .toHaveProperty( "line", player1 );
    expect( attack.turn.gameboard.board[ 1 ][ 1 ] )
      .toBe( "X" );

  } );

} );

describe( "player AI", () => {

  test( "should be able to choose a random coordinate", () => {

    expect.assertions( 1 );

    expect( playerMethods.aiMethods.chooseRandomCoordinates( player1.gameboard.board ) )
      .toHaveLength( 2 );

  } );

  test( "should be able to choose a coordinate near a hit", () => {

    const cellNearHit = playerMethods.aiMethods.selectCellToAttack( attack.turn.gameboard.board );
    expect.assertions( 1 );

    expect( cellNearHit )
      .toHaveLength( 2 );

  } );

  test( "should be able to choose a coordinate to attack", () => {

    const attackCell = playerMethods.aiMethods.selectCellToAttack( attack.turn.gameboard.board );
    expect.assertions( 1 );

    expect( attackCell )
      .toEqual( [0, 1] );

  } );

} );
