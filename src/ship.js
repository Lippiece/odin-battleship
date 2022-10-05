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
      ( {
        hitCount: ship.hitCount + 1,
        isSunk  : ship.hitCount + 1 === ship.length,
        ...ship,
      } ),
};

export default ShipMethods;
