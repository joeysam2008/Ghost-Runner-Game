var tower, towerImage;
var door, doorImage, doorsGroup;
var climber, climberImage, climbersGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlockGroup;
var PLAY = 1
var END = 0
var gameState = PLAY;
var spookySound;





function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup(){
 createCanvas (600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY = 2;
  
  ghost = createSprite(200,100,50,50);
  ghost.addImage(ghostImage);
  ghost.scale= 0.4;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
  
}

function draw(){
  background("black")
  
  if(gameState===PLAY){
    spookySound.play();
    
     if(tower.y>400){
     tower.y = 300;
     }
  
    if(keyDown(LEFT_ARROW)){
     ghost.x = ghost.x-3;
     
     }
  
    if(keyDown(RIGHT_ARROW)){
     ghost.x = ghost.x+3;
     
     }
  
    if(keyDown("space")){
    ghost.velocityY = -4;
   
     }
  
    ghost.velocityY = ghost.velocityY + 0.8;
  
    if(climbersGroup.isTouching(ghost)){
     ghost.velocityY=0;
     
     }
  
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
     ghost.destroy();
     gameState=END;
     }

    spawnDoors();
    drawSprites();
    
  }
  if(gameState===END){
    textSize(30);
    fill("yellow");
    stroke("yellow");
    text("Game Over!",230,300)
    spookySound.stop();
     
     }

}

function spawnDoors(){
  
  if(frameCount%200===0){
    door = createSprite(100,-50);
    door.addImage(doorImage);
    door.velocityY= 2
    door.x = Math.round(random(120,400));
    door.lifetime = 300;
    doorsGroup.add(door);
    ghost.depth = door.depth +1;
    
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    climber.velocityY = 2
    climber.x = door.x;
    climber.lifetime = 300;
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 2;
    invisibleBlock.x = climber.x
    invisibleBlock.lifetime = 300; 
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug=true;
    
    
  }
  
}