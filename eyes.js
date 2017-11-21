// *I C U* Created a magnetic field that turns into eyeballs staring at the mouse. This took awhile to figure out. 
// I approached this problem trying to design the eye shape first, then created a grid layout, then tried to create a magnetic attraction 
// with the mouse. I couldn't incorporate the attraction feature with the code I had. I found a p5 example that shows magnetic attraction using 
// arctan2(). Using this, I started from scratch approaching the design differently by attempting to code one eye ball with magnetic attraction. Then 
// going on and creating multiple eyes in grid form. (This worked a lot better! Move mouse around, click and hold for eyes!)


// This helped alot! https://p5js.org/examples/math-arctangent.html 
// You learned angle=arctan2() rotate(angle) used for magnetic atraction. arc() used for narrow eye shape. Needed two arc(), one for
// top half of eye, one for bottom half of eye, and meet them halfway to show shape.
var eye;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() { 
  // use translate of the whole thing to adjust and show all the dots on the canvas.
  translate(20,20);

  // when click, it turns black showing eyeballs
  if(mouseIsPressed) {
    background(0);
  } else {
    background(255);
  }

  // putting in grid form. skip rows and cols by 100 so it's grid like. don't go up by ++ or dots will be next to eachother
  for(var rows= 0; rows < windowHeight; rows+=100){
    for(var cols = 0; cols < windowWidth; cols+=100){
      eye = new Eye(cols, rows, 40);
      eye.update(mouseX, mouseY);
      eye.show();
    }
  } 
}


class Eye {
  constructor(px, py, s){
    this.x = px;
    this.y = py;
    this.size = s;
    this.angle = 0;
  }
  
  // Got  this equation from this example: https://p5js.org/examples/math-arctangent.html
  update(mx, my) {
      this.angle = atan2(my - this.y, mx - this.x);
  }


  // shape of eye
  show() {
    // the push() and pop() and translate() are all needed and used in the artan example link.
    push();
    // need this for the position of the pupil and eye shape.
    translate(this.x, this.y);

    // ///////////EYE SHAPE///////////////
    noStroke();
    // had to opac to 0 so you can have that illusion that pupil is above the eye shape
    fill(255);
    // bottom arc: adjust it to go up with negative numbers(this shows bottom a circle) The x and y do matter but translate matters
    // most
    arc(0, - 10, this.size, this.size, .5, PI-.5);
    // top arc: adjust it to go down with positive numbers(this shows top half of circle)
    arc(0, 10, this.size, this.size, PI+.5, -.5);

    // ///////////PUPIL SHAPE///////////////
    // this is the angle used to rotate the pupil only.
    rotate(this.angle);
    fill(0);
    // got the ellipse parameters from the p5 example
    ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
    pop();
  }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

