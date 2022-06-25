	
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
			   y_axis += 0.04;
			}
		},div);
		
		}
	}

	
