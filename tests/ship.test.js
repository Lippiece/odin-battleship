/* eslint-disable fp/no-nil, fp/no-unused-expression */
import { describe, expect, test } from "vitest";

import ShipMethods from "../src/ship";

describe( "ship factory", () => {

  test( "should return an object", () => {

    expect.assertions( 1 );
    expect( ShipMethods.createShip( 4 ) )
      .toBeInstanceOf( Object );

  } );

  test( "should return length, hit count and sunk status properties", () => {

    expect.assertions( 3 );
    const ship = ShipMethods.createShip( 4 );

    expect( ship )
      .toHaveProperty( "length" );

    expect( ship )
      .toHaveProperty( "hitCount" );

    expect( ship )
      .toHaveProperty( "isSunk" );

  } );

} );

describe( "ship methods", () => {

  test( "should return its properties changed after hit()", () => {

    expect.assertions( 2 );
    const ship = ShipMethods.createShip( 4 );

    expect( ShipMethods.hit( ship ).hitCount )
      .toBe( 1 );

    expect( ShipMethods.hit( ship ) )
      .toHaveProperty( "isSunk", false );

  } );

  test( "should return true if ship is sunk after hit()", () => {

    expect.assertions( 1 );
    const ship = ShipMethods.createShip( 1 );

    expect( ShipMethods.hit( ship ) )
      .toHaveProperty( "isSunk", true );

  } );

} );
