function loadLevelData(){
  var levels = [
                                    //nivel 1
    new Level([],
    [
      new Vector(130, 94),       //comidas
      new Vector(130, 123),
      new Vector(330, 123),
      new Vector(561, 195),
      new Vector(450, 193),
      new Vector(330, 233),
      new Vector(210, 293),
      new Vector(450, 343),
      new Vector(561, 435),
      new Vector(461, 435),
      new Vector(421, 435),
      new Vector(391, 435)]),
                                      //nivel 2
    new Level([                      //obstaculos
      new Obstacle(new Vector(2, 45), 240, 2),
      new Obstacle(new Vector(2, 55), 220, 2),
      new Obstacle(new Vector(240, 47), 2, 158),
      new Obstacle(new Vector(220, 57), 2, 168),
      new Obstacle(new Vector(242,203 ),20 ,2 ),
      new Obstacle(new Vector(222,223 ),40 ,2 ),
      new Obstacle(new Vector(262,194 ), 6,11 ),
      new Obstacle(new Vector(262,223 ), 6 ,11 ),
      new Obstacle(new Vector(457,141 ),2 ,340 ),
      new Obstacle(new Vector(512, 265),128 ,2 ),
      new Obstacle(new Vector(518,339 ),2 ,141 )
    ],
      [                              //comidas
      new Vector(433, 116),
      new Vector(573, 166),
      new Vector(603, 256 ),
      new Vector(473, 236 ),
      new Vector(473,406 ),
      new Vector(623,466 ),
      new Vector(553,456 ),
      new Vector(573,376 ),
      new Vector(543,356 ),
      new Vector(573,356 )
    ])];


  return levels;
}