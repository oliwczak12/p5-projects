	export default class sketch{
		constructor(w,h,top_offset,tiles,div,mode){
			let y_axis=0;
			let tileSize=0;
			const mid = Math.floor(tiles/2);
			new p5(function(p) {				
			   p.setup = function() {
				   p.createCanvas(w,h);
				   tileSize = p.width / tiles;
				   
			   };
		
			   p.draw = function() {
			   p.push();
			   p.background('grey');
			   //offset to center of sprite
			   p.translate(-tileSize/2, 0);
			   //offset to center of canvas
			   p.translate(p.width/2, top_offset);
			   //hover mode

			   //wave mode
			   if(mode === "wave"){				   
				let offset=0; 				
				   //tile loop
				for (let i = 0; i < tiles; i++) {
					for (let j = 0; j < tiles; j++) {
					  //screen coordination obj
					  let a = y_axis + offset;
					    cube(i,j,tileSize,-(p.map(p.sin(a), -1, 1, -10, 10)));		  
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
					  let d = p.dist(mid,mid,i,j); 
					  let offset=p.map(d, 0, p.width/2, -100, 50);
					  let a = y_axis + offset;		
					  cube(i,j,tileSize,-(p.map(p.sin(a), -1, 1, -100, 200)),a);  
					}
				  }
			   }
			   p.pop();
			   y_axis += 0.05;
			}
		
			function cube(c,r,sideLength,lift,a){
				const x =  (c-r) * sideLength*0.5;
				sideLength = sideLength/p.sqrt(3);
				const y = (top_offset+(c+r) * sideLength * 0.5)+lift; 
				const points = [];
				for (let angle = p.PI / 6; angle < p.PI * 2; angle += p.PI / 3) {
					points.push(
					  p.createVector(x + p.cos(angle) * sideLength,
						y + p.sin(angle) * sideLength));
				  }
				  
				p.push();
				p.translate(tileSize/2, tileSize/p.sqrt(3));
				//p.strokeWeight(2);
				p.noStroke();
				//quad on points x,y 0 1 5
				p.fill(p.map(p.sin(a), -1, 1, 50, 255));
				p.quad(x, y,
					points[5].x, points[5].y,
					points[0].x, points[0].y,
					points[1].x, points[1].y);
				//quad on points x,y 1 2 3
				p.fill(p.map(p.sin(a), -1, 1, 0, 200));
				p.quad(x, y,
					points[1].x, points[1].y,
					points[2].x, points[2].y,
					points[3].x, points[3].y);
				//quad on points x,y 3 4 5
				p.fill(p.map(p.sin(a), -1, 1, 100, 255));
				p.quad(x, y,
					points[3].x, points[3].y,
					points[4].x, points[4].y,
					points[5].x, points[5].y);
					p.pop();
			}
		},div);
		}
	}
