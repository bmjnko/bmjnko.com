The pictures on the home page are not images.
They are drawn every frame on a `<canvas>`, and the grainy, poster-like look comes from a technique called **ordered dithering**.

## The idea

Each pixel has a brightness $b \in [0, 1]$, but there are only two colors to draw with: green and cream.
Ordered dithering compares $b$ against a threshold that changes from pixel to pixel in a fixed, repeating pattern:

$$
\text{draw}(x, y) =
\begin{cases}
1 & \text{if } b(x, y) > T\big(x \bmod 4,\; y \bmod 4\big) \\
0 & \text{otherwise}
\end{cases}
$$

The thresholds come from the 4x4 Bayer matrix, shifted into the open interval $(0, 1)$:

$$
T = \frac{1}{16}
\begin{pmatrix}
0 & 8 & 2 & 10 \\
12 & 4 & 14 & 6 \\
3 & 11 & 1 & 9 \\
15 & 7 & 13 & 5
\end{pmatrix}
+ \frac{1}{32}
$$

Every value from $0$ to $15$ appears exactly once, so a flat area with brightness $b$ lights up about $16b$ out of every $16$ pixels.
Smooth gradients turn into small regular patterns, and the eye reads those patterns as shades.

## In code

```js
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]
  .map((v) => (v + 0.5) / 16);

function dither(ctx, width, height, brightness, cell = 3) {
  ctx.beginPath();
  for (let y = 0, j = 0; y < height; y += cell, j++) {
    for (let x = 0, i = 0; x < width; x += cell, i++) {
      const threshold = BAYER[(j & 3) * 4 + (i & 3)];
      if (brightness(x, y) > threshold) {
        ctx.rect(x, y, cell - 1, cell - 1);
      }
    }
  }
  ctx.fill();
}
```

Collecting every square into one path and filling it once is what keeps this fast.
A few thousand `rect` calls cost almost nothing next to a few thousand separate fills.

## The planet

The slowly turning planet uses the same brightness idea, with simple Lambert shading.
For a surface normal $\mathbf{n}$ and a light direction $\mathbf{l}$, the brightness is

$$
b = \max(0,\ \mathbf{n} \cdot \mathbf{l})
$$

Instead of squares, the planet maps $b$ onto a ramp of characters, from a space for dark to `@` for bright.
That is the whole trick: a number per pixel, and a rule for turning that number into marks.
