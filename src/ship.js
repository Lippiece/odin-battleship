const Ship        = length =>
  ( {
    hitCount: 0,
    isSunk  : false,
    length,
  } );
const shipMethods = {
  createShip:
    length =>
      Object.create( Ship( length ) ),
  hit:
    ship =>
      ( {
        ...ship,
        hitCount: ship.hitCount + 1,
        isSunk  : ship.hitCount + 1 === ship.length,
      } ),
};

export default shipMethods;
