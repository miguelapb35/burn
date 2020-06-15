var c = document.getElementById("canv");
var $ = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var msX = w/2, msY = h/2
var t;
var n = [];
var m = Math.random;
var f = Math.floor;
A();

function A(){
  $.globalCompositeOperation = "source-over";
  $.fillStyle = "hsla(11, 95%, 15%, 1)";
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = "lighter";

  for(var i = 0; i < 35; i++){
    var p = {};
    p.x = msX;
    p.y = msY;
    p.vx = m()*40-5;
    p.vy = m()*40-7;
    p.s = m()*70+5;
    p.r = f(m()*205+10);
    p.g = f(0.5*m()*95);
    p.b = f(0.5*m()*45);
    p.dx = msX;
    n.push(p);
  }
  i = n.length;
  while(i--){
    p = n[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy -= 0.2;
    p.vx += (p.dx-p.x)/p.s/2;
    p.s -= 1.8;
    if(p.s < 1){
      n.splice(i,1);
      continue;
    }
    $.beginPath();
    var g1 = "rgba(" + p.r + "," + p.g + "," + p.b + ","+(p.s/5)+")";
    var g2 = "rgba(" + p.r + "," + p.g + "," + p.b + ",0)";
    var g = $.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.s);
    g.addColorStop(0,g1);
    g.addColorStop(1,g2);
    $.fillStyle = g;
    $.arc(p.x, p.y, p.s, 0, Math.PI*2, false);
    $.fill();
  }

  window.requestAnimationFrame(A);
  t = "Burn".split("").join(String.fromCharCode(0x2004));
  $.font = "4.5em Permanent Marker";
  $.fillStyle = 'hsla(11, 95%, 15%,1)';
  $.fillText(t, (c.width - $.measureText(t).width) * 0.5, c.height * 0.5);
}

window.addEventListener('resize', function(){
   c.width = w = window.innerWidth;
   c.height = h = window.innerHeight;
});
document.body.addEventListener('mousemove', function(e){
    msX = e.clientX;
    msY = e.clientY;
});
document.body.addEventListener('touchmove', function(e){
    e.preventDefault();
    msX = e.touches[0].pageX;
    msY = e.touches[0].pageY;
});

