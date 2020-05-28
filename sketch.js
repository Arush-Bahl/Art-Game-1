
var database;


var prevX, prevY;

function setup() {
  createCanvas(1200, 600);

  background(255, 255, 255);
  stroke(0);
  fill(0)

  database = firebase.database();
  // console.log(firebase);

  var ballRef = database.ref('brush/position');
  ballRef.on("value", readPosition);
}

function draw() {
  // drawSprites();


}

function mouseReleased() {
  prevX = null;
  prevY = null;
}

function mouseDragged() {

  if (!prevX) {
    changePosition(-1, -1, mouseX, mouseY);
  } else if (prevX !== mouseX || prevY !== mouseY) {
    changePosition(prevX, prevY, mouseX, mouseY)
    // console.log(prevX, prevY, mouseX, mouseY)
  }

  prevX = mouseX;
  prevY = mouseY;


  // database.ref('brush/position').set({
  //   "x": mouseY,

  //   "y": mouseY,

  //   "prevX": prevX,

  //   "prevY": prevY

  // })

}

function changePosition(x, y, newX, newY) {

  database.ref('brush/position').set({
    "x": x,
    "y": y,
    "newX": newX,
    "newY": newY

  })
}


function readPosition(data) {

  position = data.val();

  console.log(position);

  var x = position.x;

  var y = position.y;
  var newX = position.newX;
  var newY = position.newY; 

  if (x == -1) {
    point(newX, newY);
  } else {
    line(x, y, newX, newY)
    
  }


}