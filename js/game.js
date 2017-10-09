var Game = {};
var player;
// for web
var easystar = new EasyStar.js();

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};


Game.preload = function() {
    game.load.tilemap('map', 'assets/map/example_map_2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('sprite','assets/sprites/sprite.png');
};

Game.create = function(){
    Game.playerMap = {};
    var testKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    Game.addPlayer(100, 100);
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.events.onInputUp.add(Game.getCoordinates, this);
};

Game.getCoordinates = function(layer, pointer){
    Game.movePlayer(pointer.worldX,pointer.worldY);
};

Game.addPlayer = function(x, y){
    player = game.add.sprite(x, y, 'sprite');
};

Game.movePlayer = function(x, y){
  var m = game.cache.getTilemapData('map').data.layers[0].data;

    var myGrid = new Array();
    for(i=0; i<23; i++){
      myGrid[i] = new Array();
      for(j=0; j<16; j++){
        myGrid[i].push(m[i*j]);
        console.log(myGrid[i][j]);
      }
    }

    easystar.setGrid(myGrid);
    easystar.setAcceptableTiles([11]);
/*
  console.log(Math.floor(player.x/32), Math.floor(player.y/32));
  console.log(Math.floor(x/32), Math.floor(y/32));
*/
    easystar.findPath(Math.floor(player.x/32), Math.floor(player.y/32), Math.floor(x/32), Math.floor(y/32), function( path ) {
    	if (path === null) {
    	 console.log("Path was not found.");
    	} else {
    	 console.log("Path was found.");

        if(this.ismoving === true){
          this.tween.stop();
        }
        i = 0,
        ilen = path.length;
        function moveObject( object ){
          if(path.length > 1){
            object.ismoving = true;
            var StepX = path[i].x || false, StepY = path[i].y || false;
            tween = game.add.tween( object ).to({ x: StepX*32, y: StepY*32}, 150).start();
            tween.onComplete.add(function(){
              i++;
              if(i < ilen){
                moveObject( object );
              }else{
                return false;
              }
            });
          }else{
            //@TODO add emoticon - no path (!)
            this.ismoving = false;
          }
        }
        moveObject(player);
    	}
    });

    easystar.calculate();

};
