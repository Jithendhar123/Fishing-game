var gameState = "start"
var playButton, playbuttonImage
var bg, bgimage
var fishingrod, fishingrodImage
var fish, fishImage,fish1
var fishGroup
var rockGroup;
var rock, rockImage
 var score = 0
 var life = 3
 var gameOver,gameOverImage;
 var restart, restartImage;

function preload(){
  playButtonImage = loadImage("playbutton.png")
  bgImage = loadImage("background.jpg")
  fishingrodImage = loadImage("fishingrod.png")
  fishImage = loadImage("fish.png")
  rockImage = loadImage("stone.png")
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart button.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  playButton = createSprite(width/2, height-200, 10, 10)
  playButton.addImage(playButtonImage)
  playButton.scale = 0.3

  bg = createSprite(width/2, height/2, width, height)
  bg.addImage(bgImage)
  bg.scale = 0.71
  bg.visible = false

  fishingrod = createSprite(width/2, height/2+200)
  fishingrod.addImage(fishingrodImage)
  fishingrod.scale = 0.7

  gameOver = createSprite(width/2, height/2)
  gameOver.addImage(gameOverImage)
  gameOver.visible = false;

  restart = createSprite(width/2, height/2-100)
  restart.add(restartImage)
  restart.visible = false;
  
  fishGroup = new Group()
  fish1Group = new Group()
  rockGroup = new Group();
  fishingrod.setCollider("rectangle",-20,0,10,400)


}


function draw() {
  fishingrod.debug = true
  background("lightblue");
  frameRate = 50
  drawSprites();
  fishingrod.x = mouseX
  fishingrod.y = mouseY
  if(gameState === "start"){
    strokeWeight(8)
    fill("blue")
   textSize(50)
   text("FISHING GAME", width/2-150, 100)
   playButton.visible = true
   fishingrod.visible = false
  
   if(mousePressedOver(playButton)){
     gameState = "play"
   }
  }
  if(gameState === "play"){
 bg.visible = true
 fill("black")
 textSize(30)
 text("SCORE = "+score, width-300, 100)
 text("LIFE = "+life, width-500, 100)
 playButton.visible = false
 fishingrod.visible = true
 spawnFish();
 spawnFish1();
 spawnRock();

    if(life === 0){
      gameState = "end"
    }


    if(fishingrod.isTouching(fishGroup)||fishingrod.isTouching(fish1Group)){
      score = score+1
      fishGroup.destroyEach();
      fish1Group.destroyEach();
    }

    if(fishingrod.isTouching(rockGroup)){
      life = life-1
      rockGroup[0].destroy();
    }
  }

  if(gameState === "end"){
    fishingrod.destroy();
    fishGroup.destroyEach();
    fish1Group.destroyEach();
    rockGroup.destroyEach();
    gameOver.visible = true;
    restart.visible = true;
    
  }

  
  
 


function spawnFish(){
if (frameCount% 100 === 0){
  fish = createSprite(random(width-600, width+600),random(height-100, height-10))
  fish.addImage(fishImage)
  fish.velocityX = 3
  fish.scale = 0.2
  fish.lifetime = 100
  fishGroup.add(fish)



  
}
}

function spawnFish1(){
  if (frameCount% 200 === 0){
    fish1 = createSprite(random(width-600, width+600),random(height-100, height-10))
    fish1.addImage(fishImage)
    fish1.velocityX = -3
    fish1.scale = 0.2
    fish1.lifetime = 100
    fish1.rotation = -180
    fish1Group.add(fish1)

  
    
  }
  }

  function spawnRock(){
    if(frameCount% 150 === 0){
      rock = createSprite(random(width-610, width+610),random(height-100, height-10))
      rock.addImage(rockImage)
      rock.velocityX = -(5+score/10);
      rock.scale = 0.2;
      rockGroup.add(rock);
    }
  }