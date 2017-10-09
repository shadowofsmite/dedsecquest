bootState = {
  init: function(){
    game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE,
    game.scale.pageAlignHorizontally = !0,
    game.scale.pageAlignVertically = !0
  },
  preload: function() {
    game.load.image("bar", "assets/sprites/zelda-life.png")
  },
  create: function() {
    game.state.start("load")
  }
},
loadState = {
  preload: function() {
    var a = game.add.image(game.world.centerX, game.world.centerY, "bar");
    a.anchor.setTo(.5, .5);
    game.load.setPreloadSprite(a),
    game.load.image('markus', 'assets/sprites/markus.png');
    game.load.image('menu', 'assets/sprites/MarcusProfile_256169.png');
  },
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE),
    game.stage.backgroundColor = "#000",
    game.state.start("menu")
  }
},
menuState = {
  create: function() {
    game.add.sprite(0, 0, 'menu')
  }
};
//game = new Phaser.Game(320, 240);
var game = new Phaser.Game(24*32, 17*32, Phaser.AUTO, document.getElementById('game'));
console.log(24*32, 17*32);
game.state.add("boot", bootState),
game.state.add("load", loadState),
game.state.add("menu", menuState),
game.state.add("Game", Game),
game.state.start("boot");
