var prota, protaA;
var PLAY=1;
var END=2;
var car,cargroup;
var gamestate=1;
var mob,mobA,mobG;
var pollo,polloA,pollosG;
var score=0;
var muerte;

function preload(){
    protaA = loadAnimation("New piskel-1.png.png","New Piskel-2.png (1).png","New Piskel-1.png copy.png","New Piskel-4.png.png");
    mobA = loadImage("New Piskel-1.png copy 2.png");
    polloA = loadImage("polllo.png");
    muerte = loadAnimation("muerte.png");
}

function setup() {
 createCanvas(900,700);
 
 
 prota=createSprite(200,200,20,20);
 prota.addAnimation("walking", protaA);
 prota.scale = 2;
 prota.setCollider("circle",0,5,15);
 //prota.debug = true;

 cargroup = new Group();
 mobG = new Group();
 pollosG = new Group();
}

function draw() {
 background(0);
 textSize(15);
 text("puntuacion:"+score,700,100);
 if(gamestate === PLAY){
    rayas();
    mobs();
    pollos();
    text("objetivo:recoger los pollos",420,30);
    if(keyDown("s")){
         prota.y = prota.y + 3.5;
    }
    if(keyDown("w")){
        prota.y = prota.y + -3.5;
    }
    if(pollosG.isTouching(prota)){
     pollosG.destroyEach();
     score = score+2;   
    }
    if(mobG.isTouching(prota)){
      gamestate=END;
    }
 }
 if(gamestate===END){
     mobG.setVelocityXEach(0);
     pollosG.setVelocityXEach(0);
     mobG.setLifetimeEach(-1);
     pollosG.setLifetimeEach(-1);
     cargroup.setLifetimeEach(-1);
     cargroup.setVelocityXEach(0);

     text("game over",430,400);
     
     prota.changeAnimation(muerte);
 }
 drawSprites();

}

function rayas(){
    if(frameCount%30 === 0){
        car = createSprite(1000,350,50,30);
        car.velocityX = -6;
        car.shapeColor = "white";
        car.depth=prota.depth;
        prota.depth= prota.depth+2;
        car.lifetime= 1200;
        cargroup.add(car);
    }
}
function mobs(){
    if(frameCount%20 === 0){
        mob=createSprite(1000,Math.round(random(10,690)));
        mob.scale = 2.5;
        mob.addImage(mobA);
        mob.velocityX = -6;
        mob.setCollider("circle",-4,2,6)
        mob.lifetime = 1200;
        //mob.debug = true;
        mobG.add(mob);
    }
}

function pollos(){
    if(frameCount%150 === 0){
        pollo=createSprite(1200,Math.round(random(10,690)));
        pollo.scale = 2.5;
        pollo.addImage(polloA);
        pollo.velocityX = -6;
        pollo.setCollider("circle",-4,2,6)
        pollo.lifetime = 1200;
        //pollo.debug = true;
        pollosG.add(pollo);
    }
}