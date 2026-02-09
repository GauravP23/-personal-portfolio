/**
 * Pixel-art avatar rendered as a CSS grid of colored cells.
 * Inspired by the Dev Sharma reference — a small 8×8-ish pixel face.
 * Colors derived from the accent palette.
 */
export default function PixelAvatar({ size = 56 }: { size?: number }) {
  // 8x8 pixel grid: 0 = transparent, 1 = skin, 2 = hair/dark, 3 = accent, 4 = eyes
  const pixels = [
    [0, 0, 2, 2, 2, 2, 0, 0],
    [0, 2, 2, 2, 2, 2, 2, 0],
    [0, 2, 1, 1, 1, 1, 2, 0],
    [0, 1, 1, 4, 1, 4, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 3, 3, 1, 0, 0],
    [0, 0, 3, 3, 3, 3, 0, 0],
    [0, 3, 3, 0, 0, 3, 3, 0],
  ]

  const colors: Record<number, string> = {
    0: 'transparent',
    1: '#F5CCA0',   // skin
    2: '#1a1a2e',   // hair
    3: '#FF4000',   // accent / shirt
    4: '#0E002D',   // eyes
  }

  const cellSize = size / 8

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      style={{ imageRendering: 'pixelated', flexShrink: 0 }}
    >
      {pixels.map((row, y) =>
        row.map((c, x) =>
          c !== 0 ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill={colors[c]}
            />
          ) : null
        )
      )}
    </svg>
  )
}
