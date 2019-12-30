var cat;
var maxColorValue = 255;
var minColorValue = 0;

function preload(){
    cat = loadModel("assets/cat.obj", true);
    cattexture = loadImage("assets/Cat-texture.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  color(
      map(mouseY, 0, height, maxColorValue, minColorValue),
      map(mouseX, 0, width, maxColorValue, minColorValue),
      map(mouseY, 0, width, minColorValue, maxColorValue)
  );
  help = createDiv('Move the mouse to change colors.<br> Click and drag to orbit.<br> Scroll to zoom.');
  help.style('position: absolute; width: 25vw; height: 10vh; bottom: 2%; left: 50%; transform: translate(-50%); color: white; text-align: center; font-family: Helvetica; font-size: 1vw');
}

function draw() {
  clear();
    
  var help = text('Move the mouse to change the colors. Click and drag to orbit around the cats. Use the scrolling wheel to zoom.', windowWidth/2, windowHeight - 30);
    
  orbitControl(1, 1, 0.1);
    
  background(
      map(mouseX, 0, width, maxColorValue, minColorValue),
      map(mouseY, 0, height, maxColorValue, minColorValue),
      map(mouseX, 0, height, minColorValue, maxColorValue)
    );
    
  directionalLight(
      map(mouseX, 0, height, minColorValue, maxColorValue),
      map(mouseY, 0, height, maxColorValue, minColorValue),
      map(mouseY, 0, height, maxColorValue, minColorValue), -(width / 5 / width - 0.5) * 2, -(2 * height / height - 0.5) * 2, -1);


    // Chest color light
    pointLight(

      map(mouseX, 0, width, maxColorValue, minColorValue),
      map(mouseX, 0, width, minColorValue, maxColorValue),
      map(mouseX, 0, height, minColorValue, maxColorValue), 0, -70, 80);

    // Giving Mao the main colors with lights
    // Main light

    directionalLight(
      map(mouseX, 0, height, minColorValue, maxColorValue),
      map(mouseY, 0, height, maxColorValue, minColorValue),
      map(mouseX, 0, width, maxColorValue, minColorValue), 1, 0.5, 0);

    // Secondary light, smoothens shadows
    directionalLight(
      map(mouseX, 0, height, minColorValue, maxColorValue),
      map(mouseY, 0, height, maxColorValue, minColorValue),
      map(mouseX, 0, width, maxColorValue, minColorValue), -1, 0, 0);

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
      texture(cattexture);
      scale(0.4);
      model(cat);
      pop();
    }
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}