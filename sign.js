(function () {
  window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimaitonFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  var canvas = document.getElementById("sig-canvas");
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#222222";
  ctx.lineWidth = 4;

  // Creating a rectangle
  // ctx.beginPath();
  // ctx.rect(10,10,150,80);
  // ctx.stroke();

  // function drawRect(){
  //   var canvas = document.getElementById("sig-canvas");
  //   var ctx = canvas.getContext("2d");
  //   // console.log("Chl ja bhai");
  //   ctx.beginPath();
  //   ctx.rect(10,10,150,80);
  //   ctx.stroke();
  // }

  // var drawRet = document.getElementById('drawRect');
  // drawRet.addEventListener("onclick", drawRect);

  // Creating a rectangle through function

  // let drawRect = document.getElementById('drawRect').addEventListener('onclick',drawRect);
  // // drawRect.addEventListener('onclick', drawRect);
  // function drawRect() {
  //   // drawRect.style.color = "red";
  //   ctx.beginPath();
  //   ctx.rect(10,10,150,80);
  //   ctx.stroke();
  // }


  var drawing = false;
  var mousePos = {
    x: 0,
    y: 0
  };
  var lastPos = mousePos;

  canvas.addEventListener("mousedown", function (e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
  }, false);

  canvas.addEventListener("mouseup", function (e) {
    drawing = false;
  }, false);

  canvas.addEventListener("mousemove", function (e) {
    mousePos = getMousePos(canvas, e);
  }, false);

  // Add touch event support for mobile
  canvas.addEventListener("touchstart", function (e) {

  }, false);

  canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var me = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var me = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(me);
  }, false);

  canvas.addEventListener("touchend", function (e) {
    var me = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(me);
  }, false);

  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top
    }
  }

  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    }
  }

  function renderCanvas() {
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
      lastPos = mousePos;
    }
  }

  // Prevent scrolling when touching the canvas
  document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, false);

  (function drawLoop() {
    requestAnimFrame(drawLoop);
    renderCanvas();
  })();

  function clearCanvas() {
    canvas.width = canvas.width;
  }

  // Set up the UI
  var sigText = document.getElementById("sig-dataUrl");
  var sigImage = document.getElementById("sig-image");
  var clearBtn = document.getElementById("sig-clearBtn");
  var submitBtn = document.getElementById("sig-submitBtn");
  clearBtn.addEventListener("click", function (e) {
    clearCanvas();
    sigText.innerHTML = "Data URL for your signature will go here!";
    sigImage.setAttribute("src", "");
  }, false);
  submitBtn.addEventListener("click", function (e) {
    var dataUrl = canvas.toDataURL();
    sigText.innerHTML = dataUrl;
    sigImage.setAttribute("src", dataUrl);
  }, false);

})();


// this function will draw rectangle on clicking button
function drawRect() {
  var canvas = document.getElementById("sig-canvas");
  var ctx = canvas.getContext("2d");
  // console.log("Chl ja bhai");
  ctx.beginPath();
  ctx.rect(10, 10, 150, 80);
  ctx.stroke();
  // ctx.setAttribute('id','myRect');
  // canvas.setAttribute("textarea","textarea");

}


// Drag and Drop
function moveDiv() {
  const el = document.querySelector('.item');

  el.addEventListener('mousedown', mousedown);
  let isResizing = false;

  function mousedown(e) {

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    let prevX = e.clientX;  // 2
    let prevY = e.clientY;  // 2

    function mousemove(e) {
      if (!isResizing) {
        let newX = prevX - e.clientX;   // 2 - 3 = -1
        let newY = prevY - e.clientY;   // 2 - 2 = 0

        const rect = el.getBoundingClientRect();

        el.style.left = rect.left - newX + "px"; // 200 - - 1 = 201
        el.style.top = rect.top - newY + "px";

        prevX = e.clientX;
        prevY = e.clientY;
      }
    }

    function mouseup() {
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('mouseup', mouseup);

    }
  }


  const resizers = document.querySelectorAll('.resizer');

  let currentResizer;

  for (let resizer of resizers) {
    resizer.addEventListener('mousedown', mousedown)

    function mousedown(e) {
      currentResizer = e.target;
      isResizing = true;
      let prevX = e.clientX;
      let prevY = e.clientY;

      window.addEventListener('mousemove', mousemove);
      window.addEventListener('mouseup', mouseup);

      function mousemove(e) {
        const rect = el.getBoundingClientRect();

        if (currentResizer.classList.contains('se')) {
          el.style.width = rect.width - (prevX - e.clientX) + "px";
          el.style.height = rect.height - (prevY - e.clientY) + "px";
        }
        else if (currentResizer.classList.contains('sw')) {
          el.style.width = rect.width + (prevX - e.clientX) + "px";
          el.style.height = rect.height - (prevY - e.clientY) + "px";
          el.style.left = rect.left - (prevX - e.clientX) + "px";
        }
        else if (currentResizer.classList.contains('ne')) {
          el.style.width = rect.width - (prevX - e.clientX) + "px";
          el.style.height = rect.height + (prevY - e.clientY) + "px";
          el.style.top = rect.top - (prevY - e.clientY) + "px";
        }
        else {
          el.style.width = rect.width + (prevX - e.clientX) + "px";
          el.style.height = rect.height + (prevY - e.clientY) + "px";
          el.style.top = rect.top - (prevY - e.clientY) + "px";
          el.style.left = rect.left - (prevX - e.clientX) + "px";
        }

        prevX = e.clientX;
        prevY = e.clientY;
      }

      function mouseup() {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
        isResizing = false;
      }
    }
  }
}

// Text Functionality


// var type = document.getElementById('type');
// // var type = document.getElementsByClassName('item');

// type.addEventListener('click', function () {
//   let noTextArea = document.getElementsByClassName('textarea').length;
//   if (noTextArea == 0) {
//     let html = type.innerHTML;
//     type.innerHTML = `<textarea class="textarea form-control" id = "textarea" rows = "3">${html}</textarea>`;
//   }
//   //Listen for the blur event on textarea
//   let textarea = document.getElementById('textarea')
//   console.log(textarea);
//   textarea.addEventListener('blur', function () {
//     type.innerHTML = textarea.value;
//     localStorage.setItem('text', textarea.value);
//   })
// });


/*
var hello;
function helo(){
  var a = 25;
  this.hello = a;
}

helo();
console.log(hello);
*/

//adfaff///

// Ball Drag
function dragBall() {
  let currentDroppable = null;

  ball.onmousedown = function (event) {

    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;

    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    document.body.append(ball);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      ball.style.left = pageX - shiftX + 'px';
      ball.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      ball.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      ball.hidden = false;

      if (!elemBelow) return;

      let droppableBelow = elemBelow.closest('.droppable');
      if (currentDroppable != droppableBelow) {
        if (currentDroppable) { // null when we were not over a droppable before this event
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) { // null if we're not coming over a droppable now
          // (maybe just left the droppable)
          enterDroppable(currentDroppable);
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    ball.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      ball.onmouseup = null;
    };

  };

  function enterDroppable(elem) {
    elem.style.background = 'pink';
  }

  function leaveDroppable(elem) {
    elem.style.background = '';
  }

  ball.ondragstart = function () {
    return false;
  };
}
// ~~~~~~~~~~~~~~~~~

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var rect = {
  x: 150,
  y: 100,
  w: 120,
  h: 60
},
  handlesSize = 8,
  currentHandle = false,
  drag = false;

function init() {
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false);
}

function point(x, y) {
  return {
    x: x,
    y: y
  };
}

function dist(p1, p2) {
  return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
}

function getHandle(mouse) {
  console.log(mouse);
  if (dist(mouse, point(rect.x, rect.y)) <= handlesSize) return 'topleft';
  if (dist(mouse, point(rect.x + rect.w, rect.y)) <= handlesSize) return 'topright';
  if (dist(mouse, point(rect.x, rect.y + rect.h)) <= handlesSize) return 'bottomleft';
  if (dist(mouse, point(rect.x + rect.w, rect.y + rect.h)) <= handlesSize) return 'bottomright';
  if (dist(mouse, point(rect.x + rect.w / 2, rect.y)) <= handlesSize) return 'top';
  if (dist(mouse, point(rect.x, rect.y + rect.h / 2)) <= handlesSize) return 'left';
  if (dist(mouse, point(rect.x + rect.w / 2, rect.y + rect.h)) <= handlesSize) return 'bottom';
  if (dist(mouse, point(rect.x + rect.w, rect.y + rect.h / 2)) <= handlesSize) return 'right';
  if (dist(mouse, point(rect.x + rect.w / 2, rect.y + rect.h / 2)) <= handlesSize) return 'center';
  return false;
}

function mouseDown(e) {
  if (currentHandle) drag = true;
  draw();
}

function mouseUp() {
  drag = false;
  currentHandle = false;
  draw();
}

function mouseMove(e) {
  var previousHandle = currentHandle;
  if (!drag) currentHandle = getHandle(point(e.pageX - this.offsetLeft, e.pageY - this.offsetTop));
  if (currentHandle && drag) {
    var mousePos = point(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    switch (currentHandle) {
      case 'topleft':
        rect.w += rect.x - mousePos.x;
        rect.h += rect.y - mousePos.y;
        rect.x = mousePos.x;
        rect.y = mousePos.y;
        break;
      case 'topright':
        rect.w = mousePos.x - rect.x;
        rect.h += rect.y - mousePos.y;
        rect.y = mousePos.y;
        break;
      case 'bottomleft':
        rect.w += rect.x - mousePos.x;
        rect.x = mousePos.x;
        rect.h = mousePos.y - rect.y;
        break;
      case 'bottomright':
        rect.w = mousePos.x - rect.x;
        rect.h = mousePos.y - rect.y;
        break;

      case 'top':
        rect.h += rect.y - mousePos.y;
        rect.y = mousePos.y;
        break;

      case 'left':
        rect.w += rect.x - mousePos.x;
        rect.x = mousePos.x;
        break;

      case 'bottom':
        rect.h = mousePos.y - rect.y;
        break;

      case 'right':
        rect.w = mousePos.x - rect.x;
        break;
      case 'center':
        rect.x = mousePos.x - rect.w / 2;
        rect.y = mousePos.y - rect.h / 2;
        break;
    }
  }
  if (drag || currentHandle != previousHandle) draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'green';
  // ctx.stroke();
  ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);


  if (currentHandle) {
    var posHandle = point(0, 0);
    switch (currentHandle) {
      case 'topleft':
        posHandle.x = rect.x;
        posHandle.y = rect.y;
        break;
      case 'topright':
        posHandle.x = rect.x + rect.w;
        posHandle.y = rect.y;
        break;
      case 'bottomleft':
        posHandle.x = rect.x;
        posHandle.y = rect.y + rect.h;
        break;
      case 'bottomright':
        posHandle.x = rect.x + rect.w;
        posHandle.y = rect.y + rect.h;
        break;
      case 'top':
        posHandle.x = rect.x + rect.w / 2;
        posHandle.y = rect.y;
        break;
      case 'left':
        posHandle.x = rect.x;
        posHandle.y = rect.y + rect.h / 2;
        break;
      case 'bottom':
        posHandle.x = rect.x + rect.w / 2;
        posHandle.y = rect.y + rect.h;
        break;
      case 'right':
        posHandle.x = rect.x + rect.w;
        posHandle.y = rect.y + rect.h / 2;
        break;
      case 'center':
        posHandle.x = rect.x + rect.w / 2;
        posHandle.y = rect.y + rect.h / 2;
        break;
    }
    ctx.globalCompositeOperation = 'xor';
    ctx.beginPath();
    ctx.arc(posHandle.x, posHandle.y, handlesSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

  }

}

init();
draw();



// // Grid Paper in Canvas

// var cnv = document.getElementById('grid');
// var ctx = cnv.getContext("2d");

// // Small Units
// for (var i = 5; i <= 605; i=i+6)
// {
//   // Vertical Lines
//   ctx.moveTo(i,5);
//   ctx.lineTo(i,605);

//   // Horizontal Lines
//   ctx.moveTo(5,i);
//   ctx.lineTo(605,i);

//   ctx.strokeStyle = "#f0f0f0"
//   ctx.stroke();
// }

// // Major Units
// ctx.beginPath();
// for (var i = 5; i <= 605; i=i+30)
// {
//   // Vertical Lines
//   ctx.moveTo(i,5);
//   ctx.lineTo(i,605);

//   // Horizontal Lines
//   ctx.moveTo(5,i);
//   ctx.lineTo(605,i);
//   ctx.strokeStyle = "#c0c0c0";
//   ctx.stroke();
// }






// Animated Clock
function clock() {
  var now = new Date();
  var ctx = document.getElementById('canvasClock').getContext('2d');
  ctx.save();
  ctx.clearRect(0, 0, 150, 150);
  ctx.translate(75, 75);
  ctx.scale(0.4, 0.4);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';

  // Hour marks
  ctx.save();
  for (var i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  // Minute marks
  ctx.save();
  ctx.lineWidth = 5;
  for (i = 0; i < 60; i++) {
    if (i % 5 != 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr = now.getHours();
  hr = hr >= 12 ? hr - 12 : hr;

  ctx.fillStyle = 'black';

  // write Hours
  ctx.save();
  ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  // write Minutes
  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  // Write seconds
  ctx.save();
  ctx.rotate(sec * Math.PI / 30);
  ctx.strokeStyle = '#D40000';
  ctx.fillStyle = '#D40000';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(83, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#325FA2';
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.restore();

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);



// Solar System using Canvas
var sun = new Image();
var moon = new Image();
var earth = new Image();
function initi() {
  sun.src = 'Canvas_sun.png';
  moon.src = 'Canvas_moon.png';
  earth.src = 'Canvas_earth.png';
  window.requestAnimationFrame(drawing);
}

function drawing() {
  var ctx = document.getElementById('canvasSolar').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 300, 300); // clear canvas

  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  ctx.save();
  ctx.translate(150, 150);

  // Earth
  var time = new Date();
  ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 40, 24); // Shadow
  ctx.drawImage(earth, -12, -12);

  // Moon
  ctx.save();
  ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5);
  ctx.restore();

  ctx.restore();

  ctx.beginPath();
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
  ctx.stroke();

  ctx.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(drawing);
}

initi();


// Placing a canvas above divs
var placeCanvas = document.getElementById('placeCanvas');
var context12 = placeCanvas.getContext('2d');

context12.beginPath();
context12.moveTo(100, 150);
context12.lineTo(350, 50);
context12.stroke();


window.onload = function () {
  initDragElement();
  initResizeElement();
  moveDiv();
  dragBall();
  // toType();
  // drawTable();
};

function initDragElement() {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var popups = document.getElementsByClassName("popup");
  var elmnt = null;
  var currentZIndex = 100; //TODO reset z index when a threshold is passed

  for (var i = 0; i < popups.length; i++) {
    var popup = popups[i];
    var header = getHeader(popup);

    popup.onmousedown = function () {
      this.style.zIndex = "" + ++currentZIndex;
    };

    if (header) {
      header.parentPopup = popup;
      header.onmousedown = dragMouseDown;
    }
  }

  function dragMouseDown(e) {
    elmnt = this.parentPopup;
    elmnt.style.zIndex = "" + ++currentZIndex;

    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    if (!elmnt) {
      return;
    }

    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function getHeader(element) {
    var headerItems = element.getElementsByClassName("popup-header");

    if (headerItems.length === 1) {
      return headerItems[0];
    }

    return null;
  }
}

function initResizeElement() {
  var popups = document.getElementsByClassName("popup");
  var element = null;
  var startX, startY, startWidth, startHeight;

  for (var i = 0; i < popups.length; i++) {
    var p = popups[i];

    var right = document.createElement("div");
    right.className = "resizer-right";
    p.appendChild(right);
    right.addEventListener("mousedown", initDrag, false);
    right.parentPopup = p;

    var bottom = document.createElement("div");
    bottom.className = "resizer-bottom";
    p.appendChild(bottom);
    bottom.addEventListener("mousedown", initDrag, false);
    bottom.parentPopup = p;

    var both = document.createElement("div");
    both.className = "resizer-both";
    p.appendChild(both);
    both.addEventListener("mousedown", initDrag, false);
    both.parentPopup = p;
  }

  function initDrag(e) {
    element = this.parentPopup;

    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );
    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
  }

  function doDrag(e) {
    element.style.width = startWidth + e.clientX - startX + "px";
    element.style.height = startHeight + e.clientY - startY + "px";
  }

  function stopDrag() {
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup", stopDrag, false);
  }
}

function toType() {
  //Create a new element
  let divElem = document.createElement('div');

  // Add text to that created element
  let val = localStorage.getItem('text');
  let text;
  if (val == null) {
    text = document.createTextNode('This is my element. click to edit it');
  }
  else {
    text = document.createTextNode(val);
  }
  divElem.appendChild(text);

  // Give element id, style and class
  divElem.setAttribute('id', 'elem');
  divElem.setAttribute('class', 'elem');
  divElem.setAttribute('style', 'border : 2px solid black; width : 154px; margin : 34px; padding:23px;');

  // Grab the main container
  let container = document.querySelector('.container1');
  let first = document.getElementById('myfirst');


  //Insert the element before element with id first
  container.insertBefore(divElem, first);

  console.log(divElem, container, first);

  // add event listener to the divElem
  divElem.addEventListener('click', function () {
    let noTextArea = document.getElementsByClassName('textarea').length;
    if (noTextArea == 0) {
      let html = elem.innerHTML;
      divElem.innerHTML = `<textarea class="textarea form-control" id = "textarea" rows = "3">${html}</textarea>`;
    }
    //Listen for the blur event on textarea
    let textarea = document.getElementById('textarea')
    textarea.addEventListener('blur', function () {
      elem.innerHTML = textarea.value;
      localStorage.setItem('text', textarea.value);
    })
  });
}

// Creating Table using JavaScript
function drawTable() {

  var myElem = document.createElement('div');
  myElem.setAttribute('class', 'popup');
  // myElem.setAttribute('id','myElem');

  var childElem1 = document.createElement('div');
  childElem1.setAttribute('class', 'popup-header');
  childElem1.innerHTML = "Click here to move";

  myElem.appendChild(childElem1);

  var myDiv = document.getElementById('myDiv');
  myDiv.appendChild(myElem);

  let table = document.createElement('table');
  // let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  table.setAttribute('id', 'myTable');

  // table.appendChild(thead);
  table.appendChild(tbody);

  // Adding the entire table to the body tag
  myElem.appendChild(table);

  // Creating and adding data to first row of the table
  // const tableHeading = [
  //   {"name": "Sr.No", id:"sno"},
  //   {"name": "Name", id:"name"},
  //   {"name": "Company", id:"company"},
  // ]
  // tableHeading.forEach(header, index => {
  //   let heading_1 = document.createElement('th');
  //   heading_1.innerHTML = "Sr. No.";
  //   row_1.appendChild(heading_1);
  // });


  myArray = [
    ["Sr.No", "Name", "University"],
    ["1.", "Virendar", "SAU"],
    ["2.", "Hansraj", "DTU"],
    ["3.", "Satyam", "JNU"],
    ["4.", "Amreesh", "DU"],
    ["5.", "Afnan", "JMI"],
  ];

  for (let i = 0; i < myArray.length; i++) {
    let row_i = document.createElement('tr');

    for (let j = 0; j < myArray[0].length; j++) {
      let row_i_data_j = document.createElement('td');
      row_i_data_j.innerHTML = myArray[i][j];
      row_i.appendChild(row_i_data_j);
    }
    tbody.appendChild(row_i);
  }

  // let row_1 = document.createElement('tr');

  // let row_1_data_1 = document.createElement('td');
  // row_1_data_1.innerHTML = "Sr. No.";
  // row_1.appendChild(row_1_data_1);

  // let row_1_data_2 = document.createElement('td');
  // row_1_data_2.innerHTML = "Name";
  // row_1.appendChild(row_1_data_2);

  // let row_1_data_3 = document.createElement('td');
  // row_1_data_3.innerHTML = "Company";
  // row_1.appendChild(row_1_data_3);

  // tbody.appendChild(row_1);


  // // Creating and adding data to second row of the table
  // let row_2 = document.createElement('tr');
  // let row_2_data_1 = document.createElement('td');
  // row_2_data_1.innerHTML = "1.";
  // let row_2_data_2 = document.createElement('td');
  // row_2_data_2.innerHTML = "James Clerk";
  // let row_2_data_3 = document.createElement('td');
  // row_2_data_3.innerHTML = "Netflix";

  // row_2.appendChild(row_2_data_1);
  // row_2.appendChild(row_2_data_2);
  // row_2.appendChild(row_2_data_3);
  // tbody.appendChild(row_2);


  // // Creating and adding data to third row of the table
  // let row_3 = document.createElement('tr');
  // let row_3_data_1 = document.createElement('td');
  // row_3_data_1.innerHTML = "2.";
  // let row_3_data_2 = document.createElement('td');
  // row_3_data_2.innerHTML = "Adam White";
  // let row_3_data_3 = document.createElement('td');
  // row_3_data_3.innerHTML = "Microsoft";

  // row_3.appendChild(row_3_data_1);
  // row_3.appendChild(row_3_data_2);
  // row_3.appendChild(row_3_data_3);
  // tbody.appendChild(row_3);

  initDragElement();
  initResizeElement();
}

const btn = document.getElementById('addText');
btn.addEventListener('click', drawTable);


// const btn = document.getElementById('addText');
// btn.addEventListener('click', toWrite);
// function toWrite() {
//   console.log('dsds')
//   document.getElementById('sample').innerHTML = "<table><tr><td id='petCell'><input type='text' id='hobbies' /></td></tr></table>";
//   // document.write("<table><tr><td id='petCell'><input type='text' id='hobbies' /></td></tr></table>");
// }


// document.getElementById("addPet").onclick = function() {
//   var petCell = document.getElementById("petCell");
//   var input = document.createElement("input");
//   input.type = "text";
//   var br = document.createElement("br");
//   petCell.appendChild(input);
//   petCell.appendChild(br);
// }

noOfdiv = 0;
function drawText() {
  noOfdiv++;
  var myElem = document.createElement('div');
  myElem.setAttribute('class', 'popup');
  myElem.setAttribute('id', 'popup'+noOfdiv);
  
  var childElem1 = document.createElement('div');
  childElem1.setAttribute('class', 'popup-header');
  childElem1.innerHTML = "Click here to move";
  
  myElem.appendChild(childElem1);

  // myElem.innerHTML=`<div><textarea class="textarea form-control" id = "textarea" rows = "3"></textarea></div>`
  
  // Adding element on the dom
  var appendHere = document.getElementById('appendHere');
  appendHere.appendChild(myElem);
   
  //Create a new element
  let divElem = document.createElement('div');

  // Add text to that created element
  let val = localStorage.getItem('text');
  let text;
  if (val == null) {
    text = document.createTextNode('This is my element. click to edit it');
  }
  else {
    text = document.createTextNode(val);
  }
  divElem.appendChild(text);

  // Give element id, style and class
  divElem.setAttribute('id', 'elem');
  divElem.setAttribute('class', 'elem');
  divElem.setAttribute('style', 'border : 2px solid black; width : 154px; margin : 34px; padding:23px;');

  // Grab the main container
  let container = document.getElementById('popup'+noOfdiv);

  //Insert the element before element with id first
  container.appendChild(divElem);

  console.log(divElem, container, myElem);

  // add event listener to the divElem
  divElem.addEventListener('click', ()=> {
    let noTextArea = document.getElementsByClassName('textarea').length;
    if (noTextArea == 0) {
      let html = elem.innerHTML;
      divElem.innerHTML = `<textarea class="textarea form-control" id = "textarea" rows = "3">${html}</textarea>`;
    }
    //Listen for the blur event on textarea
    let textarea = document.getElementById('textarea')
    textarea.addEventListener('blur', ()=> {
      elem.innerHTML = textarea.value;
      localStorage.setItem('text', textarea.value);
    })
  });
  
  initDragElement();
  initResizeElement();
  
}

const element = document.getElementById("myBtn");
element.addEventListener("click", drawText);


document.getElementById('btn').addEventListener('click', () => {
  const c1 = document.getElementById('c1');
  const c2 = document.getElementById('c2');
  c2.appendChild(c1.firstElementChild);
  c1.appendChild(c2.firstElementChild);
});
