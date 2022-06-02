	export default class sketch{
		constructor(top_offset,tiles,div,mode){
			let y_axis=0;

			new p5(function(p) {
				p.img;
				p.tileSize;
				p.i_x = 1;
				p.i_y = 0.5;
				p.j_x = -1;
				p.j_y = 0.5;
		
			   p.preload = function() {
				   p.img = p.loadImage('cube.png');
			   }
			   p.setup = function() {
				   p.createCanvas(600,500);
				   p.tileSize = p.width / tiles;
			   };
		
			   p.screen_cords = function(i,j) {
				   return{
					   x:i*p.tileSize*p.i_x*0.5+j*p.tileSize*p.j_x * 0.5,
					   y:i*p.tileSize*p.i_y*0.5+j*p.tileSize*p.j_y * 0.5,
				   };
			   }
		
			   p.m_invert = function(a,b,c,d) {
				   let det = (1 / (a * d - b * c));
				   return {
					   a: det * d,
					   b: det * -b,
					   c: det * -c,
					   d: det * a,
					 };
			   }
		
				   p.grid_cords = function(sX,sY) {
					 let a = p.tileSize*p.i_x * 0.5;
					 let b = p.tileSize*p.j_x * 0.5;
					 let c = p.tileSize*p.i_y * 0.5;
					 let d = p.tileSize*p.j_y * 0.5;
		 
					 let inv = p.m_invert(a, b, c, d);
		 
					 return {
					 x: sX * inv.a + sY * inv.b,
					   y: sX * inv.c + sY * inv.d,
					  }
				}
		   
		
			   p.draw = function() {
			   p.background('grey');
			   //offset to center of sprite
			   p.translate(-p.tileSize/2, 0);
			   //offset to center of canvas
			   p.translate(p.width/2, top_offset);
			   //hover mode
			   if(mode === "hover"){
				   //tile loop
				for (let i = 0; i < tiles; i++) {
					for (let j = 0; j < tiles; j++) { 
					  //screen coordination obj
					  let sCords = p.screen_cords(i,j);
					  if(
						Math.round(p.grid_cords(p.mouseX-p.width/2,p.mouseY-top_offset-p.tileSize/4).x)===i &&
						Math.round(p.grid_cords(p.mouseX-p.width/2,p.mouseY-top_offset-p.tileSize/4).y)===j){
						  p.image(p.img,sCords.x,sCords.y-10,p.tileSize,p.tileSize);
					  }
					  else{
						p.image(p.img,sCords.x,sCords.y,p.tileSize,p.tileSize);
					  }
					}
				  } 
			   }


			   //wave mode
			   else if(mode === "wave"){
				let offset=0; 
				   //tile loop
				for (let i = 0; i < tiles; i++) {
					for (let j = 0; j < tiles; j++) {
					  //screen coordination obj
					  let sCords = p.screen_cords(i,j);	
					  let a = y_axis + offset;		  
					  	p.image(p.img,sCords.x,sCords.y-(p.map(p.sin(a), -1, 1, -10, 10)),p.tileSize,p.tileSize);
						offset+=0.5;
					}
				  }
			   }

			   //midwave mode
			   else if(mode === "midwave"){
				   //tile loop
				for (let i = 0; i < tiles; i++) {
					for (let j = 0; j < tiles; j++) { 
					  //screen coordination obj
					  let sCords = p.screen_cords(i,j);	
					  let sCenter = p.screen_cords(5,5);	
					  let d = p.dist(sCenter.x,sCenter.y,sCords.x,sCords.y); 
					  let offset=p.map(d, 0, p.width/2, -2, 2);
					  let a = y_axis + offset;		  
					  	p.image(p.img,sCords.x,sCords.y-(p.map(p.sin(a), -1, 1, -20, 20)),p.tileSize,p.tileSize);
					}
				  }
			   }
			   y_axis += 0.03;
			}
		},div);
		}
	}