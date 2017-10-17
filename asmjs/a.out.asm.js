Module["asm"] = (function(global, env, buffer) {
 "use asm";
 var a = new global.Int8Array(buffer);
 function X(b, c, d, e) {
  b = b | 0;
  c = +c;
  d = +d;
  e = +e;
  var f = 0, g = 0, h = 0.0, i = 0.0, j = 0.0, k = 0.0, l = 0.0, m = 0.0, n = 0, o = 0.0, p = 0, q = 0, r = 0, s = 0, t = 0.0, u = 0.0, v = 0;
  t = e * 800.0 / 1200.0;
  r = (b | 0) > 0;
  s = (b | 0) == 0;
  q = s ? 0 : -128;
  s = s ? 0 : -102;
  v = 0;
  do {
   u = +(v | 0);
   o = (u + -1200.0) / 1200.0 * e + c;
   if (r) {
    p = 0;
    do {
     m = +(p | 0);
     i = t * ((m + -800.0) / 800.0) + d;
     h = 0.0;
     j = 0.0;
     f = 0;
     while (1) {
      k = h * h;
      l = j * j;
      if (!(l + k <= 4.0)) break;
      j = i + j * h * 2.0;
      f = f + 1 | 0;
      if ((f | 0) >= (b | 0)) break; else h = o + (k - l);
     }
     n = ~~((u + m * 1200.0) * 4.0);
     if ((f | 0) == (b | 0)) {
      a[8 + n >> 0] = 0;
      a[8 + (n + 1) >> 0] = 0;
      f = 0;
     } else {
      g = f << 2;
      f = (g | 0) % 1024 | 0;
      if ((f | 0) >= 256) if ((f | 0) < 512) f = 510 - f & 255; else f = 0; else f = f & 255;
      a[8 + n >> 0] = f;
      f = (g + 128 | 0) % 1024 | 0;
      if ((f | 0) >= 256) if ((f | 0) < 512) f = 510 - f & 255; else f = 0; else f = f & 255;
      a[8 + (n + 1) >> 0] = f;
      f = (g + 356 | 0) % 1024 | 0;
      if ((f | 0) >= 256) f = (f | 0) < 512 ? 510 - f | 0 : 0;
      f = f & 255;
     }
     a[8 + (n + 2) >> 0] = f;
     a[8 + (n + 3) >> 0] = -1;
     p = p + 1 | 0;
    } while ((p | 0) != 800);
   } else {
    f = 0;
    do {
     p = ~~((u + +(f | 0) * 1200.0) * 4.0);
     a[8 + p >> 0] = 0;
     a[8 + (p + 1) >> 0] = q;
     a[8 + (p + 2) >> 0] = s;
     a[8 + (p + 3) >> 0] = -1;
     f = f + 1 | 0;
    } while ((f | 0) != 800);
   }
   v = v + 1 | 0;
  } while ((v | 0) != 1200);
  return;
 }
 function Y() {
  return 8;
 }
 return {
  _getImage: Y,
  _mandelbrot: X
 };
});



