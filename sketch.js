var cat;
var maxColorValue = 255;
var minColorValue = 0;

function preload(){
    //Preload Cat model and Texture
    cat = loadModel("assets/cat.obj", true);
    cattexture = loadImage("assets/Cat-texture.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  //Create instructions using a div
  help = createDiv('Move the mouse to change colors.<br> Click and drag to orbit.<br> Scroll to zoom.');
  help.style('position: absolute; width: 25vw; height: 10vh; bottom: 2%; left: 50%; transform: translate(-50%); color: white; text-align: center; font-family: Helvetica; font-size: 1vw');
}

function draw() {
  clear();
    
  //Let the user move around the 3D Space with the mouse
  orbitControl(1, 1, 0.1);
    
  //Change background color moving the mouse
  background(
      map(mouseX, 0, width, maxColorValue, minColorValue),
      map(mouseY, 0, height, maxColorValue, minColorValue),
      map(mouseX, 0, height, minColorValue, maxColorValue)
    );

    // Main light
    directionalLight(
      map(mouseX, 0, height, minColorValue, maxColorValue),
      map(mouseY, 0, height, maxColorValue, minColorValue),
      map(mouseX, 0, width, maxColorValue, minColorValue), 1, 1, 0);
    
    //Secondary Light
    directionalLight(
      map(mouseX, 0, height, minColorValue, maxColorValue),
      map(mouseY, 0, height, maxColorValue, minColorValue),
      map(mouseX, 0, width, maxColorValue, minColorValue), -0.5, 0, 0);

  //Create 80 cats and make them move in a sin function
  for (let j = 0; j < 5; j++) {
    push();
    for (let i = 0; i < 80; i++) {
      translate(
        sin(frameCount * 0.001 + j) * 100,
        sin(frameCount * 0.001 + j) * 100,
        i * 0.1
      );
      rotateZ(frameCount * 0.002);
      push();
      noStroke();
      //Add texture to cat
      texture(cattexture);
      scale(0.4);
      //Load cat
      model(cat);
      pop();
    }
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}