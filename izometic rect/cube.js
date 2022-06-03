function isometric_cube(x,y,sideLength){
    const points = [];
    for (let angle = PI / 6; angle < PI * 2; angle += PI / 3) {
        points.push(
          createVector(x + cos(angle) * sideLength,
            y + sin(angle) * sideLength));
      }
      
    push();
    noStroke();
    //quad on points x,y 0 1 5
    quad(x, y,
        points[5].x, points[5].y,
        points[0].x, points[0].y,
        points[1].x, points[1].y);
    //quad on points x,y 1 2 3
    quad(x, y,
        points[1].x, points[1].y,
        points[2].x, points[2].y,
        points[3].x, points[3].y);
    //quad on points x,y 3 4 5
    quad(x, y,
        points[3].x, points[3].y,
        points[4].x, points[4].y,
        points[5].x, points[5].y);
    pop();

    strokeWeight(2);
    //shape on points 0 1 2 3 4 5
    line(points[0].x, points[0].y,
        points[1].x, points[1].y);
    line(points[1].x, points[1].y,
        points[2].x, points[2].y);
    line(points[2].x, points[2].y,
        points[3].x, points[3].y);
    line(points[3].x, points[3].y,
        points[4].x, points[4].y);
    line(points[4].x, points[4].y,
        points[5].x, points[5].y);
    line(points[5].x, points[5].y,
        points[0].x, points[0].y);

    //shape on points x,y 1
    line(x,y, points[1].x, points[1].y);
    //shape on points x,y 3
    line(x,y, points[3].x, points[3].y);
    //shape on points x,y 5
    line(x,y, points[5].x, points[5].y);
}