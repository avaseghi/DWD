// Video snapshot

var video;
var canvas;

function setup() {

  // Make a canvas
  canvas = createCanvas(320, 240);
  background(0);
  canvas.parent('video');

  // Make a video elements
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.parent('video');

  // Make a button
  var button = createButton('snap');
  button.parent('button');
  // When you click the button
  button.mousePressed(snap);
}

// Copy a snapshot of the video onto the canvas
function snap() {
  image(video, 0, 0, width, height);
  var thedata = canvas.elt.toDataURL();
  httpPost("/saveframe", {"image": thedata}, 'json', dataPosted, postErr);
}

function dataPosted(result) {
  console.log(result);
}

function postErr(err) {
  console.log(err)
}
