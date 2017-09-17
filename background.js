// samuel clarke 2017/09/17

var grid = []
var xoff = 0;

var isPerlin = true;
var isAlive = true;
var isMonochrome = false;

var choosesShortest = true; // i recommend keeping this to the opposite of isAlive
var colorGoodizer = true;
var mouseControl = true; 
var shouldStroke = false;

var isMullum = true;
var mBlue = 219; // only if isMullum
var mOrange = 170; // only if isMullum

var POINTSx = 10;
var POINTSy = 8;
var EXTS = 3; // generated off the edges so that it doesn't go weird
var RAND = 0.85; // only works with not perlin / random
var COLORSEV = 0.175; // only works with perlin
var MOVESEV = 0.01; // only works with isAlive
var MOVESPEED = 0.05; // only works with isAlive

// SETUP 
function setup() {
   if(isMullum) {
	colorMode(HSB, 255);
   }
   frameRate(2);

   var brect = document.getElementById("body").getBoundingClientRect();
   var canvas = createCanvas(brect.width, brect.height + windowHeight);
   background(66);
   canvas.parent("sketch-holder");
  
   var noff = 0;
   for(var i = -EXTS; i < POINTSy + EXTS; i++) {
      var ei = (i + (Math.random() - .5) * RAND) * (height / POINTSy);
      var tgrid = [];
      var nxoff = 0;

      for(var j = -EXTS; j < POINTSx + EXTS; j++) {
         var ei = (i + (Math.random() - .5) * RAND) * (height / POINTSy);
         var ej = (j + (Math.random() - .5) * RAND) * (width / POINTSx);
         
         var p = new Point(ej, ei, nxoff, noff);
         tgrid.push(p);
         nxoff += COLORSEV;
      }
      noff += COLORSEV;
      grid.push(tgrid);
   }
}

// DRAW 
function draw() {
   background(66);
   
   //console.log("frame");
   if(isAlive) {
      var toff = xoff;
      for(var i = 0; i < grid.length; i++) {
         for(var j = 0; j < grid[i].length; j++) {
            grid[i][j].aggR += (noise(toff) - .5) * MOVESPEED;
            grid[i][j].aggG += (noise(toff + 9999) - .5) * MOVESPEED;
	    grid[i][j].aggB += (noise(toff + 4999) - .5) * MOVESPEED;
            toff += MOVESEV * .8;
            
            if(mouseControl && mouseIsPressed && (   distance(grid[i][j], stp1(pmouseX, mouseX), stp1(pmouseY, mouseY)) < 13 
                                                  || distance(grid[i][j], stp2(pmouseX, mouseX), stp2(pmouseY, mouseY)) < 13
                                                  || distance(grid[i][j], stp3(pmouseX, mouseX), stp3(pmouseY, mouseY)) < 13
                                                  || distance(grid[i][j], stp4(pmouseX, mouseX), stp4(pmouseY, mouseY)) < 13
                                                  || distance(grid[i][j], stp5(pmouseX, mouseX), stp5(pmouseY, mouseY)) < 13
                                                  || distance(grid[i][j], stp6(pmouseX, mouseX), stp6(pmouseY, mouseY)) < 13
                                                  || distance(grid[i][j], stp7(pmouseX, mouseX), stp7(pmouseY, mouseY)) < 13)) {
               grid[i][j].x = mouseX;
               grid[i][j].y = mouseY;
            }
         }
      }
      xoff += MOVESEV;
   }   
   
   for(var i = 0; i < grid.length; i++) {
      for(var j = 0; j < grid[i].length; j++) {
         try {
            noStroke();
            ellipse(grid[i][j].x, grid[i][j].y, 3, 3);
            
            if(distance(grid[i][j], grid[i + 1][j + 1]) < distance(grid[i][j + 1], grid[i + 1][j]) || !choosesShortest){
               var tp = grid[i][j];
               var ep = grid[i + 1][j + 1];
               var sp1 = grid[i][j + 1];
               var sp2 = grid[i + 1][j];
            }
            else {
               var tp = grid[i][j + 1];
               var ep = grid[i + 1][j];
               var sp1 = grid[i][j];
               var sp2 = grid[i + 1][j + 1];
            }
            //console.log(i + "  " + j);

	    if(shouldStroke)
               stroke(2);
            var tRGB = getRGBAgg(tp, sp1, sp1);
            fill(tRGB[0], tRGB[1], tRGB[2]);
            
            triangle(tp.x, tp.y, sp1.x, sp1.y, sp2.x, sp2.y);

            var tRGB = getRGBAgg(ep, sp1, sp2);
            fill(tRGB[0], tRGB[1], tRGB[2]);
            
            triangle(ep.x, ep.y, sp1.x, sp1.y, sp2.x, sp2.y);
         }
         catch(err) {
            
         }
      }
   }
}


function Point(x, y, xoff, yoff) {
   this.x = x;
   this.y = y;
   
   if(isPerlin) {
      this.aggR = noise(xoff +  999, yoff +  999) * 255;
      this.aggG = noise(xoff + 1999, yoff + 1999) * 255;
      this.aggB = noise(xoff + 2999, yoff + 2999) * 255;
   }
   else {
      this.aggR = Math.random() * 255;
      this.aggG = Math.random() * 255;
      this.aggB = Math.random() * 255;
   }
   if(isMonochrome) {
      this.aggG = this.aggR;
      this.aggB = this.aggR;
   }
   if(isMullum) {
      // keep in mind this is now HSB
      this.aggR = map(noise(xoff + 500, yoff + 500), 0, 1, mBlue, mOrange) % 255; // HUE 175 = lblue 185 = blue 65 = orange
      this.aggG = map(noise(xoff + 1500, yoff + 1500), 0, 1, 150, 255); // SAT
      this.aggB = map(noise(xoff + 2500, yoff + 2500), 0, 1, 125, 255); // BRI
   }
   if(colorGoodizer) {
      this.aggR = goodize(this.aggR);
      this.aggG = goodize(this.aggG);
      this.aggB = goodize(this.aggB);
   }
}

function getRGBAgg(a, b, c) {
   var TR = a.aggR + b.aggR + c.aggR;
   var TG = a.aggG + b.aggG + c.aggG;
   var TB = a.aggB + b.aggB + c.aggB;
   
   return [TR / 3, TG / 3, TB / 3];
}

function distance(p1, p2){
	var dx = p2.x-p1.x;
	var dy = p2.y-p1.y;
	return Math.sqrt(dx*dx + dy*dy);
}

function distance(x1, y1, x2, y2){
	var dx = x1-x2;
	var dy = y1-y2;
	return Math.sqrt(dx*dx + dy*dy);
}
         
function distance(p1, x2, y2){
	var dx = p1.x-x2;
	var dy = p1.y-y2;
	return Math.sqrt(dx*dx + dy*dy);
}

function goodize(x) {
   x = map(x * x, 0, 255 * 255, 0, 255);
   if(isMullum) {
      x = map(x * x, mOrange * mOrange, mBlue * mBlue, mOrange, mBlue);
   }
   return x;
}

function stp1(x1, x2) {return (x1 + x1 + x1 + x1 + x1 + x1 + x2) / 7;}
function stp2(x1, x2) {return (x1 + x1 + x1 + x1 + x1 + x2 + x2) / 7;}
function stp3(x1, x2) {return (x1 + x1 + x1 + x1 + x2 + x2 + x2) / 7;}
function stp4(x1, x2) {return (x1 + x1 + x1 + x2 + x2 + x2 + x2) / 7;}
function stp5(x1, x2) {return (x1 + x1 + x2 + x2 + x2 + x2 + x2) / 7;}
function stp6(x1, x2) {return (x1 + x2 + x2 + x2 + x2 + x2 + x2) / 7;}
function stp7(x1, x2) {return (x2 + x2 + x2 + x2 + x2 + x2 + x2) / 7;}
