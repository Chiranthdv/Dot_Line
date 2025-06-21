const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const dots = [];
const numDots = 120;
const maxDistance = 100;

for (let i = 0; i < numDots; i++) {
  dots.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  // Draw lines between nearby dots
  for (let i = 0; i < numDots; i++) {
    for (let j = i + 1; j < numDots; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 255, 255, ${1 - dist / maxDistance})`;
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw dots
  for (let dot of dots) {
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
    ctx.fill();

    dot.x += dot.vx;
    dot.y += dot.vy;

    // Bounce from edges
    if (dot.x < 0 || dot.x > width) dot.vx *= -1;
    if (dot.y < 0 || dot.y > height) dot.vy *= -1;
  }

  requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
