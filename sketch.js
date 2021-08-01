var bg,bgImg;
var player, shooterImg, shooter_shooting, arrow, arrowGroup, arrowImage;
var bluey,blueGroup, blueImg;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  arrowImage= loadImage("bullet.png");
  bgImg = loadImage("assets/bg.jpeg");
  blueImg= loadImage("assets/zombie.png");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.5;
   player.debug = false;
   player.setCollider("rectangle",0,0,300,300)
  

   arrowGroup = new Group();
   blueGroup= new Group();
}

function draw() {
  background(0); 

  
  if(keyWentDown("space")){
    createArrow();
  }


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
pumpkinBalloon();

if(blueGroup.isTouching(player)){
  player.destroy();
  blueGroup.destroyEach();
  fill("white");
  text("Game Over", 500, 500);
}

if(arrowGroup.isTouching(blueGroup)){
  
  blueGroup.destroyEach();
  arrowGroup.destroyEach();
}

drawSprites();

}

function createArrow(){
  arrow= createSprite(100, 100, 60, 10);
arrow.addImage(arrowImage);
arrow.x = 360;
arrow.y=player.y;
arrow.velocityX = 4;           
arrow.lifetime = 250;
arrow.scale = 0.2;
arrow.debug=false;
arrow.setCollider("circle",20,20,100);
arrowGroup.add(arrow);
 
}

function pumpkinBalloon(){
  if(frameCount%250===0){
  bluey = createSprite(displayWidth,Math.round(random(20,displayHeight)),10,10);
  bluey.addImage(blueImg);
  bluey.velocityX=-4;
  bluey.lifetime=250;
  bluey.scale=0.3;
  blueGroup.add(bluey)
  }
  
}