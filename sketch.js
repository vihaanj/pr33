var dog,dogimg,happyDog,foodS,foodStock,database;

function preload()
{
	dogimg=loadImage("images/Dog.png");
  happydog=loadImage("images/happydog.png");
}

function setup() {
  //Connecting to the database
  database=firebase.database();

	createCanvas(500, 500);

  //Creating Dog
   dog = createSprite(250,300,150,150);
   dog.addImage("dog",dogimg);
   dog.scale=0.15;
   foodStock=database.ref('food');
   foodStock.on("value",readStock);
  textSize(10);
}


function draw() {  

  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

  
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }
  
  database.ref('/').update({
    food:x
  })
}


