const Ship        = length =>
  ( {
    hitCount: 0,
    isSunk  : false,
    length,
  } );
const ShipMethods = {
  createShip:
    length =>
      Object.create( Ship( length ) ),
  hit:
    ship =>
      Object.create( ship, {
        hitCount: { value: ship.hitCount + 1 },
        isSunk  : { value: ship.hitCount + 1 === ship.length },
      } ),
};

export default ShipMethods;
