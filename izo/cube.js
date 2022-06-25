        const top_offset=90;
        let tiles=51;
        let y_axis=0;
		let tileSize;
        let speed=0.30;
        let offset_amount=50;
        let white;
        let purple;
        let scale=2;

        function send_speed(v){
            speed=v.value/100;
        }
        function send_offset(v) {
            offset_amount=v.value;
        }
        /** This function sets up our sketch. */
        function setup() {
             let mycanvas = createCanvas(1000,1000);
             mycanvas.parent('sketch-holder');
             mid = Math.floor(tiles/2);  
             tileSize = (width / tiles)-scale;
             white = color(255, 255, 255);
             purple = color(102, 0, 204);
        }
        function cube(c,r,sideLength,lift,a){
            const x =  ((c-r) * sideLength*0.5);
            sideLength = sideLength/sqrt(3);
            const y = (top_offset+(c+r) * sideLength * 0.5)+lift; 
            const points = [];
            for (let angle = PI / 6; angle < PI * 2; angle += PI / 3) {
                points.push(
                  createVector(x + cos(angle) * sideLength,
                    y + sin(angle) * sideLength));
              }
            //trigonometric function
            let tri_func = map(sin(a), -1, 1, 1, 0.3); 
            //color obj
            color_obj = lerpColor(white, purple, tri_func);
            strokeWeight(2);
            //quad on points x,y 0 1 5
            fill(color_obj);
            quad(x, y,
                points[5].x, points[5].y,
                points[0].x, points[0].y,
                points[1].x, points[1].y);
            quad(x, y,
                points[1].x, points[1].y,
                points[2].x, points[2].y,
                points[3].x, points[3].y);
            quad(x, y,
                points[3].x, points[3].y,
                points[4].x, points[4].y,
                points[5].x, points[5].y);
        }
        
        function draw() {
            push();
            background('grey');
            //offset to center of canvas
            translate(width/2, top_offset);
                //tile loop
             for (let i = 0; i < tiles; i++) {
                 for (let j = 0; j < tiles; j++) { 
                   //screen coordination obj	
                   let d = dist(mid,mid,i,j); 
                   let offset=map(d, 0, width/2, -offset_amount, offset_amount);
                   let a = y_axis + offset;		
                   cube(i,j,tileSize,-(map(sin(a), -1, 1, -70, 70)),a);  
                 }
               }
            pop();
            y_axis += speed;  
        }
