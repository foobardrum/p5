function Circle(x,y,up,right,bottom,left, color){
  this.x = x;
  this.y = y;
  this.diameter = 10; //30
  this.history = [];
  this.up = up;
  this.right = right;
  this.bottom = bottom;
  this.left = left;
  this.color = color;

  this.update = function(){
    if (keyIsDown(this.left) && this.x > this.diameter/2){
      this.x-=5;
      this.check(this);
      for (var i = 0; i < circles.length; i++) {
        if (i == 0){
          circles[0].check(circles[1]);
        }
        if (i == 1){
          circles[1].check(circles[0]);
        }
      };
      this.history.push({x: this.x, y:this.y});};
    if (keyIsDown(this.right) && this.x < (windowWidth-5-this.diameter/2)){
      this.x+=5;
      this.check(this);
      for (var i = 0; i < circles.length; i++) {
        if (i == 0){
          circles[0].check(circles[1]);
        }
        if (i == 1){
          circles[1].check(circles[0]);
        }
      };
      this.history.push({x: this.x, y:this.y});};
    if (keyIsDown(this.up) && this.y > this.diameter/2){
      this.y-=5;
      this.check(this);
      for (var i = 0; i < circles.length; i++) {
        if (i == 0){
          circles[0].check(circles[1]);
        }
        if (i == 1){
          circles[1].check(circles[0]);
        }
      };
      this.history.push({x: this.x, y:this.y});};
    if (keyIsDown(this.bottom) && this.y < (windowHeight-5-this.diameter/2)){
      this.y+=5;
      this.check(this);
      for (var i = 0; i < circles.length; i++) {
        if (i == 0){
          circles[0].check(circles[1]);
        }
        if (i == 1){
          circles[1].check(circles[0]);
        }
      };
      this.history.push({x: this.x, y:this.y});};
  }
  this.check = function(element){
    for (var i = 0; i < element.history.length-2; i++ ){
      var distance = dist(this.x, this.y, element.history[i].x, element.history[i].y);
      if (distance < (this.diameter)){
        noLoop()
        stroke(this.color)
        strokeWeight(5)
        fill(255)
        rect(windowWidth/2-200, windowHeight/2-125, 400, 250)
        noStroke()
        fill(35, 35, 41)
        textFont("Verdana");
        textSize(14);
        textStyle(BOLD);
        textAlign(CENTER);
        text("Du hast verloren!\n Drücke F5, um noch einmal zu spielen.",windowWidth/2-160,windowHeight/2-30,320,250)
      }

    }
  }
  this.show = function(){
    fill(this.color)
    ellipse(this.x, this.y, this.diameter, this.diameter)
  }
};
var obstacles = [];
var circles = [];
function Obstacle(){
  this.diameter = 30;
  this.x = random(this.diameter/2, width);
  this.y = random(this.diameter/2, height);

  this.disp = function(){
    //this.x += random(-3,3);
    //this.y += random(-3,3);
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
};

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(35, 35, 41)
  for (var i = 0; i < 50; i++) {
    obstacles.push(new Obstacle());
  }
    circles.push(new Circle(floor(random(width)),floor(random(height)),UP_ARROW,RIGHT_ARROW, DOWN_ARROW, LEFT_ARROW, color(241, 139, 34)));
    circles.push(new Circle(floor(random(width)),floor(random(height)), 87,68,83,65, color(55, 231, 27)));
noStroke()
fill(59, 167, 228);
rect(windowWidth-50,windowHeight-50,50,50);
}
function draw() {
  //background(35, 35, 41)
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].disp();
  }
  for (var i = 0; i < circles.length; i++) {
    circles[i].update();
  if (circles[i].x+circles[i].diameter/2 >= width-50 && circles[i].y+circles[i].diameter/2 >= height-50){
    noLoop()
    stroke(circles[i].color)
    strokeWeight(5)
    fill(255)
    rect(windowWidth/2-200, windowHeight/2-125, 400, 250)
    noStroke()
    fill(35, 35, 41)
    textFont("Verdana");
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER);
    text("Du hast gewonnen!\n Drücke F5, um noch einmal zu spielen ;)",windowWidth/2-160,windowHeight/2-30,320,250)
  }
  for (var j = 0; j < obstacles.length; j++) {
    d = dist(circles[i].x, circles[i].y, obstacles[j].x, obstacles[j].y);
    if (d < (circles[i].diameter/2 + obstacles[j].diameter/2)){
        noLoop()
        stroke(circles[i].color)
        strokeWeight(5)
        fill(255)
        rect(windowWidth/2-200, windowHeight/2-125, 400, 250)
        noStroke()
        fill(35, 35, 41)
        textFont("Verdana");
        textSize(14);
        textStyle(BOLD);
        textAlign(CENTER);
        text("Du hast verloren!\n Drücke F5, um noch einmal zu spielen.",windowWidth/2-160,windowHeight/2-30,320,250)
    }
  }
  circles[i].show();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
