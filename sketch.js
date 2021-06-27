var path,boy,cash,diamonds,jewelry,sword;
var pathImg,boyImg,cashImg,diamondsImg,jewelryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jewelryG,swordGroup;
var gameOver, gameOverImg;

//Game States
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg = loadImage("gameOver.png");
  
}

function setup(){
  
    createCanvas(windowWidth,windowHeight);
    
    // Moving background
    path=createSprite(width/2,200);
    path.addImage(pathImg);
    path.velocityY = 4;
    console.log("BOONAH: width="+width+" windowWith="+windowWidth);

    //creating boy
    boy = createSprite(width/2,height-20,20,20);
    boy.addAnimation("SahilRunning",boyImg);
    boy.scale=0.08;
  
    //game over
    gameOver=createSprite(width/2,220);
    gameOver.addImage(gameOverImg);
    gameOver.visible=false;
    gameOver.scale=width/740;
    
    //Groups
    cashG=new Group();
    diamondsG=new Group();
    jewelryG=new Group();
    swordG=new Group();
}

function draw() {

    if(gameState===PLAY){
      background(0);
      boy.x = World.mouseX;
      edges= createEdgeSprites();
      boy.collide(edges);
      
      //code to reset the background
      if(path.y > height ){
        path.y = height/2;
      }
      
      createCash();
      createDiamonds();
      createjewelry();
      createSword();

      if (cashG.isTouching(boy)) {
          cashG.destroyEach();
          treasureCollection=treasureCollection+50;
      }
      else if (diamondsG.isTouching(boy)) {
              diamondsG.destroyEach();
              treasureCollection=treasureCollection+100;
      
      }else if(jewelryG.isTouching(boy)) {
              jewelryG.destroyEach();
              treasureCollection=treasureCollection+150;
      }else{
      if(swordG.isTouching(boy)) {
        gameState=END;
        gameOver.visible=true;
        diamondsG.destroyEach();
        jewelryG.destroyEach();
        cashG.destroyEach();
        swordG.destroyEach();
    }
  }
  
    drawSprites();
    textSize(20);
    fill("blue");
    text("Treasure: "+ treasureCollection,width/2-50,30);
  }

}

function createCash() {
    if (World.frameCount % 200 == 0) {
      var cash = createSprite(Math.round(random(40, width-40),40, 10, 10));
      cash.addImage(cashImg);
      cash.scale=0.12;
      cash.velocityY = 3;
      cash.lifetime = height-20;
      cashG.add(cash);
    }
  }

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(40, width-40),40,10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = height-20;
    diamondsG.add(diamonds);
  }
}

function createjewelry() {
  if (World.frameCount % 410 == 0) {
    var jewelry = createSprite(Math.round(random(40, width-40),40, 10, 10));
    jewelry.addImage(jewelryImg);
    jewelry.scale=0.13;
    jewelry.velocityY = 3;
    jewelry.lifetime = height-20;
    jewelryG.add(jewelry);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
      var sword = createSprite(Math.round(random(40, width-40),40, 10, 10));
      sword.addImage(swordImg);
      sword.scale=0.1;
      sword.velocityY = 3;
      sword.lifetime = height-20;
      swordG.add(sword);
   }
}