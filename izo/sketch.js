let img;
let tiles = 10;
let tileSize;
let i_x = 1;
let i_y = 0.5;
let j_x = -1;
let j_y = 0.5;
let top_offset = 50;




function preload() {
  img = loadImage('cube.png');
}

function setup() {
	createCanvas(windowWidth*0.8,windowHeight*0.8);
	tileSize = width*0.8 / tiles;
	// put setup code here
}

function screen_cords(i,j) {
	return{
		x:i*tileSize*i_x*0.5+j*tileSize*j_x * 0.5,
		y:i*tileSize*i_y*0.5+j*tileSize*j_y * 0.5,
	};
}

function m_invert(a,b,c,d) {
	let det = (1 / (a * d - b * c));
	return {
		a: det * d,
		b: det * -b,
		c: det * -c,
		d: det * a,
	  };
}

function grid_cords(sX,sY) {
  let a = tileSize*i_x * 0.5;
  let b = tileSize*j_x * 0.5;
  let c = tileSize*i_y * 0.5;
  let d = tileSize*j_y * 0.5;
  
  let inv = m_invert(a, b, c, d);
  
  return {
    x: sX * inv.a + sY * inv.b,
    y: sX * inv.c + sY * inv.d,
  }
}


function draw() {
	background('grey');
	//offset to center of sprite
	translate(-tileSize/2, 0);
	//offset to center of canvas
	translate(width/2, top_offset);
	//tile loop
	for (let i = 0; i < tiles; i++) {
		for (let j = 0; j < tiles; j++) { 
		  //screen coordination obj
		  let sCords = screen_cords(i,j);
		  if(
			Math.round(grid_cords(mouseX-width/2,mouseY-top_offset-tileSize/4).x)===i &&
		    Math.round(grid_cords(mouseX-width/2,mouseY-top_offset-tileSize/4).y)===j){
			  image(img,sCords.x,sCords.y-10,tileSize,tileSize);
		  }
		  else{
			image(img,sCords.x,sCords.y,tileSize,tileSize);
		  }
		}
	  }
	//console.log(grid_cords(mouseX-width/2,mouseY-tileSize/4));
	}
	

