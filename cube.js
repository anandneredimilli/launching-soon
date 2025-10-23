// // Simple transparent animated cube using Canvas 2D

// const canvas = document.getElementById('cube-canvas');
// const ctx = canvas.getContext('2d');
// let t = 0;
// canvas.width = 270;
// canvas.height = 270;

// function drawCube() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.save();
//   ctx.translate(canvas.width/2, canvas.height/2);

//   const size = 80;
//   const angle = t * 0.01;
//   const vertices = [
//       [-1, -1, -1],
//       [ 1, -1, -1],
//       [ 1,  1, -1],
//       [-1,  1, -1],
//       [-1, -1,  1],
//       [ 1, -1,  1],
//       [ 1,  1,  1],
//       [-1,  1,  1]
//   ];

//   // 3D rotate and project
//   function project([x, y, z]) {
//       // rotate Y
//       let dx = x * Math.cos(angle) - z * Math.sin(angle);
//       let dz = x * Math.sin(angle) + z * Math.cos(angle);
//       x = dx; z = dz;
//       // rotate X
//       let dy = y * Math.cos(angle * 0.7) - z * Math.sin(angle * 0.7);
//       dz = y * Math.sin(angle * 0.7) + z * Math.cos(angle * 0.7);
//       y = dy; z = dz;
//       // perspective
//       const perspective = 350/(z + 5);
//       return [x*size*perspective, y*size*perspective];
//   }

//   const projected = vertices.map(project);
//   const faces = [
//       [0,1,2,3],
//       [4,5,6,7],
//       [0,1,5,4],
//       [2,3,7,6],
//       [0,3,7,4],
//       [1,2,6,5]
//   ];

//   for (const face of faces) {
//     ctx.beginPath();
//     ctx.moveTo(projected[face[0]][0], projected[face[0]][1]);
//     for (let i=1; i<4; ++i)
//       ctx.lineTo(projected[face[i]][0], projected[face[i]][1]);
//     ctx.closePath();
//     ctx.fillStyle = 'rgba(255,255,255,0.07)';
//     ctx.fill();
//     ctx.strokeStyle = 'rgba(200,200,255,0.22)';
//     ctx.stroke();
//   }
//   ctx.restore();
//   t += 1.8;
//   requestAnimationFrame(drawCube);
// }
// drawCube();


const canvas = document.getElementById('cube-canvas');
const ctx = canvas.getContext('2d');

const size = 70;
canvas.width = 270;
canvas.height = 270;

function rotateY([x, y, z], angle) {
  return [
    x * Math.cos(angle) - z * Math.sin(angle),
    y,
    x * Math.sin(angle) + z * Math.cos(angle)
  ];
}

function rotateX([x, y, z], angle) {
  return [
    x,
    y * Math.cos(angle) - z * Math.sin(angle),
    y * Math.sin(angle) + z * Math.cos(angle)
  ];
}

function drawCube(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width/2, canvas.height/2);

  const vertices = [
    [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1], // back
    [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]      // front
  ].map(v => {
    // Apply rotation
    let p = rotateY(v, t * 0.03);
    p = rotateX(p, t * 0.015);

    // Perspective
    const perspective = 240 / (p[2] + 4.5);
    return [p[0]*size*perspective, p[1]*size*perspective];
  });

  const faces = [
    [0,1,2,3], [4,5,6,7], [0,1,5,4],
    [2,3,7,6], [0,3,7,4], [1,2,6,5]
  ];

  for (const face of faces) {
    ctx.beginPath();
    ctx.moveTo(vertices[face[0]][0], vertices[face[0]][1]);
    for(let i=1;i<4;++i)
      ctx.lineTo(vertices[face[i]][0], vertices[face[i]][1]);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(200,200,255,0.18)';
    ctx.stroke();
  }
  ctx.restore();
}

let t = 0;
function animate() {
  drawCube(t);
  t += 1.8;
  requestAnimationFrame(animate);
}
animate();
